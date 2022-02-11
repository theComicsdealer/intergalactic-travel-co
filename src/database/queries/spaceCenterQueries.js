const knex = require('../config/config.js');

const getAllSpaceCenters = async (page, pageSize) => {
	return await knex('space_centers').paginate({
		perPage: pageSize,
		currentPage: page,
		isLengthAware: true
	});
};

const getPlanetSpaceCenters = async (planetCode, limit) => {
	return await knex('space_centers')
		.select('*')
		.where({ planet_code: planetCode })
		.limit(limit);
};

const getSpaceCenterByIdOrUid = async (id) => {
	return typeof id === 'number'
		? await knex('space_centers').select('*').where({ id: id }).limit(1).first()
		: await knex('space_centers')
				.select('*')
				.where({ uid: id })
				.limit(1)
				.first();
};

module.exports = {
	getAllSpaceCenters,
	getPlanetSpaceCenters,
	getSpaceCenterByIdOrUid
};
