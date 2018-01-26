const Utils = require(`./Utils`);

/**
 * Configurator class
 * Reads mentioned JSON file and check for corresponding environmental variables and adds
 * configuration field as an object property. Environmental variable has more priority.
 */
class Configurator {

    static get DEFAULT_SEPARATOR() { return `.`; }
    static get SEPARATOR_KEY() { return `ENVSEPARATOR`; }

    static get LEVELS_SEPARATOR() {
        return process.env[Configurator.SEPARATOR_KEY] || Configurator.DEFAULT_SEPARATOR;
    }

    /**
     * Creates new configuration object
     * @param pathToConfigJsonOrPlainObject
     * @param envPrefix
     */
    constructor(pathToConfigJsonOrPlainObject, envPrefix = ``) {
        const me = this;
        let configJsonObject;

        me.levelsSeparator = Configurator.LEVELS_SEPARATOR;
        me.envPrefix = envPrefix;

        if (Utils.isObject(pathToConfigJsonOrPlainObject)) {
            configJsonObject = pathToConfigJsonOrPlainObject;
        } else {
            configJsonObject = require(pathToConfigJsonOrPlainObject);
        }

        me._spreadConfigValues(configJsonObject, me);
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
                me._spreadConfigValues(configObject[key], rootObject[key], `${rootKey}${me.levelsSeparator}${key}`);
            } else {
                const envVarName = me.envPrefix ? `${me.envPrefix}${rootKey}${me.levelsSeparator}${key}` : key;

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