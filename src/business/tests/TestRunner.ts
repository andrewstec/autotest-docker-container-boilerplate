const supertest = require('supertest');
const STUDENT_REPO_PATH = '/studentRepo/';
import FileReader from '../../utils/FileReader';

export default class TestRunner {
  constructor() {
    //
  }

  public async gradeStudentWork() {
    const fileReader: FileReader = new FileReader();
    // const folderIndex: string[] = await fileReader.readFolderIndex(STUDENT_REPO_PATH);
    // console.log('textfileparsed', textFileParsed);
    // console.log(folderIndex);
  }

}