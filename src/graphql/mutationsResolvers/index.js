const { ApolloError } = require('apollo-server-koa');

const {
	scheduleFlight,
	bookFlight
} = require('../../database/queries/index.js');

const mutations = {
	scheduleFlight: async (_, args, ctx) => {
		if (!ctx.user) {
			throw new Error('You are not authorized!');
		}

		try {
			return await scheduleFlight(args.flightInfo);
		} catch (error) {
			throw new ApolloError(
				`Something went wrong with the database. Here is some details: ${error.message}`
			);
		}
	},

	bookFlight: async (_, args, ctx) => {
		if (!ctx.user) {
			throw new Error('You are not authorized!');
		}

		try {
			return await bookFlight(args.bookingInfo);
		} catch (error) {
			throw new ApolloError(
				`Something went wrong with the database. Here is some details: ${error.message}`
			);
		}
	}
};

module.exports = mutations;
