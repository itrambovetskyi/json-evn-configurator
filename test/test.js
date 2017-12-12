const path = require(`path`);
const configurator = require(`../index`);

const TEST_PREFIX = `TEST_PREFIX`;

process.env[`${TEST_PREFIX}.HAS_CORRESPONDING_ENV_VAR`] = `Overridden`;

const config = configurator(path.join(__dirname, `./config.json`), TEST_PREFIX);

console.log(config.NO_CORRESPONDING_ENV_VAR);
console.log(config.HAS_CORRESPONDING_ENV_VAR);