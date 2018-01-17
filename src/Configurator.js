const Utils = require(`./Utils`);

/**
 * Configurator class
 * Reads mentioned JSON file and check for corresponding environmental variables and adds
 * configuration field as an object property. Environmental variable has more priority.
 */
class Configurator {

    /**
     * Creates new configuration object
     * @param pathToConfigJson
     * @param envPrefix
     */
    constructor(pathToConfigJson, envPrefix = ``) {
        const me = this;

        me.envPrefix = envPrefix;

        me._spreadConfigValues(require(pathToConfigJson), me);
    }

    /**
     * Spreads configuration values over Configurator object
     * @param configObject
     * @param rootObject
     * @param rootKey
     * @private
     */
    _spreadConfigValues(configObject, rootObject = {}, rootKey = ``) {
        const me = this;

        Object.keys(configObject).forEach(key => {
            if (Utils.isObject(configObject[key])) {
                rootObject[key] = {};
                me._spreadConfigValues(configObject[key], rootObject[key], `${rootKey}.${key}`);
            } else {
                const rootString = rootKey ? `.${rootKey}` : ``;
                const envVarName = me.envPrefix ? `${me.envPrefix}${rootKey}.${key}` : key;

                if (process.env[envVarName]) {
                    rootObject[key] = process.env[envVarName] === `true` ? true :
                        process.env[envVarName] === `false` ? false :
                            process.env[envVarName];
                } else {
                    rootObject[key] = configObject[key];
                }
            }
        });
    }

}


module.exports = Configurator;