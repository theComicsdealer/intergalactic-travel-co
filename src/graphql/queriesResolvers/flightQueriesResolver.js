const { ForbiddenError } = require('apollo-server-koa');

const {
	getSpaceCenterByIdOrUid,
	countFlightReservedSeats,
	getAllFlights,
	getFlightById
} = require('../../database/queries/index.js');

const flight = async (_, args, ctx) => {
	if (!ctx.user) {
		throw new ForbiddenError('You are not authorized!');
	}

	try {
		return await getFlightById(args.id);
	} catch (error) {
		throw new Error(
			`Something went wrong with the database. Here is some details: ${error.message}`
		);
	}
};

const flights = async (_, args, ctx) => {
	if (!ctx.user) {
		throw new ForbiddenError('You are not authorized!');
	}

	if (args.page < 1 || args.pageSize < 1 || args.pageSize > 100) {
		throw new UserInputError('Invalid argument value');
	}

	try {
		const result = await getAllFlights(args);

		return {
			pagination: {
				total: result.pagination.total,
				page: result.pagination.currentPage,
				pageSize: result.pagination.perPage
			},
			nodes: result.data
		};
	} catch (error) {
		throw new Error(
			`Something went wrong with the database. Here is some details: ${error.message}`
		);
	}
};

const Flight = {
	departureAt: (flight) => flight.departure_at,
	seatCount: (flight) => flight.seat_count,
	launchSite: async (flight, args) => {
		try {
			return await getSpaceCenterByIdOrUid(flight.launching_site_id);
		} catch (error) {
			throw new Error(
				`Something went wrong with the database. Here is some details: ${error.message}`
			);
		}
	},

	landingSite: async (flight, args) => {
		try {
			return await getSpaceCenterByIdOrUid(flight.landing_site_id);
		} catch (error) {
			throw new Error(
				`Something went wrong with the database. Here is some details: ${error.message}`
			);
		}
	},

	availableSeats: async (flight, args) => {
		try {
			const result = await countFlightReservedSeats(flight.id);
			let totalReservedSeats = result.rows[0].totalreserved;

			if (totalReservedSeats !== null) {
				return flight.seat_count - totalReservedSeats;
			}

			return flight.seat_count;
		} catch (error) {
			throw new Error(
				`Something went wrong with the database. Here is some details: ${error.message}`
			);
		}
	}
};

module.exports = { flight, flights, Flight };
