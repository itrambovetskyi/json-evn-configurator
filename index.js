const Configurator = require(`./src/Configurator`);


module.exports = function (pathToJson, envPrefix, ignoreCase) {
    return new Configurator(pathToJson, envPrefix, ignoreCase);
};