import mongodb = require('mongodb');

export interface ResultRecordPayload {

}

export interface ResultRecordResponseContainer {
  response: ResultRecordResponse;
}

// Based off MongoDB response.
export interface ResultRecordResponse extends mongodb.WriteOpResult {
  ok: number;
  n: number;
}