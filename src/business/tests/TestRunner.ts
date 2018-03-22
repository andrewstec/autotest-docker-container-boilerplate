const supertest = require('supertest');
const STUDENT_REPO_PATH = '/studentRepo/';
import FileReader from '../../utils/FileReader';

class TestRunner {
  constructor() {
    //
  }

  public static async runTests() {
    const fileReader: FileReader = new FileReader();
    const folderIndex: string[] = await fileReader.readFolderIndex(STUDENT_REPO_PATH);
    const textFileParsed: string = await fileReader.readTextFile(STUDENT_REPO_PATH + 'main.txt');
    console.log('textfileparsed', textFileParsed);
    console.log(folderIndex);
  }

}