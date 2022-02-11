const { gql } = require('apollo-server-koa');

const bookingTypesDefs = gql`
	type Booking {
		id: Int
		flight: Flight
		seatCount: Int
		email: EmailAddress
	}

	type PaginateBookings {
		pagination: page
		nodes: [Booking]
	}

	type Query {
		booking(id: Int!): Booking
		bookings(
			email: EmailAddress
			page: Int! = 1
			pageSize: Int = 10
		): PaginateBookings
	}

	input BookFlightInput {
		seatCount: Int!
		flightId: Int!
		email: EmailAddress!
	}

	type Mutation {
		bookFlight(bookingInfo: BookFlightInput!): Booking
	}
`;

module.exports = bookingTypesDefs;
