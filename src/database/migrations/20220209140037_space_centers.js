/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
	Promise.all([
		knex.schema.createTable('space_centers', (table) => {
			table.increments();
			table.string('uid').unique().notNullable();
			table.string('name').notNullable();
			table.text('description').notNullable();
			table.float('latitude');
			table.float('longitude');
			table.string('planet_code').notNullable();

			table.foreign('planet_code').references('code').inTable('planets');
		})
	]);

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('space_centers');
