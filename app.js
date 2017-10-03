#!/usr/bin/env node
/*
    This file consists of the logic for the bridge design pattern standard
    followed in Node.js Express application being developed under numadic platform
*/
const program = require('commander');
const {prompt} = require('inquirer');

const questions = [
    {
        type : 'input',
        name : 'usecase',
        message : 'Enter usecase name...'
    },
    {
        type : 'input',
        name : 'description',
        message : 'provide description..minimum 20 words'
    },
    {
        type : 'input',
        name : 'is_section',
        message : 'Can the usecase exist as a \'section\' on its own and have multiple usecases within it?yes/no'
    }
];

const questions_is_section = [{
    type : 'input',
    name : 'restricted_access',
    message : 'Does the section have data access restriction?yes/no'
}];

const question_is_usecase = [
    {
        type : 'input',
        name : 'crud',
        message : 'Do you want to create CRUD routes for the Usecase?yes/no'
    },
    {
        type : 'input',
        name : 'common',
        message : 'Will the \'CRUD interfaces\' be common..i.e used between multiple usecases or across various sections?yes/no'
    },
    {
        type : 'input',
        name : 'swagger',
        message : 'Do you wish to generate Swagger Documentation for the CRUD routes?yes/no'
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
            .then(answers =>{

                    if(answers.is_section.toLowerCase() === 'yes' || answers.is_section.toLowerCase() === 'y'){
                        prompt(questions_is_section).then(answers =>{
                            //TODO : Create a Admin section and Generate a folder structure for the same
                        })
                    }else{
                        //TODO : Create a file structure to support the naming convention being followed in WAD
                        prompt(question_is_usecase).then(answers =>{
                            //TODO : Create a usecase and create files for the same
                            //TODO : Generate the basic CRUD backbone
                            //TODO : Swagger documentation
                            console.log("Usecase is generated");
                        })

                    }
            })
    });

program.parse(process.argv);
