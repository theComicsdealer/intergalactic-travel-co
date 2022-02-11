/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
	await knex.schema.createTable('flights', (table) => {
		table.increments();
		table.string('code', 16).notNullable();
		table.dateTime('departure_at', { useTz: false }).notNullable();
		table.integer('seat_count').notNullable();
		table.integer('launching_site_id').notNullable();
		table.integer('landing_site_id').notNullable();
		table.timestamps(false, true);

		table
			.foreign('launching_site_id')
			.references('id')
			.inTable('space_centers');
		table.foreign('landing_site_id').references('id').inTable('space_centers');
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('flights');
