
/**
 * Configurator class
 * Reads mentioned JSON file and check for corresponding environmental variables and adds
 * configuration field as an object property. Environmental variable has more priority.
 */
class Configurator {

    constructor(pathToConfigJson, envPrefix = ``) {
        const me = this;
        const configJson = require(pathToConfigJson);

        Object.keys(configJson).forEach(key => {
            const envVarName = envPrefix ? `${envPrefix}.${key}` : key;

            me[key] = process.env[envVarName] ? process.env[envVarName] : configJson[key];
        });
    }

}


module.exports = Configurator;