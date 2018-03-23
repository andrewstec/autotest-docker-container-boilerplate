export default interface DockerSHA {
  userInfo: DockerUserInfo;
  pushInfo: DockerPushInfo;
  deliverableInfo: DockerDeliverableInfo;
  container: DockerInputContainer;
  githubOrg: string;
  githubKeys: GithubKeys;
  whitelistedServers: string;
  allowDNS: number;
  stdioRef: string;
  postbackOnComplete: boolean;
  courseNum: number;
  teamId: string;
  custom: object;
  githubKey: string; // to be removed instead of being logged in the DB.
}

export interface DockerUserInfo {
  username: string;
  fname: string;
  lname: string;
  csid: string;
  snum: string;
  profileUrl: string;
}

export interface DockerPushInfo {
  commit: string;
  branch: string;
  timestamp: number;
  commitUrl: string;
  projectUrl: string;
  repo: string;
}

export interface DockerDeliverableInfo {
  deliverableUrl: string; // Repo import to mark assignment (important if Github key not on image)
  deliverableCommit: string; // Commit of Deliverable soluton that will be marked in Docker container
  deliverableToMark: string;
  solutionsUrl: string;
}

export interface GithubKeys {
  delivKeys: string;
  solutionsKey: string;
  orgKey: string;
}
export interface DockerInputContainer {
  branch: string;
  suiteVersion: string;
  image: string;
  exitCode: number;
}