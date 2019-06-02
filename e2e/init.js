// Check out setup guide here: https://github.com/wix/Detox/blob/master/docs/Introduction.GettingStarted.md

const detox = require('detox');
const config = require('../package.json').detox;
const adapter = require('detox/runners/jest/adapter');

// Set the default timeout
jest.setTimeout(300000);
jasmine.getEnv().addReporter(adapter);

beforeAll(async () => {
  await detox.init(config);
});

beforeEach(async () => {
  await adapter.beforeEach();
});

afterAll(async () => {
  await adapter.afterAll();
  await detox.cleanup();
});