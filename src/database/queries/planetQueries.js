const knex = require('../config/config.js');
const tableName = 'planets';
const getPlanets = async () => {
	return await knex(tableName);
};

const getPlanetByCode = async (planetCode) => {
	return await knex('public.planets')
		.select('*')
		.where({ code: planetCode })
		.limit(1)
		.first();
};

module.exports = {
	getPlanets,
	getPlanetByCode
};
