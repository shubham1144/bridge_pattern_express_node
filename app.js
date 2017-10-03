#!/usr/bin/env node
/*
    This file consists of the logic for the bridge design pattern standard
    followed in Node.js Express application being developed under numadic platform
*/
var fs = require('fs'),async = require('async');
const program = require('commander'),{prompt} = require('inquirer');
var controller_template = require('./templates/controller-template');
var route_template = require('./templates/route-template');
var service_template = require('./templates/service-template');

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
],questions_is_section = [{
    type : 'input',
    name : 'restricted_access',
    message : 'Does the section have data access restriction?yes/no'
}],question_is_usecase = [
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
    }],directories = {
    CONTROLLER : { name : 'controllers', suffix : '-controller.js'},
    ROUTE :  { name : 'routes', suffix : '-route.js'},
    SERVICE : { name : 'services', suffix : '-service.js'}
};

/**
 * Function to be used to make sure that we are able to generate files as per the bridge design pattern
 * @param directory
 * @param usecase
 * @param callback
 */
function generateUsecaseFile(directory, usecase, callback){

    fs.exists(process.cwd() + '/'+ directories[directory].name +'/', (exists) => {

        //synchronous wait to make sure the directory exists before we proceed with the file creation
        if (!exists) fs.mkdirSync(process.cwd() + '/' + directories[directory].name + '/');

        //Step 1 : Generate the file as required and populate the contents of the file based on the directory
        fs.writeFile(process.cwd() + '/' + directories[directory].name + '/' + usecase + directories[directory]['suffix'],

            (directory === 'CONTROLLER') ? controller_template.template(usecase) :
            (directory === 'SERVICE'? service_template.template(usecase) :
            (directory === 'ROUTE')? route_template.template(usecase) :
            ""),

            (err) => {
                if (err) return callback(err);
                callback(null);
            });

    });
}

program
    .version('0.0.1')
    .description('Bridge Design Pattern - Standardizer\n\tKeep things as simple as possible');

program
    .command('addusecase')
    .alias('addu')
    .description('Adds a usecase in the root folder structure, following the naming standards to maintain bridge design pattern, once generated the structure can be modified to suit the usecase')
    .action(() => {
        prompt(questions)
            .then(answers =>{

                    if(answers.is_section.toLowerCase() === 'yes' || answers.is_section.toLowerCase() === 'y'){
                        prompt(questions_is_section).then(phase_two_answers =>{
                            //TODO : Create a Admin section and Generate a folder structure for the same
                        })
                    }else{
                        //TODO : Create a file structure to support the naming convention being followed in WAD
                        prompt(question_is_usecase).then(phase_two_answers =>{

                            //TODO : Generate the basic CRUD backbone for controller interface
                            async.waterfall([
                                  function generateControllerFile(cb){

                                    generateUsecaseFile('CONTROLLER', answers.usecase, function(err, result){
                                        if(err) return cb(err);
                                        cb(null);
                                    })
                                },
                                function generateServiceFile(cb){

                                    generateUsecaseFile('SERVICE', answers.usecase, function(err, result){
                                        if(err) return cb(err);
                                        cb(null);
                                    })
                                },
                                function generateRouteFile(cb){

                                    generateUsecaseFile('ROUTE', answers.usecase, function(err, result){
                                        if(err) return cb(err);
                                        cb(null);
                                    })
                                }
                            ], function(err, result){
                                    if(err) return console.error("Error occured due to : ", err);
                                    console.log("Usecase has been generated successfully!!!");
                            });
                        })
                    }
            })
    });

program.parse(process.argv);

