/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
	Promise.all([
		knex.schema.createTable('planets', (table) => {
			table.increments();
			table.string('code').primary().notNullable();
			table.string('name').notNullable();
		})
	]);

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('planets');
