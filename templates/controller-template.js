var util = require('./../helpers/util');

exports.template = function(name){

    return  "var models = require('../../../db/models');\n" +
            "var async = require('async');\n" +
            "var logger = require('../../../helpers/logger');\n" +
            "var util = require('../../../helpers/util');\n" +
            "var _customloadsh = require('../../../helpers/lodash');\n"+
            "var message = require('../../../helpers/message.json');\n"+
            "var " + util.camelCase(name) + "Service = require('../../../services/"+ util.useCaseNamingStandard(name)+"-service');\n\n" +

            "exports.fetch" + name + "= function(req, res){\n\n"+
              "\tif(req.query.id){\n"+
                "\t\t"+util.camelCase(name) + "Service.fetch" + name + "(req.query.id, function(err, result){\n"+
                  "\t\t\tif(err) return res.status(err.code).send(err.message);\n"+
                  "\t\t\tres.send(result);\n"+
                "\t\t});\n"+
              "\t}else{\n"+
                "\t\t"+util.camelCase(name) + "Service.fetchAll" + name + "(req.query.limit, req.query.page, req.query.q, req.query.cfilter, function(err, result){\n"+
                  "\t\t\tif(err) return res.status(err.code).send(err.message);\n"+
                  "\t\t\tres.send(result);\n"+
                "\t\t});\n"+
              "\t}\n\n"+
            "};\n\n" +

            "exports.create" + name + " = function(req, res){\n\n"+
              "\tvar data = req.body;\n"+
              "\tvar keys = [];\n"+
              "\tvar ifDataValid = _customloadsh.validateMinPayload(keys, data);\n"+
              "\tif(!ifDataValid){\n"+
                "\t\tres.status(message.code.badRequest).send(message.error.badRequest);\n"+
              "\t}else{\n"+
                "\t\t"+util.camelCase(name) + "Service.create" + name + "(data, function(err, result){\n"+
                  "\t\t\tif(err) return res.status(err.code).send(err.message);\n"+
                  "\t\t\tres.send(result);\n"+
                "\t\t});\n"+
              "\t}\n\n"+
            "};\n\n" +

            "exports.update" + name + " = function(req, res){\n\n"+
              "\tvar id  = req.query.id;\n"+
              "\tvar data = req.body;\n"+
              "\tvar keys = [];\n"+
              "\tvar ifDataValid = _customloadsh.validateMinPayload(keys, data);\n"+
              "\tif(!ifDataValid){\n"+
                "\t\tres.status(message.code.badRequest).send(message.error.badRequest);\n"+
              "\t}else{\n"+
                "\t\t"+util.camelCase(name) + "Service.update" + name + "(id, data, function(err, result){\n"+
                  "\t\t\tif(err) return res.status(err.code).send(err.message);\n"+
                  "\t\t\tres.send(result);\n"+
                "\t\t});\n"+
              "\t}\n\n"+
            "};\n\n" +

            "exports.delete" + name + " = function(req, res){\n\n"+
              "\tvar id  = req.query.id;\n"+
              "\t"+util.camelCase(name) + "Service.delete" + name + "(id, function(err, result){\n"+
                "\t\tif(err) return res.status(err.code).send(err.message);\n"+ 
                "\t\tres.send(result);\n"+
              "\t});\n\n"+
            "};\n\n" ;
    
};