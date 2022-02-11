const spaceCenters = require('../../../data/space-centers.json');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = (knex) => {
	// Deletes ALL existing entries
	return knex('space_centers')
		.del()
		.then(function () {
			// Inserts seed entries
			return knex('space_centers').insert(spaceCenters);
		});
};
