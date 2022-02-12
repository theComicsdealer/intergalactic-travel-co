const validToken = `Bearer ${process.env.VALID_TOKEN}`;
const invalidToken = `Bearer ${process.env.INVALID_TOKEN}`;

describe('End-to-end queries testing for planets', () => {
	it('should return an array of planets without any error', async () => {
		const client = await require('./client')();
		const res = await client
			.post('/graphql')
			.send({
				query: `query planets {
					planets {
						id
						name
						code
						spaceCenters(limit: 3) {
							id
						}
					}
				}`
			})
			.set('Authorization', validToken)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200);

		expect(res.body).toBeInstanceOf(Object);
		expect(Array.isArray(res.body.data.planets)).toBeTruthy();
		expect(res.body.data.planets[0].name).toBe('Mercury');

		return res;
	});

	it('should not be authorized', async () => {
		const client = await require('./client')();
		const res = await client
			.post('/graphql')
			.send({
				query: `query planets {
					planets {
						id
						name
						code
						spaceCenters(limit: 3) {
							id
						}
					}
				}`
			})
			.set('Authorization', invalidToken)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200);

		expect(res.body).toBeInstanceOf(Object);
		expect(res.body.errors).not.toBeNull();
		expect(res.body.data.planets).toBeNull();
		expect(res.body.errors[0].message).toBe('You are not authorized!');

		return res;
	});
});
