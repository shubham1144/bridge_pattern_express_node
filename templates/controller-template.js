exports.template = function(name){

    return "var models = require('../../db/models');\n" +
    "var async = require('async');\n" +
    "var logger = require('../../helpers/logger');\n" +
    "var util = require('../../helpers/util');\n\n" +
    "exports.fetch" + name + "= function(req, res){};\n\n" +
    "exports.create" + name + " = function(req, res){};\n\n" +
    "exports.update" + name + " = function(req, res){};\n\n";
    
};