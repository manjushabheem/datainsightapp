'use strict';
const ENV = require( '../bridge_env.js' );

let config_def = {
    name: ENV.APP_HOST,
    apiURL:     ENV.API_HOST,
    apiPort:    ENV.API_PORT,
    appPort:    ENV.APP_PORT,
    cloudURL:'https://console.cloud.google.com/storage/browser',
    cloudProject: 'molten-seat-210601',
    cloudBucket:'demo-tax-data-lake',
    authEndpoint: '/login',  
};
module.exports = config_def;
