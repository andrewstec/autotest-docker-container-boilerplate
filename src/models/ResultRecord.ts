export default interface ResultRecord {
  team: string;
  repo: string;
  state: string;
  projectUrl: string;
  commitUrl: string;
  orgName: string;
  deliverable: string;
  postbackOnComplete: boolean;
  courseNum: number;
  user: string;
  timestamp: number;
  ref: string;
  custom: object;
  // REPORT: Customizable data object for you.
  // 'null' will default to zero grade in ClassPortal;
  report: MyReport;
  container: DockerContainer;
  githubFeedback: string;
  gradeRequested: boolean;
  gradeRequestedTimestamp: number;
  attachments: object[];
}

// NOTE: Your custom business logic report, which will not be read by AutoTest or ClassPortal, but held onto
// if it is necessary to hold onto it for export at a convenience time.
//
// IMPORTANT: The final grade will be read by ClassPortal for rendering grade information.
export interface MyReport {
  finalGrade: number;
  custom: Object;
}

export interface DockerContainer {
  branch: string;
  suiteVersion: string;
  image: string;
  exitCode: number;
}