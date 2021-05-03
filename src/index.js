import _ from 'lodash';
import fs from 'fs';
import path from 'path';

const makeAbsolutePath = (filePath) => path.resolve(process.cwd(), filePath);
const getFileData = (filePath) => fs.readFileSync(makeAbsolutePath(filePath), 'utf-8');

const compareFlatFiles = (path1, path2) => {
  const file1 = JSON.parse(getFileData(path1));
  const file2 = JSON.parse(getFileData(path2));

  const allKeys = Object.keys(file1).concat(Object.keys(file2));
  const sortedUniqKeys = _.uniq(allKeys).sort();

  return JSON.stringify(sortedUniqKeys.reduce((acc, elem) => {
    if (!_.has(file2, elem)) {
      const oldKey = `- ${elem}`;
      acc[oldKey] = file1[elem];
      return acc;
    } if (file2[elem] !== file1[elem]) {
      const oldKey = `- ${elem}`;
      const newKey = `+ ${elem}`;
      acc[oldKey] = file1[elem];
      acc[newKey] = file2[elem];
      return acc;
    }
    return {
      ...acc,
      [`  ${elem}`]: file2[elem],
    };
  }, {}), null, ' ');
};

export default compareFlatFiles;
