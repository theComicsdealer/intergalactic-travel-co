/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
	await knex.raw(`
  CREATE TRIGGER update_timestamp
  BEFORE UPDATE
  ON flights
  FOR EACH ROW
  EXECUTE PROCEDURE update_timestamp();
`);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {};
