import { ZipFile } from '../utils/Archiver';
import FeedbackGenerator from '../business/FeedbackGenerator';
import DockerSHA from '../models/DockerSHA';
import ResultRecord from '../models/ResultRecord';
import GithubCloner from '../utils/GithubCloner';
import TestRunner from '../business/tests/TestRunner';
import FileReader from '../utils/FileReader';
import HtmlGenerator from '../business/HtmlGenerator';
import Network from '../utils/Network';

const STUDENT_REPO_PATH = '/studentRepo/';
const DOCKER_SHA = '/output/docker_SHA.json';
const RESULT_RECORD = '/output/result_record.json';
const RUNTIME_CMD = process.argv[2];
const START_GRADING = 'START_GRADING';

/**
 * Hepler functions for Docker 210 Container Scripts
 */

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
        return new TestRunner().gradeStudentWork();
      })
      .catch((err) => {
        console.log('ScriptController::validateAssignment() ERROR ' + err);
      });

    const that = this;
  }

  private zipHtmlReport(): Promise<ZipFile> {
    return new HtmlGenerator().zip();
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