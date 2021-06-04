import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import parse from './parsers.js';

const makeAbsolutePath = (filePath) => path.resolve(process.cwd(), filePath);
const getFileData = (filePath) => fs.readFileSync(makeAbsolutePath(filePath), 'utf-8');

const makeAppropiateOutput = (obj) => {
  const properties = Object.entries(obj);
  const keysAndPorperiesArray = properties.map(([key, property]) => `${key}: ${property}`).join('\n  ');

  return `{\n  ${keysAndPorperiesArray}\n}`;
};

const compareFlatFiles = (path1, path2) => {
  const file1 = parse(path1, (getFileData(path1)));
  const file2 = parse(path2, (getFileData(path2)));

  const allKeys = Object.keys(file1).concat(Object.keys(file2));
  const sortedUniqKeys = _.uniq(allKeys).sort();

  return makeAppropiateOutput(sortedUniqKeys.reduce((acc, key) => {
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

export {
  makeAbsolutePath,
  makeAppropiateOutput,
  getFileData,
  compareFlatFiles as genDiff,
};
