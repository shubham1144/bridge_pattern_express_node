exports.template = function(name, description){

    return  "/*" + description + "*/\n" +
            "var dao = require('../dao/dao');\n" +
            "var models = require('../db/models');\n" +
            "var util = require('../helpers/util');\n" +
            "var logger = require('../helpers/logger');\n" +
            "var async = require('async');\n" +
            "var _ = require('lodash');\n\n" +
            "exports.fetchAll" + name + " = function(limit, page, q, callback){callback(null, 'Under development')};\n" +
            "exports.fetch" + name + " = function(id, callback){callback(null, 'Under development')};\n" +
            "exports.add" + name + " = function(data, callback){callback(null, 'Under development')};\n" +
            "exports.update" + name + " = function(id, updated_data, callback){callback(null, 'Under development')};";

};