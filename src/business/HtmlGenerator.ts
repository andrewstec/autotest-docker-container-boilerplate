
import ResultRecord from '../models/ResultRecord';
import Archiver, { ZipFile } from '../utils/Archiver';
import { GradeReport } from './tests/TestRunner';

const fs = require('fs');
const OUTPUT_HTML = '/tmp/htmlReport/';

export default class HtmlGenerator {

  private gradeReport: GradeReport;

  constructor(gradeReport: GradeReport) {
    this.gradeReport = gradeReport;
  }

  private outputHtml(): Promise<boolean> {
    const that = this;
    return new Promise((fulfill, reject) => {
        let output: string = '';
        output = `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">
          <html>
          <head>
            <title>My first styled page</title>
            <style type="text/css">
            body {
              color: purple;
              background-color: #d8da3d }
            </style>
          </head>
          <body>
          <center>` + that.gradeReport.githubFeedback + `</center>
          </body>
          </html>`;
          try {
            if (!fs.existsSync(OUTPUT_HTML)) {
              fs.mkdirSync(OUTPUT_HTML);
            }
            fs.writeFile(OUTPUT_HTML + 'index.html', output, function(err: any) {
              if (err) {
                console.log(err);
                return reject(err);
              }
              console.log('Success writing HTML files');
              fulfill(true);
            });
          }
          catch (err) {
            reject(err);
          }

    });
  }


  /**
   * @param string The filepath to zip and send to the HTML Static Endpoint;
   * @return ZipFile contents of the given filepath;
   */
  public zip(): Promise<any> {
      return this.outputHtml()
        .then(() => {
          return new Archiver().zipDirectory(OUTPUT_HTML)
          .then((zipFile) => {
            return zipFile;
          });
        });
  }

}