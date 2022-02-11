const { planets, Planet } = require('./planetQueriesResolver');
const {
	spaceCenters,
	spaceCenter,
	SpaceCenter
} = require('./spaceCenterQueriesResolver');
const { flight, flights, Flight } = require('./flightQueriesResolver');
const { bookings, booking, Booking } = require('./bookingQueriesResolver');

const queries = {
	spaceCenters,
	spaceCenter,
	planets,
	flight,
	flights,
	bookings,
	booking
};

module.exports = { queries, Planet, SpaceCenter, Flight, Booking };
