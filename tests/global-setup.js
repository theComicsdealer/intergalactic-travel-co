const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/.env.test' });
const Knex = require('knex');

const createTestDatabase = async () => {
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
		await knex.raw(`DROP DATABASE IF EXISTS ${process.env.DEV_DB_NAME}`);
		await knex.raw(`CREATE DATABASE ${process.env.DEV_DB_NAME}`);
		console.log('Test database created successfully !');
	} catch (error) {
		throw new Error(error);
	} finally {
		await knex.destroy();
	}
};

const seedTestDatabase = async () => {
	const knex = Knex({
		client: process.env.DEV_DB_CLIENT,
		connection: {
			host: process.env.DB_HOST,
			database: process.env.DEV_DB_NAME,
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
		await knex.migrate.latest();
		console.log('Latest migrations run with success !');
		await knex.seed.run();
		console.log('Seeds run with success !');
	} catch (error) {
		throw new Error(error);
	} finally {
		await knex.destroy();
	}
};

module.exports = async () => {
	try {
		await createTestDatabase();
		await seedTestDatabase();
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};
