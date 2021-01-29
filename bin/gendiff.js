#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();
program.version('0.0.1');

program
    .description('Compares two configuration files and shows a difference.')
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format [type]', 'output format');

program.parse(process.argv)