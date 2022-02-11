const knex = require('../config/config.js');

const countFlightReservedSeats = async (flightId) => {
	return await knex.raw(`
    SELECT SUM (seat_count) AS totalReserved
    FROM bookings
    WHERE flight_id = ${flightId};
  `);
};

const getAllBookings = async (params) => {
	return await knex('bookings')
		.modify((queryBuilder) => {
			if (params.email) {
				queryBuilder.where('email', params.email);
			}
		})
		.paginate({
			perPage: params.pageSize,
			currentPage: params.page,
			isLengthAware: true
		});
};

const getBookingById = async (bookingId) => {
	return await knex('bookings')
		.select('*')
		.where({ id: bookingId })
		.limit(1)
		.first();
};

const bookFlight = async (params) => {
	const result = await knex('bookings')
		.returning(['id', 'seat_count', 'email', 'flight_id'])
		.insert({
			seat_count: params.seatCount,
			email: params.email,
			flight_id: params.flightId
		});

	return result[0];
};

module.exports = {
	countFlightReservedSeats,
	getAllBookings,
	getBookingById,
	bookFlight
};
