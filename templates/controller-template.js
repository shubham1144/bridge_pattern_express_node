var util = require('./../helpers/util');

exports.template = function(name){

    return  "var models = require('../../../db/models');\n" +
            "var async = require('async');\n" +
            "var logger = require('../../../helpers/logger');\n" +
            "var util = require('../../../helpers/util');\n" +
            "var message = require('../../../helpers/message.json');\n"
            "var " + name + "Service = require('../../../services/"+ util.useCaseNamingStandard(name)+"-service');\n\n" +

            "exports.fetch" + name + "= function(req, res){\n"+
              "if(req.query.id){\n "+
                name + "Service.fetch" + name + "(req.query.id, function(err, result){\n "+
                  "if(err) return res.status(err.code).send(err.message);\n "+
                  "res.send(result);\n "+
                "});\n "+
              "}else{\n "+
                name + "Service.fetchAll" + name + "(req.query.limit, req.query.page, req.query.q, req.query.cfilter, function(err, result){\n "+
                  "if(err) return res.status(err.code).send(err.message);\n "+
                  "res.send(result);\n "+
                "});\n "+
              "}\n "+
            "};\n\n" +

            "exports.create" + name + " = function(req, res){\n"+
              "var data = req.body;\n "+
              "var keys = [];\n"+
              "var ifDataValid = _customloadsh.validateMinPayload(keys, data);\n"+
              "if(!ifDataValid){\n"+
                  "res.status(message.code.badRequest).send(message.error.badRequest);\n"+
              "}else{\n"+
              name + "Service.create" + name + "(data, function(err, result){\n "+
                "if(err)  {\n "+
                  "res.status(err.code).send(err.message);\n "+
                  "return;\n "+
                "}\n "+
                "res.send(result);\n "+
              "});\n "+
              "}\n "+
            "};\n\n" +

            "exports.update" + name + " = function(req, res){\n"+
              "var id  = req.query.id;\n "+
              "var data = req.body;\n "+
              "var keys = [];\n"+
              "var ifDataValid = _customloadsh.validateMinPayload(keys, data);\n"+
              "if(!ifDataValid){\n"+
                  "res.status(message.code.badRequest).send(message.error.badRequest);\n"+
              "}else{\n"+
              name + "Service.update" + name + "(id, data, function(err, result){\n "+
                "if(err) {\n "+
                  "res.status(err.code).send(err.message);\n "+
                  "return;\n "+
                "}\n "+
                "res.send(result);\n "+
              "});\n "+
              "}\n "+
            "};\n\n" +

            "exports.delete" + name + " = function(req, res){\n"+
              "var id  = req.query.id;\n"+
              name + "Service.delete" + name + "(id, function(err, result){\n"+
                "if(err) {\n "+
                  "res.status(err.code).send(err.message);\n "+
                  "return;\n "+
                "}\n "+
                "res.send(result);\n "+
              "});\n "+
            "};\n\n" ;
    
};