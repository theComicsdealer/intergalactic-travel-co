const { UserInputError, ForbiddenError } = require('apollo-server-koa');
const {
	getAllSpaceCenters,
	getPlanetByCode,
	getSpaceCenterByIdOrUid
} = require('../../database/queries/index.js');

const spaceCenters = async (_, args, ctx) => {
	if (!ctx.user) {
		throw new ForbiddenError('You are not authorized!');
	}

	if (args.page < 1 || args.pageSize < 1 || args.pageSize > 100) {
		throw new UserInputError('Invalid argument value');
	}

	try {
		const result = await getAllSpaceCenters(args.page, args.pageSize);

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

const spaceCenter = async (_, args, ctx) => {
	if (!ctx.user) {
		throw new ForbiddenError('You are not authorized!');
	}

	if (!args.id && !args.uid) {
		throw new UserInputError('One of these arguments (id, uid) is required!');
	}

	try {
		if (args.id) {
			return await getSpaceCenterByIdOrUid(args.id);
		}

		return await getSpaceCenterByIdOrUid(args.uid);
	} catch (error) {
		throw new Error(
			`Something went wrong with the database. Here is some details: ${error.message}`
		);
	}
};

const SpaceCenter = {
	planet: async (spaceCenter, args) => {
		try {
			return await getPlanetByCode(spaceCenter.planet_code);
		} catch (error) {
			throw new Error(
				`Something went wrong with the database. Here is some details: ${error.message}`
			);
		}
	}
};

module.exports = { spaceCenters, spaceCenter, SpaceCenter };
