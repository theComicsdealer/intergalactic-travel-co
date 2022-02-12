const validToken = `Bearer ${process.env.VALID_TOKEN}`;

describe('End-to-end mutations testing for flights', () => {
	it('should return a scheduled flight with an id', async () => {
		const client = await require('./client')();
		const flightInfo = {
			launchSiteId: 400,
			landingSiteId: 120,
			departureAt: '2022-03-03T21:00:00Z',
			seatCount: 100
		};

		const res = await client
			.post('/graphql')
			.send({
				query: `mutation scheduleFlight {
          scheduleFlight(
            flightInfo: {
              launchSiteId: 400
              landingSiteId: 120
              departureAt: "2022-03-03T21:00:00Z"
              seatCount: 100
            }
          ) {
            id
            code
            launchSite {
              name
              planet {
                name
              }
            }
            landingSite {
              name
              planet {
                name
              }
            }
            availableSeats
            seatCount
            departureAt
          }
        }
        `
			})
			.set('Authorization', validToken)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200);

		expect(res.body).toBeInstanceOf(Object);
		expect(res.body.data.scheduleFlight).toBeInstanceOf(Object);
		expect(res.body.data.scheduleFlight.launchSite).toBeInstanceOf(Object);
		expect(res.body.data.scheduleFlight.landingSite).toBeInstanceOf(Object);
		expect(typeof res.body.data.scheduleFlight.id).toBe('number');
		expect(res.body.data.scheduleFlight.availableSeats).toBeLessThanOrEqual(
			flightInfo.seatCount
		);
		expect(res.body.data.scheduleFlight.departureAt).toMatch(
			/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
		);

		return res;
	});
});
