import _ from "lodash";
import fs from 'fs';
import path from 'path';

const makeAbsolutePath = (filePath) => path.resolve(process.cwd(), filePath);
const getFileData = (filePath) => fs.readFileSync(makeAbsolutePath(filePath), 'utf-8');

const compareFlatFiles = (path1, path2) => {
    // const file1 = getFileData(path1);
    // const file2 = getFileData(path2);

    const file1 = fs.readFileSync(path.resolve(path1), 'utf-8');
    const file2 = fs.readFileSync(path.resolve(path2), 'utf-8');

    const allKeys = Object.keys(file1).concat(Object.keys(file2));
    const sortedUniqKeys = _.uniq(allKeys).sort();

    return JSON.stringify(sortedUniqKeys.reduce((acc, elem) => {
        if (!_.has(file2, elem)) {
            const oldKey = '- ' + elem;
            acc[oldKey] = file1[elem];
            return acc
        } else if (file2[elem] !== file1[elem]) {
            const oldKey = '- ' + elem;
            const newKey = '+ ' + elem;
            acc[oldKey] = file1[elem];
            acc[newKey] = file2[elem]
            return acc
        } else {
            return {
                ...acc,
                ['  ' + elem]: file2[elem]
            }
        }
    }, {}), null, ' ')
};



export default compareFlatFiles;