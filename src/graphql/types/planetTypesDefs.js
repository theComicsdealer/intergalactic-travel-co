const { gql } = require('apollo-server-koa');

const planetTypesDefs = gql`
	type Planet {
		id: Int
		name: String
		code: String
		spaceCenters(limit: Int!): [SpaceCenter]
	}

	type Query {
		planets: [Planet]
	}
`;

module.exports = planetTypesDefs;
