/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
	return await knex.raw(`
    ALTER table space_centers
    DROP CONSTRAINT space_centers_planet_code_foreign,
    ADD CONSTRAINT space_centers_planet_code_foreign
      FOREIGN KEY (planet_code)
      REFERENCES planets(code)
      ON DELETE CASCADE;
  `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {};
