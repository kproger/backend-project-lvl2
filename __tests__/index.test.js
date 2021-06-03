import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { describe, expect, test } from '@jest/globals';
import { genDiff } from '../src/index.js';

const __filename = fileURLToPath(
  import.meta.url,
);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('generating data differences', () => {
  const expectedOutpout = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
  describe('json data', () => {
    test('comparing json files', () => {
      const pathToJSONFile1 = getFixturePath('file1.json');
      const pathToJSONFile2 = getFixturePath('file2.json');

      expect(expectedOutpout).toEqual(genDiff(pathToJSONFile1, pathToJSONFile2));
    });
  });

  describe('yaml data', () => {
    test('comparing yml files', () => {
      const pathToYmlFile1 = getFixturePath('file1.yml');
      const pathToYmlFile2 = getFixturePath('file2.yaml');

      expect(expectedOutpout).toEqual(genDiff(pathToYmlFile1, pathToYmlFile2));
    });
  });
});
