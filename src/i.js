import _ from 'lodash';
import path from 'path';
import fs, { readFileSync } from 'fs';
import parse from './parsers.js';
import { genDiff } from './index.js';

const makeAbsolutePath = (filePath) => path.resolve(process.cwd(), filePath);
const getFileData = (filePath) => fs.readFileSync(makeAbsolutePath(filePath), 'utf-8');

const makeAppropiateOutput = (obj) => {
  const properties = Object.entries(obj);
  const keysAndPorperiesArray = properties.map(([key, property]) => `${key}: ${property}`).join('\n  ');

  return `{\n  ${keysAndPorperiesArray}\n}`;
};

const compareFlatFiles = (file1, file2) => { // rename path1 --> file1
//   const file1 = parse(path1, (getFileData(path1)));
  //   const file2 = parse(path2, (getFileData(path2)));

  const allKeys = Object.keys(file1).concat(Object.keys(file2));
  //   const sortedUniqKeys = _.uniq(allKeys).sort();

  return makeAppropiateOutput(allKeys.reduce((acc, key) => {
    if (!_.has(file2, key)) {
      const removedKey = `- ${key}`;
      acc[removedKey] = file1[key];
      return acc;
    } if (!_.has(file1, key)) {
      const addedKey = `+ ${key}`;
      acc[addedKey] = file2[key];
      return acc;
    } if (file2[key] !== file1[key]) {
      const oldKey = `- ${key}`;
      const newKey = `+ ${key}`;
      acc[oldKey] = file1[key];
      acc[newKey] = file2[key];
      return acc;
    }
    return {
      ...acc,
      [`  ${key}`]: file2[key],
    };
  }, {}));
};

const o1 = JSON.parse(getFileData('__fixtures__/file3.json'));
const o2 = JSON.parse(getFileData('__fixtures__/file4.json'));

const diff = (obj1, obj2) => {
  const result = {};

  _.union(Object.keys(obj1), Object.keys(obj2)).forEach((key) => {
    if (typeof obj2[key] === 'object' && typeof obj1[key] === 'object') {
      if (!_.has(obj2, key)) {
        return result[`- ${key}`] = diff(obj1[key], obj2[key]);
      } if (!_.has(obj1, key)) {
        return result[`+ ${key}`] = diff(obj1[key], obj2[key]);
      } if (typeof obj2[key] === 'object') {
        return result[`  ${key}`] = diff(obj1[key], obj2[key]);
      }
    }

    if (!_.has(obj2, key)) {
      return result[`- ${key}`] = obj1[key];
    } if (!_.has(obj1, key)) {
      return result[`+ ${key}`] = obj2[key];
    } if (obj1[key] !== obj2[key]) {
      result[`- ${key}`] = obj1[key];
      return result[`+ ${key}`] = obj2[key];
    }

    if (typeof obj2[key] === 'object') {
      return result[`  ${key}`] = obj2[key];
    }
  });
  return result;
};