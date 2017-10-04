exports.template = function(name){

    return  " var express = require('express');\n" +
            " var router = express.Router();\n" +
            " var " + name + " = require('../controllers/" + name + "-controller');\n\n" +
            " /**\n" +
            "  * @swagger\n" +
            "  * definition:\n" +
            "  *   " + name + ":\n" +
            "  *      properties:\n" +
            "  *       id:\n" +
            "  *        type : integer\n" +
            "  */\n" +
            " \n\n" +
            " /**\n" +
            "  * @swagger\n" +
            "  * /" + name + ":\n" +
            "  *   get:\n" +
            "  *     tags:\n" +
            "  *       - " + name + " APIs\n" +
            "  *     summary : List " + name + " available with the numadic platform\n" +
            "  *     description : Fetch a list of all the " + name + "s\n" +
            "  *     produces:\n" +
            "  *       - application/json\n" +
            "  *     parameters:\n" +
            "  *       - in: header\n" +
            "  *         name: Authorization\n" +
            "  *         type: string\n" +
            "  *         required: true\n" +
            "  *       - name: q\n" +
            "  *         description: filter by search query\n" +
            "  *         in: query\n" +
            "  *         type: string\n" +
            "  *         required: false\n" +
            "  *       - name: limit\n" +
            "  *         description: number of list to be shown\n" +
            "  *         in: query\n" +
            "  *         type: integer\n" +
            "  *         required: false\n" +
            "  *       - name: page\n" +
            "  *         description: page offset\n" +
            "  *         in: query\n" +
            "  *         type: integer\n" +
            "  *         required: false\n" +
            "  *     responses:\n" +
            "  *       200:\n" +
            "  *         description: " + name + " data in JSON\n" +
            "  *       500:\n" +
            "  *         description: Internal Server Error\n" +
            "  *\n" +
            "  */\n" +
            " router.get('/', " + name + ".fetchAll" + name + ");\n" +
            " \n" +
            " /**\n" +
            " * @swagger\n" +
            " * /" + name + ":\n" +
            " *   post:\n" +
            " *     tags:\n" +
            " *       - " + name + " APIs\n" +
            " *     summary : Add a new " + name + "\n" +
            " *     description : Adds a " + name + " to choose\n" +
            " *     produces:\n" +
            " *       - application/json\n" +
            " *     parameters:\n" +
            " *       - in: header\n" +
            " *         name: Authorization\n" +
            " *         type: string\n" +
            " *         required: true\n" +
            " *       - name: " + name + "\n" +
            " *         description: " + name + " to be added\n" +
            " *         in: body\n" +
            " *         required: true\n" +
            " *         schema:\n" +
            " *               $ref: '#/definitions/" + name + "'\n" +
            " *     responses:\n" +
            " *       200:\n" +
            " *         description: " + name + " added successfully\n" +
            " *       400:\n" +
            " *         description: Bad Request\n" +
            " *       500:\n" +
            " *         description: Internal Server Error\n" +
            " *\n" +
            " */\n" +
            " router.post('/', " + name + ".add" + name+ ");\n" +
            " \n" +
            " /**\n" +
            "  * @swagger\n" +
            "  * /" + name + ":\n" +
            "  *   put:\n" +
            "  *     tags:\n" +
            "  *       - " + name + " APIs\n" +
            "  *     summary : Update a " + name + "\n" +
            "  *     description : Updates a " + name + "\n" +
            "  *     produces:\n" +
            "  *       - application/json\n" +
            "  *     parameters:\n" +
            "  *       - in: header\n" +
            "  *         name: Authorization\n" +
            "  *         type: string\n" +
            "  *         required: true\n" +
            "  *       - name: " + name + "\n" +
            "  *         description: " + name + " to be updated\n" +
            "  *         in: body\n" +
            "  *         required: true\n" +
            "  *         schema:\n" +
            "  *               $ref: '#/definitions/" + name + "'\n" +
            "  *     responses:\n" +
            "  *       200:\n" +
            "  *         description: " + name + " updated successfully\n" +
            "  *       400:\n" +
            "  *         description: Bad Request\n" +
            "  *       500:\n" +
            "  *         description: Internal Server Error\n" +
            "  *\n" +
            "  */\n" +
            " router.put('/', " + name + ".update" + name + ");\n" +
            " \nmodule.exports = router;";
    
};