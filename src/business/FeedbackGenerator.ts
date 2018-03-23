import { TestResult } from '../business/tests/TestRunner';
import DockerSHA from '../models/DockerSHA';
export interface GithubFeedback extends String {
  //
}

export default class FeedbackGenerator {
  private testResult: TestResult;
  private dockerSHA: DockerSHA;

  constructor(testResult: TestResult, dockerSHA: DockerSHA) {
    this.testResult = testResult;
    this.dockerSHA = dockerSHA;
  }

  public createFeedback(): GithubFeedback {
    const dockerSHA = this.dockerSHA;
    let feedback: string = 'GithubFeedback.ts:: ERROR CREATING FEEDBACK';
    if (!this.testResult.compiled) {
      feedback = 'Score: 0/2; Your code did not compile. A "main.txt" file was not found in the project repository: '
       + dockerSHA.pushInfo.repo + '. Please consult your team members on `' + dockerSHA.teamId +
       '` about what your next steps should be.';
    } else if (this.testResult.compiled && this.testResult.mark === 2) {
      feedback = 'Score: 2/2; Good job! You received a perfect grade on commit #' + dockerSHA.pushInfo.commit + '!';
    } if (this.testResult.compiled && this.testResult.mark === 1) {
      feedback = 'Score: 1/2; You missed the "hello world!" part of the assignment. Please re-submit your commit.';
    }

    console.log('GithubFeedback.ts - createFeedback() - feedback created: ' + feedback);

    return feedback as GithubFeedback;
  }

}