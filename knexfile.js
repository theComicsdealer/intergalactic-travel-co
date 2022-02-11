// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
	development: {
		client: process.env.DEV_DB_CLIENT,
		connection: {
			database: process.env.DEV_DB_NAME,
			user: process.env.DEV_DB_USER,
			password: process.env.DEV_DB_PASSWORD
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
