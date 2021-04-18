#!/usr/bin/env node
import program from 'commander';
import genDiff from '../index.js';

program
    .description('Compares two configuration files and shows a difference.')
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format [type]', 'output format')
    .version('0.0.1')
    .action((filePath1, filePath2) => {
        console.log(genDiff(filePath1, filePath2))
    })

program.parse(process.argv)