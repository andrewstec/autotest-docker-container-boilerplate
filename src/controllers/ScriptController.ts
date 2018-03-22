import { ZipFile } from '../utils/Archiver';
import FeedbackGenerator from '../business/FeedbackGenerator';
import DockerSHA from '../models/DockerSHA';
import ResultRecord from '../models/ResultRecord';
import FileReader from '../utils/FileReader';
import HtmlGenerator from '../business/HtmlGenerator';
import Network from '../utils/Network';

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
    this.runGrader(RUNTIME_CMD);
  }

  public async runGrader(runtimeCMD: string): Promise<any> {
    const that = this;
    return this.readContainerInput().then((files) => {

      that.resultRecord = files[0] as ResultRecord;
      that.dockerSHA = files[1] as DockerSHA;

      switch (runtimeCMD) {
        case START_GRADING: {
          console.log('ScriptController::START_GRADING - START');

            // DEFINITELY WANT TO IMPLEMENT AND USE
            //   return Network.sendStaticHtml(zipFile, makeDir())
            //     .then((data: any) => {
            //       if (typeof data.response !== 'undefined' && data.response.htmlStaticPath !== 'undefined') {
            //         console.log('<STATIC_HTML>');
            //         console.log(data.response.htmlStaticPath);
            //         console.log('</STATIC_HTML exitcode=0, ' + 'completed=2999-01-02T16:31:31.504Z, duration=0s>');
            //       } else {
            //         console.log('<STATIC_HTML>');
            //         console.log(data.response.error);
            //         console.log('</STATIC_HTML exitcode=1, ' + 'completed=2999-01-02T16:31:31.504Z, duration=0s>');
            //       }
            //     });
            // })
            // .catch((err: any) => {
            //   console.log('ScriptController:: zipJacocoReport() ERROR ' + err);
            // });
        }
      }

    });
  }

  private zipHtmlReport(): Promise<ZipFile> {
    return new HtmlGenerator().zip();
  }

  private readContainerInput(): Promise<any> {
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