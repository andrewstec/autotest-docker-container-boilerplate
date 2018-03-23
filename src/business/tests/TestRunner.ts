import FileReader from '../../utils/FileReader';
import FeedbackGenerator, { GithubFeedback } from '../../business/FeedbackGenerator';
import DockerSHA from '../../models/DockerSHA';
export interface TestResult {
  mark: number;
  compiled: boolean;
}

export interface GradeReport {
  testResult: TestResult;
  githubFeedback: GithubFeedback;
}

export default class TestRunner {
  private studentRepo: string;
  private dockerSHA: DockerSHA;
  private feedbackGenerator: FeedbackGenerator;

  constructor(studentRepo: string, dockerSHA: DockerSHA) {
    this.studentRepo = studentRepo;
    this.dockerSHA = dockerSHA;
  }

  /**
   * BUSINESS LOGIC:
   *
   * If the "main.txt" file is found, then student gets 1 mark.
   * If the "main.txt" file contains "hello world!", student gets 1 mark.
   *
   * Score out of 2.
   *
   * NOTE: If file is not found, then automatic zero because of compilation error
   * and student must be notified of '0' mark.
   *
   * @return GradeReport that contains the test score, if it compiled, and some feedback
   * for the student.
   */
   public async createGradeReport(): Promise<GradeReport> {
     console.log('CreateGradeReport.ts - start');
     const testResult: TestResult = await this.gradeStudentWork();
     const githubFeedback: GithubFeedback = this.createGithubFeedback(testResult, this.dockerSHA);
     const gradeReport: GradeReport = { testResult, githubFeedback };
     return gradeReport;
   }
  private async gradeStudentWork(): Promise<TestResult> {
    const FILENAME = 'main.txt';
    const HELLO_WORLD = 'hello world!';
    const fileReader: FileReader = new FileReader();
    const folderIndex = await fileReader.readFolderIndex(this.studentRepo);
    const mainTxt = await fileReader.readTextFile(this.studentRepo + '/main.txt')
      .catch((err) => {
        if (err) {
          console.log(err);
          console.log('main.txt does not exist.');
        }
      });
    let fileExists: boolean = false;
    let helloWorldExists: boolean = false;

    try {
      const testResult: TestResult = { compiled: undefined, mark: undefined };

      folderIndex.map ((file) => {
        if (file.toUpperCase() === FILENAME.toUpperCase()) {
          fileExists = true;
        }
      });

      if (typeof mainTxt !== 'undefined' && mainTxt.toUpperCase().indexOf(HELLO_WORLD.toUpperCase()) > -1) {
        helloWorldExists = true;
      }

      if (helloWorldExists && fileExists) {
        testResult.mark = 2;
        testResult.compiled = true;
      } else if (helloWorldExists || fileExists) {
        testResult.compiled = true;
        testResult.mark = 1;
      } else {
        testResult.mark = 0;
        testResult.compiled = false;
      }
      return testResult;
    } catch (err) {
      console.log('TestRunner.ts:: gradeStudentWork() ERROR ' + err);
    }
  }

  /**
   * Creates GithubFeedback to be used as feedback on the comment section of the student
   * Github Repository.
   *
   * @param testResult TestResult contains the grade score and if it compiled;
   * @param dockerSHA DockerSHA file from the Docker Container Input with lots of extra info;
   */
  private createGithubFeedback(testResult: TestResult, dockerSHA: DockerSHA): GithubFeedback {
    return new FeedbackGenerator(testResult, dockerSHA).createFeedback();
  }
}