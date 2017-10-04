'use strict';
module.exports = function(sequelize, DataTypes) {
  var admin_section = sequelize.define('admin_section', {
    name: DataTypes.TEXT,
    description: DataTypes.TEXT,
    active : DataTypes.BOOLEAN,
    restricted_access : DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return admin_section;
};
