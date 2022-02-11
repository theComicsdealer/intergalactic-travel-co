const knex = require('knex');
const { attachPaginate } = require('knex-paginate');
const config = require('../../../knexfile.js');

const environment = process.env.NODE_ENV || 'development';
const configuredKnex = knex(config[environment]);
attachPaginate();

module.exports = configuredKnex;
