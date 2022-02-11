const Koa = require('koa');
const http = require('http');
const bodyParser = require('koa-bodyparser');
const jwt = require('koa-jwt');
const { ApolloServer } = require('apollo-server-koa');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const typeDefs = require('./src/graphql/types/index.js');

const mutations = require('./src/graphql/mutationsResolvers/index.js');

const {
	queries,
	Planet,
	SpaceCenter,
	Flight,
	Booking
} = require('./src/graphql/queriesResolvers/index.js');

const {
	DateResolver,
	DateTimeResolver,
	EmailAddressResolver,
	HexadecimalResolver
} = require('graphql-scalars');

const startApolloServer = async (typeDefs, queries) => {
	const httpServer = http.createServer();
	const app = new Koa();
	app.use(bodyParser());
	app.use(jwt({ secret: process.env.JWT_SECRET, passthrough: true }));

	const server = new ApolloServer({
		typeDefs,
		resolvers: {
			Date: DateResolver,
			DateTime: DateTimeResolver,
			EmailAddress: EmailAddressResolver,
			Hexadecimal: HexadecimalResolver,
			Planet,
			SpaceCenter,
			Flight,
			Booking,
			Query: queries,
			Mutation: mutations
		},
		context: ({ ctx: { state: user } }) => {
			return user;
		},
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
	});

	await server.start();

	server.applyMiddleware({ app });
	httpServer.on('request', app.callback());
	await new Promise((resolve) =>
		httpServer.listen({ port: process.env.PORT }, resolve)
	);
	console.log(
		`🚀 Server running at http://localhost:${process.env.PORT}${server.graphqlPath}`
	);
	return { server, app };
};

startApolloServer(typeDefs, queries);
