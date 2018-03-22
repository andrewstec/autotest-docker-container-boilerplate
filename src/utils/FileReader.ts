import * as fs from 'fs';
import { DockerSHA } from '../models/DockerSHA';
import { ResultRecord } from '../models/ResultRecord';
const MOCK_STDIO: string = '/mockData/stdio.txt';
const MOCK_DOCKER_SHA: string = '/mockData/docker_SHA.json';
const REPORT_OUTPUT: string = '/output/report.json';
const MOCK_REPORT_OUTPUT: string = '/mockData/report.json';

export default class FileReader {
  constructor() {
    //
  }

  public async fileStats(fileName: string): Promise<fs.Stats> {
    return new Promise<fs.Stats>((fulfill, reject) => {
      console.log('FileReader::fileStats() Reading filename ' + fileName + ' - START');
      fs.stat(fileName, (err, stats) => {
        if (err) {
          console.log('FileReader::fileStats() ERROR ' + err);
          reject(err);
        }
        console.log('FileReader::fileStats() SUCCESS Reading filename - END');
        return fulfill(stats);
      });
    });
  }

  public async readJSON(jsonPath: string): Promise<JSON>  {
    console.log('FileReader::readDockerInput() Reading filename ' + shaPath + ' - START');
    return new Promise<DockerSHA>((fulfill, reject) => {
      fs.readFile(jsonPath, 'utf8', (err, data) => {
        if (err) {
          console.log('FileReader:: readDockerInput() ERROR reading ' + shaPath + ' from container: ' + err);
          reject(err);
        }
        console.log('FileReader::readDockerInput() SUCCESS reading ' + shaPath + ' from container - END');
        // console.log('FileReader::readDockerInput() DATA: ', JSON.stringify(data)); // FOR DEBUGGING
        const json = (JSON.parse(data) as JSON);
        return fulfill(json);
      });
    });
  }


  public async readDefaultResultRecord(shaPath: string): Promise<DockerSHA>  {
    console.log('FileReader::readDockerInput() Reading filename ' + shaPath + ' - START');
    return new Promise<DockerSHA>((fulfill, reject) => {
      fs.readFile(shaPath, 'utf8', (err, data) => {
        if (err) {
          console.log('FileReader:: readDockerInput() ERROR reading ' + shaPath + ' from container: ' + err);
          reject(err);
        }
        console.log('FileReader::readDockerInput() SUCCESS reading ' + shaPath + ' from container - END');
        // console.log('FileReader::readDockerInput() DATA: ', JSON.stringify(data)); // FOR DEBUGGING
        const dockerInput = (JSON.parse(data) as DockerSHA);
        return fulfill(dockerInput);
      });
    });
  }

  public async readFolderIndex(folderPath: string): Promise<fs.Stats>  {
    console.log('FileReader::readTextInput() Reading filename ' + folderPath + ' - START');
    return new Promise<fs.Stats>((fulfill, reject) => {
      fs.stat(folderPath, (err, data) => {
        if (err) {
          console.log('FileReader:: readDockerInput() ERROR reading ' + folderPath + ' from container: ' + err);
          reject(err);
        }
        console.log('FileReader::readDockerInput() SUCCESS reading ' + folderPath + ' from container - END');
        return fulfill(data);
      });
    });
  }


  public async readTextFile(textfilePath: string): Promise<DockerSHA>  {
    console.log('FileReader::readTextInput() Reading filename ' + textfilePath + ' - START');
    return new Promise<DockerSHA>((fulfill, reject) => {
      fs.readFile(textfilePath, 'utf8', (err, data) => {
        if (err) {
          console.log('FileReader:: readDockerInput() ERROR reading ' + textfilePath + ' from container: ' + err);
          reject(err);
        }
        console.log('FileReader::readDockerInput() SUCCESS reading ' + textfilePath + ' from container - END');
        return fulfill(textfilePath);
      });
    });
  }
}