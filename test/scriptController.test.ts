import {} from 'jest';
import request from 'supertest';
import ScriptController from '../src/controllers/ScriptController';
import { ProcessedTag } from '../src/interfaces/ProcessedTag.Interface';

const STUDENT_BUILD_TAG: string = '<BUILD_STUDENT_TESTS>';
const STUDENT_BUILD_CMD: string = 'StudentBuildParser';

// Expect #1
// Student Build Fails should result in a proper exit code being passed into the
// ProcessedTag object for the <BUILD_STUDENT_TESTS> stdio log section

describe('ScriptController:: Student Build Fails a Test', () => {

  const STDIO_INPUT = '/mockData/studentBuildFail_stdio.txt';
  const SHA_INPUT = '/mockData/studentBuildFail_sha.json';
  const scriptController = new ScriptController(STDIO_INPUT, SHA_INPUT);

  it('ProcessedTag should return failed exit code 1', () => {
    return scriptController.runParser(STUDENT_BUILD_CMD)
      .then((studentBuildTag: ProcessedTag) => {
        expect(studentBuildTag.exitcode).toBe(1);
      });
  });

// Expect #2
// The result.json file that is produced should have a githubOutput property
// that is equal to the ProcessedTag.content text.

  it('ProcessedTag content should equal report.json property githubComment msg', () => {
    return scriptController.runParser(STUDENT_BUILD_CMD)
      .then((studentBuildTag: ProcessedTag) => {
        expect(studentBuildTag.exitcode).toBe(1);
      });
  });
});

