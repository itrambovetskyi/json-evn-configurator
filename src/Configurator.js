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

            if (process.env[envVarName]) {
                me[key] = process.env[envVarName] === `true` ? true :
                    process.env[envVarName] === `false` ? false :
                        process.env[envVarName];
            } else {
                me[key] = configJson[key];
            }
        });
    }

}


module.exports = Configurator;