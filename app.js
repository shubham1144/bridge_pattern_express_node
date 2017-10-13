#!/usr/bin/env node
/*
    This file consists of the logic for the bridge design pattern standard
    followed in Node.js Express application
*/
let fs = require('fs'),async = require('async'), _ = require('lodash');
const program = require('commander'),{prompt} = require('inquirer');
let controller_template = require('./templates/controller-template');
let route_template = require('./templates/route-template');
let service_template = require('./templates/service-template');
let dao = require('./dao/dao');
let util = require('./helpers/util');
let BottomBar = require('inquirer/lib/ui/bottom-bar');
let section_choices = null;
let loader = [
    '/ Fetching data',
    '| Fetching data',
    '\\ Fetching data',
    '- Fetching data'
], processor = [
    '/',
    '|',
    '\\',
    '-'
], i = 4, ui = null;

const   questions_is_section = [
    {
        type : 'input',
        name : 'section_name',
        message : 'Name of the section to be added'
    },
    {
        type : 'input',
        name : 'section_description',
        message : 'provide section description..minimum 20 words'
    }
    ,{
        type: 'confirm',
        name : 'restricted_access',
        message : 'Does the section have data access restriction?yes/no'
    }
],
        question_is_usecase = [{
        type : 'confirm',
        name : 'crud',
        default : 'yes',
        message : 'Do you want to create basic CRUD functions for the bridge standard files?Y'
    }],
        directories = {
            CONTROLLER : { name : 'controllers', suffix : '-controller.js'},
            ROUTE :  { name : 'routes', suffix : '-route.js'},
            SERVICE : { name : 'services', suffix : '-service.js'}
        };

/**
 * Function to fetch data associated with a section
 * @param id_fetch - allows to fetch content dynamically
 * @param callback
 */
function fetchSectionData(id_fetch, callback){

    var values = id_fetch? "'name', name, 'value', id" : "'name', name";
    //Sets the loader to wait till the section information is fetched
    ui = new BottomBar({bottomBar: loader[i % 4]});
    setInterval(function () {
        if(!section_choices) ui.updateBottomBar(loader[i++ % 4]);
    }, 50);
    let query = "select json_agg(json_build_object(" + values + ")) as choices from admin_sections where active";
    dao.rawDbQuery(query, function(err, data) {
        callback(null, data);
    });

}

/**
 * Function to be used to make sure that we are able to generate files as per the bridge design pattern
 * @param directory
 * @param usecase
 * @param callback
 */
function generateUsecaseFile(directory, usecase, details, callback){

    fs.exists(process.cwd() + '/'+ directories[directory].name +'/', (exists) => {

        //synchronous wait to make sure the directory exists before we proceed with the file creation
         if (!exists) fs.mkdirSync(process.cwd() + '/' + directories[directory].name + '/' );

        fs.exists(process.cwd() + '/'+ directories[directory].name +'/' + details.section.toLowerCase() + '/', (exists) => {

            if (!exists && directory!== 'SERVICE') fs.mkdirSync(process.cwd() + '/' + directories[directory].name + '/' + details.section.toLowerCase() + '/');
            //Step 1 : Generate the file as required and populate the contents of the file based on the directory
            fs.writeFile(
                directory!== 'SERVICE'?process.cwd() + '/' + directories[directory].name + '/' + details.section.toLowerCase() + '/' + util.useCaseNamingStandard(usecase) + directories[directory]['suffix']
                : process.cwd() + '/' + directories[directory].name + '/' + util.useCaseNamingStandard(usecase) + directories[directory]['suffix']
                ,(details && !details.crud)? "":
                (directory === 'CONTROLLER') ? controller_template.template(util.capitalizeTitleCase(usecase)) :
                (directory === 'SERVICE'? service_template.template(util.capitalizeTitleCase(usecase), details.description) :
                (directory === 'ROUTE')? route_template.template(util.capitalizeTitleCase(usecase), util.useCaseNamingStandard(usecase), details.section) :
                ""),

                (err) => {
                    if (err) return callback(err);
                    callback(null);
                });

        });
    });
}

program
    .version('0.0.1')
    .description('Bridge Design Pattern - Standardizer\n\tKeep things as simple as possible');

