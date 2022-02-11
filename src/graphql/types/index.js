const { gql } = require('apollo-server-koa');
const planetTypesDefs = require('./planetTypesDefs.js');
const spaceCenterTypesDefs = require('./spaceCenterTypesDefs');
const flightTypesDefs = require('./flightTypesDefs');
const bookingTypesDefs = require('./bookingTypesDefs');
const {
	DateTypeDefinition,
	DateTimeTypeDefinition,
	EmailAddressTypeDefinition,
	HexadecimalTypeDefinition
} = require('graphql-scalars');

const generalTypesDefs = gql`
	type page {
		total: Int!
		page: Int!
		pageSize: Int!
	}
`;

const typeDefs = [
	DateTypeDefinition,
	DateTimeTypeDefinition,
	EmailAddressTypeDefinition,
	HexadecimalTypeDefinition,
	generalTypesDefs,
	planetTypesDefs,
	spaceCenterTypesDefs,
	flightTypesDefs,
	bookingTypesDefs
];

module.exports = typeDefs;
