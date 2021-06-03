import yaml from 'js-yaml';
import path from 'path';

const parse = (filePath) => {
  const format = path.extname(filePath);

  if (format === '.json') {
    return JSON.parse;
  } if (format === '.yml' || format === '.yaml') {
    return yaml.load;
  }
};

export default parse;
