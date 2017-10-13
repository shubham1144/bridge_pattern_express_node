var util = require('./../helpers/util');

exports.template = function(name, description){

        return  "/*\n\t" + description + "\n*/\n" +
                "var dao = require('../dao/dao');\n" +
                "var models = require('../db/models');\n" +
                "var util = require('../helpers/util');\n" +
                "var logger = require('../helpers/logger');\n" +
                "var message = require('../helpers/message.json');\n" +
                "var async = require('async');\n" +
                "var _ = require('lodash');\n\n" +
                "exports.fetchAll" + name + " = function(limit, page, q, cfilter, callback){\n\n" +
                        "\tvar query = \"\";\n" +
                        "\tdao.rawDbQuery(query, function(err, data){\n" +
                                "\t\tif(err){\n" +
                                        "\t\t\tlogger.error(\"Error occured due to : \", err);\n" +
                                        "\t\t\t\treturn callback({\n" +
                                                "\t\t\t\tcode : message.code.internalServerError,\n" +
                                                "\t\t\t\tmessage : err.name || message.error.internalServerErr\n" +
                                        "\t\t\t});\n" +
                                "\t\t}\n"+
                                "\t\tutil.formatObjectList(data, callback);\n" +
                        "\t})\n"+
                "\n};\n\n" +
                "exports.fetch" + name + " = function(id, callback){\n\n" +
                        "\tvar query = \"ENTER QUERY HERE where id = \" + id;\n"+
                        "\tdao.rawDbQuery(query, function(err, data){\n" +
                                "\t\tif(err){\n" +
                                        "\t\t\tlogger.error(\"Error occured due to : \", err);\n" +
                                        "\t\t\treturn callback({\n" +
                                                "\t\t\t\tcode : message.code.internalServerError,\n" +
                                                "\t\t\t\tmessage : err.name || message.error.internalServerErr\n" +
                                        "\t\t\t})\n" +
                                "\t\t}\n" +
                                "\tcallback(null, data[0]);\n" +
                        "\t});\n"+
                "\n};\n\n" +
                "exports.create" + name + " = function(data, callback){\n\n" +
                        "\tdao.create({}, util.MODEL_NAME.ENTER_USECASE_HERE, function(err, data){\n" +
                                "\t\tif(err){\n" +
                                        "\t\t\tlogger.error(\"Error occured due to : \", err);\n" +
                                        "\t\t\treturn callback({\n" +
                                                "\t\t\t\tcode : err.code || message.code.internalServerError,\n" +
                                                "\t\t\t\tmessage : err.name || err.message || message.error.internalServerErr\n" +
                                        "\t\t\t})\n"+
                                "\t\t}\n"+
                                "\t\tcallback(null, message.success.ENTER_USECASE_ADD_MESSAGE_HERE);\n" +
                        "\t})\n" +
                "\n};\n\n" +
                "exports.update" + name + " = function(id, updated_data, callback){\n\n" +
                        "\tdao.updateById(util.MODEL_NAME.ENTER_USECASE_HERE, id, updated_data, function(err, data){\n" +
                                "\t\tif(err){\n" +
                                        "\t\t\tlogger.error(\"Error occured due to : \", err);\n" +
                                        "\t\t\treturn callback({\n" +
                                                "\t\t\t\tcode : err.code || message.code.internalServerError,\n" +
                                                "\t\t\t\tmessage : err.name || err.message || message.error.internalServerErr\n" +
                                        "\t\t\t})\n" +
                                "\t\t}\n" +
                                "\t\tcallback(null, message.success.ENTER_USECASE_UPDATE_MESSAGE_HERE);\n" +
                        "\t})\n" +
                "\n};\n\n" +
                "exports.delete" + name + " = function(id, callback){\n\n" +
                        "\tdao.updateById(util.MODEL_NAME.ENTER_USECASE_HERE, id, { active : false }, function(err, data){\n" +
                        "\t\tif(err){\n" +
                                "\t\t\tlogger.error(\"Error occured due to : \", err);\n" +
                                "\t\t\treturn callback({\n" +
                                "\t\t\t\tcode : err.code || message.code.internalServerError,\n" +
                                "\t\t\t\tmessage : err.name || err.message || message.error.internalServerErr\n" +
                                "\t\t\t})\n" +
                        "\t\t}\n" +
                        "\t\tcallback(null, message.success.ENTER_USECASE_DELETE_MESSAGE_HERE);\n" +
                        "\t})\n" +
                "\n};";

};