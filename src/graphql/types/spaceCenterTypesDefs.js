const { gql } = require('apollo-server-koa');

const spaceCenterTypesDefs = gql`
	type SpaceCenter {
		id: Int
		uid: ID
		name: String
		description: String
		planet: Planet
		latitude: Float
		longitude: Float
	}

	type PaginateSpaceCenters {
		pagination: page
		nodes: [SpaceCenter]
	}

	type Query {
		spaceCenter(id: Int, uid: ID): SpaceCenter
		spaceCenters(page: Int! = 1, pageSize: Int! = 10): PaginateSpaceCenters
	}
`;

module.exports = spaceCenterTypesDefs;
