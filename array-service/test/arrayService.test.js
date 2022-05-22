const request = require("supertest");
const app = require('../server');

describe('array service', () => {
    test('array can not be empty, if emty returns error(400)', async () => {
        const response = await request(app)
            .post('/clear-array')
            .send({ permutation: 3 })
            .set('Accept', 'application/json');
        expect(response.status).toEqual(400);
    });

    test('permutation can not be empty, if emty returns error(400)', async () => {
        const response = await request(app)
            .post('/clear-array')
            .send({ array: [1, 2, 3, 4, 5, 6, 7] })
            .set('Accept', 'application/json');
        expect(response.status).toEqual(400);
    });

    test('array: [1, 2, 3, 4, 5, 6, 7], permutation:3  response should be [3, 6, 2, 7, 5, 1, 4]', async () => {
        const response = await request(app)
            .post('/clear-array')
            .send({ array: [1, 2, 3, 4, 5, 6, 7], permutation: 3 })
            .set('Accept', 'application/json');
        expect(response.status).toEqual(200);
        expect(response.body.removedItems).toEqual([3, 6, 2, 7, 5, 1, 4]);
    });

    test('array: [1, 2, 3, 4, 5, 6, 7, 8], permutation:3  response should be [3, 6, 1, 5, 2, 8, 4, 7]', async () => {
        const response = await request(app)
            .post('/clear-array')
            .send({ array: [1, 2, 3, 4, 5, 6, 7, 8], permutation: 3 })
            .set('Accept', 'application/json');
        expect(response.status).toEqual(200);
        expect(response.body.removedItems).toEqual([3, 6, 1, 5, 2, 8, 4, 7]);
    });

});