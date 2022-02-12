const { getPlanets, getPlanetByCode } = require('./planetQueries');

const {
	countFlightReservedSeats,
	getAllBookings,
	getBookingById,
	bookFlight
} = require('./bookingQueries');

const {
	getAllFlights,
	getFlightById,
	scheduleFlight
} = require('./flightQueries');

const {
	getAllSpaceCenters,
	getPlanetSpaceCenters,
	getSpaceCenterByIdOrUid
} = require('./spaceCenterQueries');

module.exports = {
	getPlanets,
	getPlanetSpaceCenters,
	getAllSpaceCenters,
	getPlanetByCode,
	getSpaceCenterByIdOrUid,
	countFlightReservedSeats,
	getAllFlights,
	getFlightById,
	getAllBookings,
	getBookingById,
	scheduleFlight,
	bookFlight
};
