const launch = async () => {
	const { server, app, httpServer } = await require('./index')();

	await new Promise((resolve) =>
		httpServer.listen({ port: process.env.PORT }, resolve)
	);
	console.log(
		`🚀 Server running at http://localhost:${process.env.PORT}${server.graphqlPath}`
	);
};

launch();
