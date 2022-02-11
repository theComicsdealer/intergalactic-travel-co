/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
	await knex.schema.createTable('bookings', (table) => {
		table.increments();
		table.integer('seat_count').notNullable();
		table.string('email').notNullable();
		table.integer('flight_id').notNullable();
		table.timestamps(false, true);

		table.foreign('flight_id').references('id').inTable('flights');
	});

	await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON bookings
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('bookings');
