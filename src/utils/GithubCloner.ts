

import DockerSHA from '../models/DockerSHA';
const exec = require('child-process-promise').exec;
export default class GithubCloner {

  private repoUrl: string;
  private repoKey: string;
  constructor(dockerSHA: DockerSHA) {
    this.repoUrl = dockerSHA.pushInfo.projectUrl;
    this.repoKey = dockerSHA.githubKeys.orgKey;
  }

  /**
   * Clones a student repo based on default configuration.
   * @param string the directory path output for the cloned repo;
   * @return boolean 'true' if successfully cloned;
   */
  public cloneStudentRepo(outputPath: string): Promise<boolean> {
    const that = this;
    console.log('GithubCloner.ts::cloneStudentRepo() - start');
    const url: string = this.addGithubAuthToken(that.repoUrl, that.repoKey);
    return new Promise((fulfill, reject) => {
      exec(`git clone ${url} ${outputPath}`)
        .then((process: any) => {
          console.log('GithubCloner.ts::cloneStudentRepo() - STDIOUT: ', process.stdout);
          console.log('GithubCloner.ts::cloneStudentRepo() - STDIERR: ', process.stderr);
          if (process.stderr === '' && process.stderr !== '') {
            fulfill(true);
          } else {
            reject(false);
          }
        });
    });
  }

  /**
   * Creates a full url with github repo url and auth token that works on the command line with `git clone`
   * @param url string Url of github repo without token. ie. https://github.com/username/repo;
   * @param authKey string long Github Auth token;
   */
  public addGithubAuthToken(url: string, authToken: string): string {
    const start_append = url.indexOf('//') + 2;
    const authKey = authToken + '@';
    const authedUrl = url.slice(0, start_append) + authKey + url.slice(start_append);
    return authedUrl;
  }

}