/*
    * Command 1 : addusecase
    * description : Allows to add a standardized folder structure in the system
*/
program
    .command('addusecase')
    .alias('addu')
    .description('Adds a usecase in the root folder structure, following the naming standards to maintain bridge design pattern, once generated the structure can be modified to suit the usecase')
    .action(() => {

        fetchSectionData(false, function(err, data){

            ui.updateBottomBar('Hello!!!\n');
            section_choices = data[0].choices;
            section_choices.push({ name : 'Section unavailable'});
            questions = [
                {
                    type : 'input',
                    name : 'usecase',
                    message : 'Enter usecase name...'
                },
                {
                    type : 'input',
                    name : 'description',
                    message : 'Provide description..minimum 20 words'
                },
                {
                    type : 'checkbox',
                    name : 'section_option',
                    message : function(){

                        return  "Choose the section under which the usecase falls\n";
                    },
                    choices : section_choices,
                    pageSize : 50
                }
            ];

            prompt(questions)
                .then(answers =>{

                    if(answers.section_option[0]=== 'Section unavailable'){
                        prompt(questions_is_section).then(section_answers => {

                            dao.create({
                                name: section_answers.section_name,
                                description: section_answers.section_description,
                                active : true,
                                restricted_access : section_answers.restricted_access
                            }, 'admin_section', function(err, data){
                                if(err){
                                    console.log("Error occured due to :", err);
                                    process.exit();
                                }
                                console.log("Section has been added in the system");
                                //TODO : Restart the process
                                process.exit();
                            });

                        })
                    }else{

                        prompt(question_is_usecase).then(phase_two_answers =>{
                            //TODO : Make sure we add the files being generated in the Section's directory
                            async.waterfall([
                                function generateControllerFile(cb){

                                    generateUsecaseFile('CONTROLLER', answers.usecase, {
                                        section : answers.section_option[0].toLowerCase(),
                                        crud : phase_two_answers.crud
                                    }, function(err, result){
                                        if(err) return cb(err);
                                        cb(null);
                                    })
                                },
                                function generateServiceFile(cb){

                                    generateUsecaseFile('SERVICE', answers.usecase, {
                                        section : answers.section_option[0].toLowerCase(),
                                        description : answers.description,
                                        crud : phase_two_answers.crud

                                    }, function(err, result){
                                        if(err) return cb(err);
                                        cb(null);
                                    })
                                },
                                function generateRouteFile(cb){

                                    generateUsecaseFile('ROUTE', answers.usecase, {
                                        section : answers.section_option[0].toLowerCase(),
                                        crud : phase_two_answers.crud
                                    }, function(err, result){
                                        if(err) return cb(err);
                                        cb(null);
                                    })
                                }
                            ], function(err, result){
                                if(err) console.error("Error occured due to : ", err);
                                console.log("Usecase has been generated successfully!!!");
                                process.exit();
                            });
                        })
                    }

                })

        })

    });

/*
     * Command 1 : addusecase
     * description : Allows to add a standardized folder structure in the system
*/

program
    .command('addapiroute')
    .alias('addaroute')
    .description('Adds a admin api in the system and associates the same with multiple admin sections')
    .action(() => {

        fetchSectionData(true, function(err, data) {

            ui.updateBottomBar('Hello!!!\n');
            section_choices = data[0].choices;
            section_choices.push({ name : 'Section unavailable'});

            var questions = [{
                type : 'input',
                name : 'path',
                message : 'Provide path to be registerd in the system (for example : "/entities")'
            },
                {
                    type : 'checkbox',
                    name : 'section_option',
                    message : function(){

                        return  "Choose the section under which the path falls\n";
                    },
                    choices : section_choices,
                    pageSize : 50
            }];

            prompt(questions)
                .then(answers =>{

                    ui = new BottomBar({bottomBar: processor[i % 4]});
                    setInterval(function () {
                        ui.updateBottomBar(processor[i++ % 4]);
                    }, 50);

                    if(_.includes(answers.path, '//')){
                        ui.updateBottomBar("");
                        console.log("\nInvalid path format. Path cannot be registered");
                        process.exit();
                    }else{

                        dao.create({
                            fk_section_id: answers.section_option[0],
                            path: answers.path,
                            fk_section_id_v1 : answers.section_option,
                            active: true
                        }, 'admin_api', function(err, data){

                            ui.updateBottomBar("");
                            if(err) console.error("Error occured due to : ", err);
                            else console.log("Api route has been registered in the system as :", answers.path);
                            process.exit();

                        })

                    }

                })
        });


    });
program.parse(process.argv);