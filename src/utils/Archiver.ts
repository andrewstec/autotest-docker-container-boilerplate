import * as fs from 'fs';
const archiver = require('archiver');

export interface ZipFile {
  name: string;
  data: string;
  content_type: string;
}

export interface ZipFileContainer {
  zipFile: ZipFile;
  newDirPath: string;
}

const JACOCO_ZIP_OUTPUT = '/output/jacoco-archive.zip';

export default class Archiver {
  constructor() {
  }

  public zipDirectory(dirPath: string): Promise<ZipFile> {
    console.log('Archiver:: Zipping directory ' + dirPath);

    const zipFile: ZipFile = {
      name: __dirname + 'jacoco-archive.zip',
      data: undefined,
      content_type: 'application/zip'
    };

    return new Promise<any>((fulfill, reject) => {
      const zipOutput = fs.createWriteStream(JACOCO_ZIP_OUTPUT);
      const archive = archiver('zip');

      zipOutput.on('close', function() {
          console.log('Archiver:: INFO ' + archive.pointer() + ' total bytes');
          console.log('Archiver:: INFO Archiver has been finalized and the output file descriptor has closed.');
          fs.readFile(JACOCO_ZIP_OUTPUT, 'base64', function(err, data) {
            if (err) {
              console.log('Archiver:: ZipFile fs.readFile ERROR ' + err);
              reject(zipFile);
            } else {
              zipFile.data = data;
              fulfill(zipFile);
            }
          });
      });

      archive.on('error', function(err: any) {
          console.log('Archiver:: ERROR ' + err);
          reject(zipFile);
      });

      archive.pipe(zipOutput);

      archive.directory(dirPath, false);

      archive.finalize();
    })
    .catch((err) => {
      console.log('Archiver:: zipDirectory() ERROR ' + err);
    });
  }
}