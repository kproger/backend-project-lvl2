import yaml from 'js-yaml';
import path from 'path';

const parse = (filePath, fileContents) => {
  const format = path.extname(filePath);

  switch (format) {
    case '.json':
      return JSON.parse(fileContents);

    case '.yml':
      return yaml.load(fileContents);

    case '.yaml':
      return yaml.load(fileContents);

    default:
      throw new Error(`Unknown format: '${format}'!`);
  }
};

export default parse;
