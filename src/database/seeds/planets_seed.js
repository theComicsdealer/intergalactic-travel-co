const planets = require('../../../data/planets.json');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = (knex) => {
	// Deletes ALL existing entries
	return knex('planets')
		.del()
		.then(function () {
			// Inserts seed entries
			return knex('planets').insert(planets);
		});
};
