const Configurator = require(`./src/Configurator`);


module.exports = function (pathToJson, envPrefix) {
    return new Configurator(pathToJson, envPrefix);
};