import { ZipFile } from '../utils/Archiver';
import FeedbackGenerator, { GithubFeedback } from '../business/FeedbackGenerator';
import { MyReport } from '../models/ResultRecord';
import DockerSHA from '../models/DockerSHA';
import ResultRecord from '../models/ResultRecord';
import GithubCloner from '../utils/GithubCloner';
import TestRunner, { TestResult, GradeReport } from '../business/tests/TestRunner';
import FileReader from '../utils/FileReader';
import HtmlGenerator from '../business/HtmlGenerator';
import Network from '../utils/Network';

let STUDENT_REPO_PATH: string;
if (process.env.IS_CONTAINER_LIVE === '1') {
  STUDENT_REPO_PATH = '/studentRepo';
} else {
  STUDENT_REPO_PATH = '/output/studentRepo';
}
const DOCKER_SHA = '/output/docker_SHA.json';
const RESULT_RECORD = '/output/result_record.json';
const RUNTIME_CMD = process.argv[2];
const START_GRADING = 'START_GRADING';

class ScriptController {
  private FileReader: FileReader = new FileReader();
  public dockerSHA: DockerSHA;
  public resultRecord: ResultRecord;

  constructor(dockerInputPath: string) {
    this.runGrader();
  }

  public async runGrader() {
    console.log('ScriptController::validateAssignment() - start');
    this.readContainerInput()
      .then((files) => {
        // Step #1. Read the Container Input DockerSHA and ResultRecord Files;
        console.log('ScriptController::runGrader() STEP 1 - start');
        that.resultRecord = files[0] as ResultRecord;
        that.dockerSHA = files[1] as DockerSHA;
      })
      .then(() => {
        // Step #2. Init the Repositories on the Docker Container system;
        console.log('ScriptController::runGrader() STEP 2 - start');
        return new GithubCloner(that.dockerSHA).cloneStudentRepo(STUDENT_REPO_PATH);
      })
      .then(() => {
        // Step #3. If the Student Code was cloned successfully, grade it
        console.log('ScriptController::runGrader() STEP 3 - start');
        return new TestRunner(STUDENT_REPO_PATH, that.dockerSHA).createGradeReport();
      })
      .then((gradeReport: GradeReport) => {
        console.log('ScriptController::runGrader() STEP 4 - start');
        // Step #4. If StaticHtml is enabled, produce HTML Report.
        // if (this.dockerSHA.customHtml) {
        if (true) {
          const randomDir: string = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
          const zipFile = new HtmlGenerator(gradeReport).zip()
            .then((zipFile) => {
              return Network.sendStaticHtml(zipFile, randomDir)
                .then((onfulfilled) => {
                  console.log(onfulfilled);
                  return onfulfilled;
                });
            });
        }
        return gradeReport;
      })
      .then((gradeReport: GradeReport) => {
        // Step #5. Create Result Record based on GradeReport & HtmlGenerator
        console.log('ScriptController::runGrader() STEP 5 - start');

        /**
         * Modify ResultRecord to add in if the GithubFeedback should be displayed to the student
         * on completetion (This will not count as a grade request for the student):
         */
        if (gradeReport.testResult.compiled === false) {
          that.resultRecord.postbackOnComplete = true;
        } else {
          that.resultRecord.postbackOnComplete = false;
        }

        /**
         * Create 'MyReport' object that gets added to the 'report' property of the Result Record.
         * REMINDER: The ResultRecord is send back to AutoTest, which reads the grades results and
         * returns githubFeedback text to the User's commit comment view.
         */

         const myReport: MyReport = { custom: gradeReport, finalGrade: 0 };

        /**
         * Add the Github Feedback to the Result Record
         */
        that.resultRecord.githubFeedback = gradeReport.githubFeedback as string;

        /**
         * Add the finalGrade to the 'report' property
         */
        myReport.finalGrade = gradeReport.testResult.mark;

        /**
         * Finally, add the new MyReport to the 'report' property in the Result Record.
         */
        that.resultRecord.report = myReport;
        return this.resultRecord;
      })
      .then(() => {
        console.log('ScriptController::runGrader() STEP 5 - start');
        /**
         * Send the Result Record to the AutoTest endpoint;
         */
        return Network.sendResultRecord(this.resultRecord);
      })
      .then((response) => {
        console.log('network response', response);
      })
      .catch((err) => {
        console.log('ScriptController::validateAssignment() ERROR ' + err);
        return;
      });

    const that = this;
  }

  private readContainerInput(): Promise<any[]> {
    const that = this;
    const fileReader: FileReader = new FileReader();
    const file0 = fileReader.readJSON(RESULT_RECORD);
    const file1 = fileReader.readJSON(DOCKER_SHA);
    return Promise.all([file0, file1]);
  }
}

export default ScriptController;

if (typeof process.env.TEST_MODE === 'undefined') {
  new ScriptController(START_GRADING);
}