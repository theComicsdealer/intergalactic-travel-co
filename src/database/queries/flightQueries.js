const knex = require('../config/config.js');
const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('1234567890abcdef', 16);

const getAllFlights = async (params) => {
	return await knex('flights')
		.modify((queryBuilder) => {
			if (params.from) {
				queryBuilder.where('launching_site_id', params.from);
			}

			if (params.to) {
				queryBuilder.where('landing_site_id', params.to);
			}

			if (params.seatCount) {
				queryBuilder.where('seat_count', params.seatCount);
			}

			if (params.departureDay) {
				queryBuilder.where('departure_at', params.departureDay);
			}
		})
		.paginate({
			perPage: params.pageSize,
			currentPage: params.page,
			isLengthAware: true
		});
};

const getFlightById = async (flightId) => {
	return await knex('flights')
		.select('*')
		.where({ id: flightId })
		.limit(1)
		.first();
};

const scheduleFlight = async (params) => {
	const result = await knex('flights')
		.returning([
			'id',
			'code',
			'departure_at',
			'seat_count',
			'launching_site_id',
			'landing_site_id',
			'created_at',
			'updated_at'
		])
		.insert({
			code: nanoid(),
			departure_at: params.departureAt,
			seat_count: params.seatCount,
			launching_site_id: params.launchSiteId,
			landing_site_id: params.landingSiteId
		});

	return result[0];
};

module.exports = {
	getAllFlights,
	getFlightById,
	scheduleFlight
};
