import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs, { read, readFileSync } from 'fs';
import { describe, expect, test } from '@jest/globals';
import { genDiff } from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('generating data differences', () => {
  const expectedOutpout = `{
    host: hexlet.io
  - timeout: 50
  + timeout: 20
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;
  describe('json data', () => {
    test('comparing json files', () => {
      const pathToJSONFile1 = getFixturePath('file1.json');
      const pathToJSONFile2 = getFixturePath('file2.json');

      expect(genDiff(pathToJSONFile1, pathToJSONFile2)).toEqual(expectedOutpout);
    });
  });

  describe('yaml data', () => {
    test('comparing yml files', () => {
      const pathToYmlFile1 = getFixturePath('file1.yaml');
      const pathToYmlFile2 = getFixturePath('file2.yaml');

      expect(genDiff(pathToYmlFile1, pathToYmlFile2)).toEqual(expectedOutpout);
    });
  });

  describe('deep comparing', () => {
    test('deep json', () => {
      const json1 = getFixturePath('file3.json');
      const json2 = getFixturePath('file4.json');
      const yml1 = getFixturePath('file3.yml');
      const yml2 = getFixturePath('file4.yml');

      expect(genDiff(json1, json2)).toEqual(readFile('expected_file.txt'));
      expect(genDiff(yml1, yml2)).toEqual(readFile('expected_file.txt'));
    });
  });
});
