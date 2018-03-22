
import ResultRecord from '../models/ResultRecord';
import Archiver, { ZipFile } from '../utils/Archiver';

const JACOCO_PATH = '/cpsc210__bootstrap/output/studentTests/jacoco';

export default class HtmlGenerator {

  private resultRecord: ResultRecord;

  constructor() {
    //
  }

  /**
   * @param string The filepath to zip and send to the HTML Static Endpoint;
   * @return ZipFile contents of the given filepath;
   */
  public zip(): Promise<any> {
      return new Archiver().zipDirectory(JACOCO_PATH)
        .then((zipFile) => {
          return zipFile;
        });
  }

}