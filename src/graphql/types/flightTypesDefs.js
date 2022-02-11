const { gql } = require('apollo-server-koa');

const flightTypesDefs = gql`
	type Flight {
		id: Int
		code: Hexadecimal
		launchSite: SpaceCenter
		landingSite: SpaceCenter
		departureAt: DateTime
		seatCount: Int
		availableSeats: Int
	}

	type PaginateFlights {
		pagination: page
		nodes: [Flight]
	}

	input ScheduleFlightInput {
		launchSiteId: Int!
		landingSiteId: Int!
		departureAt: DateTime!
		seatCount: Int!
	}

	type Query {
		flight(id: Int!): Flight
		flights(
			from: Int
			to: Int
			seatCount: Int
			departureDay: Date
			page: Int! = 1
			pageSize: Int! = 10
		): PaginateFlights
	}

	type Mutation {
		scheduleFlight(flightInfo: ScheduleFlightInput!): Flight
	}
`;

module.exports = flightTypesDefs;
