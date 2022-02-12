const { UserInputError, ForbiddenError } = require('apollo-server-koa');
const {
	getAllBookings,
	getBookingById,
	getFlightById
} = require('../../database/queries/index.js');

const bookings = async (_, args, ctx) => {
	if (!ctx.user) {
		throw new ForbiddenError('You are not authorized!');
	}

	if (args.page < 1 || args.pageSize < 1 || args.pageSize > 100) {
		throw new UserInputError('Invalid argument value');
	}

	try {
		const result = await getAllBookings(args.page, args.pageSize);

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

const booking = async (_, args, ctx) => {
	if (!ctx.user) {
		throw new ForbiddenError('You are not authorized!');
	}

	try {
		return await getBookingById(args.id);
	} catch (error) {
		throw new Error(
			`Something went wrong with the database. Here is some details: ${error.message}`
		);
	}
};

const Booking = {
	seatCount: (booking) => booking.seat_count,
	flight: async (booking, args) => {
		try {
			return await getFlightById(booking.flight_id);
		} catch (error) {
			throw new Error(
				`Something went wrong with the database. Here is some details: ${error.message}`
			);
		}
	}
};

module.exports = { bookings, booking, Booking };
