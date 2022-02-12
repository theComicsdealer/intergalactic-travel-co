const initClient = async () => {
	const { httpServer } = await require('../index.js')();
	const supertest = require('supertest');
	const client = supertest(httpServer);

	return client;
};

module.exports = initClient;
