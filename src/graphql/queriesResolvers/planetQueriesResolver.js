const { ForbiddenError } = require('apollo-server-koa');
const {
	getPlanets,
	getPlanetSpaceCenters
} = require('../../database/queries/index.js');

const planets = async (_, args, ctx) => {
	if (!ctx.user) {
		throw new ForbiddenError('You are not authorized!');
	}

	try {
		return await getPlanets();
	} catch (error) {
		throw new Error(
			`Something went wrong with the database. Here is some details: ${error.message}`
		);
	}
};

const Planet = {
	spaceCenters: async (planet, args) => {
		if (args.limit) {
			try {
				return await getPlanetSpaceCenters(planet.code, args.limit);
			} catch (error) {
				throw new Error(
					`Something went wrong with the database. Here is some details: ${error.message}`
				);
			}
		}
	}
};

module.exports = { planets, Planet };
