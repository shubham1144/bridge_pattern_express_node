'use strict';
module.exports = function(sequelize, DataTypes) {
  var admin_api = sequelize.define('admin_api', {
    fk_section_id: DataTypes.INTEGER,
    fk_section_id_v1: DataTypes.ARRAY(DataTypes.INTEGER),
    path: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return admin_api;
};
