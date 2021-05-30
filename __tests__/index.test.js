import {
  fileURLToPath,
} from 'url';
import path, {
  dirname,
} from 'path';
import {
  expect,
  test,
} from '@jest/globals';
import {
  makeAbsolutePath,
  genDiff,
} from '../src/index.js';

const __filename = fileURLToPath(
  import.meta.url,
);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const pathToFixturedFile1 = getFixturePath('file1.json');
const pathToFixturedFile2 = getFixturePath('file2.json');

test('base check', () => {
  const expectedOutpout = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
  expect(expectedOutpout).toEqual(genDiff(pathToFixturedFile1, pathToFixturedFile2));
});

test('path construction', () => {
  const cwd = '/home/sharif/prog/proj2';
  const srcDirectory = '/home/sharif/prog/proj2/__tests__';

  expect(makeAbsolutePath('')).toBe(cwd);
  expect(makeAbsolutePath('./__tests__')).toEqual((srcDirectory));
});
