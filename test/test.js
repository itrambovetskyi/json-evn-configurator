const initialConfigJSON = require(`./config.json`);
const path = require(`path`);
const configurator = require(`../index`);

const TEST_PREFIX = `TEST_PREFIX`;
const SEPARATOR = `*`;
const envSeparatorKey = `ENVSEPARATOR`;
const env1Key = `${TEST_PREFIX}${SEPARATOR}HAS_CORRESPONDING_ENV_VAR`;
const env2Key = `${TEST_PREFIX}${SEPARATOR}DEEP_CONFIGURATION${SEPARATOR}FIRST_DEEP_TEST_ENV_VAR`;
const env3Key = `${TEST_PREFIX}${SEPARATOR}DEEP_CONFIGURATION${SEPARATOR}DEEPER_CONFIGURATION${SEPARATOR}SECOND_DEEP_TEST_ENV_VAR`;
const env4Key = `${TEST_PREFIX}${SEPARATOR}DEEP_CONFIGURATION${SEPARATOR}DEEPER_CONFIGURATION${SEPARATOR}DEEPEST_CONFIGURATION${SEPARATOR}THIRD_DEEP_TEST_ENV_VAR`;

process.env[envSeparatorKey] = SEPARATOR;
process.env[env1Key] = `Overridden`;
process.env[env2Key] = `HelloWorld`;
process.env[env3Key] = `777`;
process.env[env4Key] = `yes`;

const config = configurator(path.join(__dirname, `./config.json`), TEST_PREFIX);

console.log(`${config.NO_CORRESPONDING_ENV_VAR} should be ${initialConfigJSON.NO_CORRESPONDING_ENV_VAR}`);
console.log(`${config.HAS_CORRESPONDING_ENV_VAR} should be ${process.env[env1Key]}`);
console.log(`${config.DEEP_CONFIGURATION.FIRST_DEEP_TEST} should be ${initialConfigJSON.DEEP_CONFIGURATION.FIRST_DEEP_TEST}`);
console.log(`${config.DEEP_CONFIGURATION.FIRST_DEEP_TEST_ENV_VAR} should be ${process.env[env2Key]}`);
console.log(`${config.DEEP_CONFIGURATION.DEEPER_CONFIGURATION.SECOND_DEEP_TEST} should be ${initialConfigJSON.DEEP_CONFIGURATION.DEEPER_CONFIGURATION.SECOND_DEEP_TEST}`);
console.log(`${config.DEEP_CONFIGURATION.DEEPER_CONFIGURATION.SECOND_DEEP_TEST_ENV_VAR} should be ${process.env[env3Key]}`);
console.log(`${config.DEEP_CONFIGURATION.DEEPER_CONFIGURATION.DEEPEST_CONFIGURATION.THIRD_DEEP_TEST} should be ${initialConfigJSON.DEEP_CONFIGURATION.DEEPER_CONFIGURATION.DEEPEST_CONFIGURATION.THIRD_DEEP_TEST}`);
console.log(`${config.DEEP_CONFIGURATION.DEEPER_CONFIGURATION.DEEPEST_CONFIGURATION.THIRD_DEEP_TEST_ENV_VAR} should be ${process.env[env4Key]}`);

const configPlainObject = configurator({
    NO_ENV: `true`,
    HAS_CORRESPONDING_ENV_VAR: `false`
}, TEST_PREFIX);

console.log(`${configPlainObject.NO_ENV} should be true`);
console.log(`${configPlainObject.HAS_CORRESPONDING_ENV_VAR} should be ${process.env[env1Key]}`);