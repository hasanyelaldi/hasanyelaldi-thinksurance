const request = require("supertest");
const app = require('../server');

describe('person service', () => {
    test('person list should be return', async () => {
        const response = await request(app)
            .get('/get-all')
            .set('Accept', 'application/json');
        expect(response.status).toEqual(200);
    });
});