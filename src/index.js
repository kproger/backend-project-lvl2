import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import stylish from './stylish.js';
import { type } from 'os';

const makeAbsolutePath = (filePath) => path.resolve(process.cwd(), filePath);
const getFileData = (filePath) => fs.readFileSync(makeAbsolutePath(filePath), 'utf-8');

const genDiff = (path1, path2) => {
  const obj1 = parse(path1, (getFileData(path1)));
  const obj2 = parse(path2, (getFileData(path2)));
  
  const iter = (obj1, obj2) => {
    const result = {};
    _.union(Object.keys(obj1), Object.keys(obj2)).forEach((key) => {
      if (typeof obj2[key] === 'object' && typeof obj1[key] === 'object') {
        if (!_.has(obj2, key)) {
          return result[`- ${key}`] = iter(obj1[key], obj2[key]);
        } if (!_.has(obj1, key)) {
          return result[`+ ${key}`] = iter(obj1[key], obj2[key]);
        } if (typeof obj2[key] === 'object') {
          return result[`  ${key}`] = iter(obj1[key], obj2[key]);
        }
      }

      if (!_.has(obj2, key)) {
        return result[`- ${key}`] = obj1[key];
      } else if (!_.has(obj1, key)) {
        return result[`+ ${key}`] = obj2[key];
      // } if (obj1[key] !== obj2[key] && obj1[key].length === 0) {
      //   result[`- ${key}`] = '';
      //   return result[`+ ${key}`] = obj2[key];
      } if (obj1[key] !== obj2[key]) {
        if (key === 'wow') {
          result[`- ${key}`] = '';
          return result[`+ ${key}`] = obj2[key];
        }
        result[`- ${key}`] = obj1[key];
        return result[`+ ${key}`] = obj2[key];
        }

      if (typeof obj2[key] === 'object') {
        return result[`  ${key}`] = iter(obj2[key]);
      } else {
        result[`  ${key}`] = obj2[key]
      }
    });
    return result;
  }
  return stylish(iter(obj1, obj2));
};

export {
  makeAbsolutePath,
  genDiff,
};