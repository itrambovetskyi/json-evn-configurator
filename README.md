# json-evn-configurator
Creates JS object with fields that are merged from environmental variables and fields from json file

## Usage example
1) Create config.json file with some configuration fields:
```json
{
  "CONFIGURATION_FIELD_1": "some config data",
  "CONFIGURATION_FIELD_2": "another config data"
}
```
2) Pass the path to the config.json file to the json-env-configurator:
```js
const configurator = require(`json-env-configurator`);
const config = configurator(pathToJsonFile);

console.log(config.CONFIGURATION_FIELD_1); // -> some config data
console.log(config.CONFIGURATION_FIELD_2); // -> another config data
```

3) If you specify environmental variable with the same name as in config.json file, environmental variable will has higher priority:

        CONFIGURATION_FIELD_2=overridden node app.js
        
app.js:
```js
const configurator = require(`json-env-configurator`);
const config = configurator(pathToJsonFile);

console.log(config.CONFIGURATION_FIELD_1); // -> some config data
console.log(config.CONFIGURATION_FIELD_2); // -> overridden
```

4) You can specify special prefix for environmental variables to separate configuration by environmental variables with namespaces

Let's create another configuration file - config2.json:

```json
{
  "HOST": "localhost",
  "PORT": "3000"
}
```

        FIRST_CONFIG.CONFIGURATION_FIELD_2=overridden SECOND_CONFIG.PORT=8080 node app.js

app.js:        
```js
const configurator = require(`json-env-configurator`);
const firstConfig = configurator(pathToFirstJsonFile, `FIRST_CONFIG`);
const secondConfig = configurator(pathToSecondJsonFile, `SECOND_CONFIG`);

console.log(firstConfig.CONFIGURATION_FIELD_1); // -> some config data
console.log(firstConfig.CONFIGURATION_FIELD_2); // -> overridden

console.log(secondConfig.HOST); // -> localhost
console.log(secondConfig.PORT); // -> 8080
```