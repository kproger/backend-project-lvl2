import { fileURLToPath } from 'url';
// import { dirname } from 'path';
import { test, expect } from 'jest';
import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const json1 = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

const json2 = {
  timeout: 20,
  verbose: true,
  host:  'hexlet.io',
};

test('base check', () => {
  expect(gendiff(json1, json2)).toEqual(JSON.stringify());
});
