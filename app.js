#!/usr/bin/env node
/*
    This file consists of the logic for the bridge design pattern standard
    followed in Node.js Express application being developed under numadic platform
*/
const program = require('commander');
const {prompt} = require('inquirer');

const questions = [{
    type : 'input',
    name : 'usecase',
    message : 'Enter usecase name...'
}];
program
    .version('0.0.1')
    .description('Bridge Design Pattern - Standardizer\n\tKeep things as simple as possible');

program
    .command('addusecase')
    .alias('addu')
    .description('Adds a usecase in the root folder structure, following the naming standards to maintain bridge design pattern')
    .action(() => {
        prompt(questions)
            .then(answers =>
                console.log(answers)
            )
    });

program.parse(process.argv);
