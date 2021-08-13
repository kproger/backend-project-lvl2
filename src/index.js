import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import stylish from './stylish.js';
import formatAst from './formatter.js';
import buildAst from './builder.js';

const makeAbsolutePath = (filePath) => path.resolve(process.cwd(), filePath);
const getFileData = (filePath) => fs.readFileSync(makeAbsolutePath(filePath), 'utf-8');

const genDiff = (path1, path2) => {
  const obj1 = parse(path1, (getFileData(path1)));
  const obj2 = parse(path2, (getFileData(path2)));
  
  return formatAst(buildAst(obj1, obj2));
};

console.log(JSON.stringify(genDiff('__fixtures__/file3.json', '__fixtures__/file4.json')))

export {
  makeAbsolutePath,
  genDiff,
};