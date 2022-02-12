const Knex = require('knex');

module.exports = async () => {
	const knex = Knex({
		client: process.env.DEV_DB_CLIENT,
		connection: {
			host: process.env.DB_HOST,
			user: process.env.DEV_DB_USER,
			password: process.env.DEV_DB_PASSWORD
		},
		migrations: {
			directory: __dirname + '/../src/database/migrations'
		},
		seeds: {
			directory: __dirname + '/../src/database/seeds'
		}
	});

	try {
		await knex.raw(
			`SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE pid <> pg_backend_pid() AND datname = '${process.env.DEV_DB_NAME}'`
		);
		await knex.raw(`DROP DATABASE IF EXISTS ${process.env.DEV_DB_NAME}`);
	} catch (error) {
		console.log(error);
		process.exit(1);
	} finally {
		await knex.destroy();
		process.exit(1);
	}
};
