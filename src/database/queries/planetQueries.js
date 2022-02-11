const knex = require('../config/config.js');

const getPlanets = async (filters) => {
	return await knex('planets').select('*').where(filters);
};

const getPlanetByCode = async (planetCode) => {
	return await knex('planets')
		.select('*')
		.where({ code: planetCode })
		.limit(1)
		.first();
};

module.exports = {
	getPlanets,
	getPlanetByCode
};
