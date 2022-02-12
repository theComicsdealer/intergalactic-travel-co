// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
	test: {
		client: 'postgresql',
		connection: {
			host: 'galactic-postgres',
			database: 'strapi_assessment_test_db',
			user: 'postgres',
			password: 'azerty'
		},
		migrations: {
			directory: __dirname + '/src/database/migrations'
		},
		seeds: {
			directory: __dirname + '/src/database/seeds'
		}
	},

	development: {
		client: 'postgresql',
		connection: {
			host: 'galactic-postgres',
			database: 'strapi_assessment_db',
			user: 'postgres',
			password: 'azerty'
		},
		migrations: {
			directory: __dirname + '/src/database/migrations'
		},
		seeds: {
			directory: __dirname + '/src/database/seeds'
		}
	},

	production: {
		client: 'postgresql',
		connection: {
			database: 'my_db',
			user: 'username',
			password: 'password'
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: 'knex_migrations'
		}
	}
};
