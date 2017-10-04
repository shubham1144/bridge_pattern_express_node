var models = require('../db/models');
var dao = {};

/* We only catch Database Validation errors thrown in sequelize at the Dao layer, as there are promises involved, and
* we do not want to loose the stack trace
* */
//================================================================================================================================================================================
/* POSTRESQL CONNECTION USING A ORM NAMED SEQUELIZE*/
//================================================================================================================================================================================

/* Function to fire a raw DB query using ORM */
dao.rawDbQuery = function (query, callback){

    models.sequelize.query(query, {type: models.sequelize.QueryTypes.SELECT}).then(function (data) {
        callback(null, data);
    }).catch(models.sequelize.DatabaseError, function (err) {
        console.log("Caught a error in the qury");
        callback(err);
    });

};

//================================================================================================================================================================================

/* Function to be used to create a object using the ORM */
dao.create = function(data, model_name, callback){

    models[model_name]
        .create(data)
        .then(function(result){
            //Iam suspecting that, the callback is returning a promise and then handling the errors associated with callback returned.

            return callback(null, result);

        })
        .catch(models.sequelize.DatabaseError, function(err){
            //We need to catch only sequelize specific errors here
            return callback(err);
        });

};

//================================================================================================================================================================================

module.exports = dao;
