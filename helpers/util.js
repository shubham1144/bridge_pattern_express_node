var _=require('lodash');

exports.useCaseNamingStandard = function(usecase){
    return _.kebabCase(usecase);
};

exports.camelCase = function(usecase){
    return _.camelCase(usecase)
};

exports.titleCase = function(usecase){
    return _.startCase(_.toLower(usecase))
};

exports.capitalizeTitleCase = function (usecase){
    return _.startCase(usecase).replace(/ /g, '')
};
