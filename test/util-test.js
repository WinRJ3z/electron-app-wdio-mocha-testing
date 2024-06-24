require('./setup');
const util = require('../src/util');

// Load necessary modules
const chai = require('chai');
const sinon = require('sinon');

// Assign modules to global variables
global.expect = chai.expect;
chai.use(require('dirty-chai'));
chai.use(require('sinon-chai'));

// Utility functions
const mkRand = function (min, max) {
  return Math.floor((Math.random() * (max - min)) + min);
};

const zeroPad = function (num) {
  return (`00${num}`).substring(`${num}`.length);
};

// Describe the test cases for the utility functions
describe('util', function () {
  describe('timeStrToSec', function () {
    Array.from(Array(1000)).map(function (_, i) {
      const hours = mkRand(0, 100);
      const mins = mkRand(0, 60);
      const secs = mkRand(0, 60);
      const expected = (hours * 60 * 60) + (mins * 60) + secs;
      const timeStr = `${zeroPad(hours)}:${zeroPad(mins)}:${zeroPad(secs)}`;
      return it(`returns ${expected} seconds for ${timeStr} (case #${i})`, function () {
        expect(util.timeStrToSec(timeStr)).to.equal(expected);
      });
    });
  });

  describe('fitToMaxDimensions', function () {
    Array.from(Array(1000)).map(function (_, i) {
      const width = mkRand(10, 500000000);
      const height = mkRand(10, 500000000);
      const maxWidth = mkRand(10, 200000);
      const maxHeight = mkRand(10, 200000);
      return it(`scales ${width}x${height} to fit within ${maxWidth}x${maxHeight} (case #${i})`, function () {
        const [scaledWidth, scaledHeight] = util.fitToMaxDimensions(width, height, maxWidth, maxHeight);
        expect(scaledWidth).to.be.at.most(width);
        expect(scaledWidth).to.be.at.most(maxWidth);
        expect(scaledHeight).to.be.at.most(height);
        expect(scaledHeight).to.be.at.most(maxHeight);
      });
    });
  });
});

// Describe the test cases for file selection
describe('File Selection', function () {
  let dialogStub;

  beforeEach(function () {
    // Creating a sandbox for sinon stubs and spies
    sinon.sandbox.create();
    // Stubbing the dialog.showOpenDialog method
    dialogStub = sinon.stub(dialog, 'showOpenDialog').resolves(['/path/to/mockfile.mov']);
  });

  afterEach(function () {
    // Restoring the original behavior of dialog.showOpenDialog
    sinon.sandbox.restore();
  });

  it('should open file dialog and set input file path', async function () {
    const inputFilePath = '/path/to/mockfile.mov';
    const inputFileElement = { value: '' };

    await browser.execute(function () {
      document.getElementById('input-file').value = '/path/to/mockfile.mov';
    });

    const fileNames = await dialog.showOpenDialog({
      filters: [{ name: 'mov', extensions: ['mov'] }],
      properties: ['openFile', 'createDirectory']
    });

    expect(fileNames).to.deep.equal(['/path/to/mockfile.mov']);
  });
});
