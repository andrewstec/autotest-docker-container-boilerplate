import { ResultRecordResponseContainer, ResultRecordResponse, ResultRecordPayload } from '../interfaces/ResultRecord';
import ResultRecord from '../models/ResultRecord';
import { ZipFile, ZipFileContainer } from './Archiver';

const rp = require('request-promise-native');
let apiPath: string;

console.log('Network::apiPath() IS_CONTAINER_LIVE: ' + process.env.IS_CONTAINER_LIVE);

if (typeof process.env.IS_CONTAINER_LIVE === 'undefined') {
  apiPath = 'https://portal-dev.cs.ubc.ca:1210';
} else if (String(process.env.IS_CONTAINER_LIVE).indexOf('0') > -1) {
  // mac development mode with docker
  apiPath = 'https://portal-dev.cs.ubc.ca:1210';
} else {
  apiPath = 'https://portal.cs.ubc.ca:1210';
}

console.log('Network::apiPath() Determined API Path: ' + apiPath);

export default class Network {
  constructor() {
  }

  public static sendStaticHtml(zipFile: ZipFile, newDirPath: string): Promise<object> {
    console.log('Network::sendStaticHtml() - START');

    const zipFileContainer: ZipFileContainer = {
      zipFile: zipFile,
      newDirPath: newDirPath
    };

    const options = {
      method:  'POST',
      uri:     `${apiPath}/staticHtml`,
      headers: {
        Accept: 'application/json'
      },
      body: zipFileContainer,
      json:    true
    };

    return rp(options).then((response: ResultRecord) => {
      console.log('Network::sendStaticHtml() AutoTest Response: ', response);
      return response;
    })
    .catch((err: any) => {
      console.log('Network::sendStaticHtml() ERROR ' + err);
    });
  }

  public static sendResultRecord(resultRecordPayload: ResultRecordPayload): Promise<ResultRecordResponse> {
    const container = {response: resultRecordPayload};
    console.log('Network::sendResultRecord() - START');
    const options = {
      method:  'POST',
      uri:     `${apiPath}/result`,
      headers: {
        Accept: 'application/json'
      },
      body: container,
      json:    true
    };
    console.log(`${apiPath}/result`);
    console.log(resultRecordPayload);
    return rp(options).then((data: ResultRecordResponseContainer ) => {
      console.log('Network::sendResultRecord() MongoDB Response: ', data.response);
      return data.response;
    })
    .catch((err: any) => {
      console.log('Network::sendResultRecord() ERROR ' + err);
    });
  }
}

