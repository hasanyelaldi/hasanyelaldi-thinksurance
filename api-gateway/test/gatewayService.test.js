const request = require("supertest");
const app = require('../server');

describe('gateway service', () => {
    let accessToken;

    //Login
    test('returns error if username empty (400)', async () => {
        const response = await request(app)
            .post('/auth')
            .send({ "pwd": "Aa$12345" })
            .set('Accept', 'application/json');
        expect(response.status).toEqual(400);
    });

    test('returns error if password empty (400)', async () => {
        const response = await request(app)
            .post('/auth')
            .send({ "user": "thinksurance" })
            .set('Accept', 'application/json');
        expect(response.status).toEqual(400);
    });

    test('returns unauthorized if user doesnt exist (401)', async () => {
        const response = await request(app)
            .post('/auth')
            .send({ "user": "sasdasdsa", "pwd": "12345" })
            .set('Accept', 'application/json');
        expect(response.status).toEqual(401);
    });

    test('accessToken should be return if username and password exist', async () => {
        const response = await request(app)
            .post('/auth')
            .send({ "user": "thinksurance", "pwd": "Aa$12345" })
            .set('Accept', 'application/json');
        expect(response.status).toEqual(200);
        accessToken = response.body.accessToken;
    });

    //Refresh
    test('returns unauthorized if refresh token does not exist in cookie(401)', async () => {
        const response = await request(app)
            .get('/refresh')
            .set('Accept', 'application/json');
        expect(response.status).toEqual(401);
    });

    // test('accessToken should be return if refreshToken exist', async () => {
    //     const response = await request(app)
    //         .get('/refresh')
    //         .set('Accept', 'application/json');
    //     expect(response.status).toEqual(200);
    // });

    //Logout
    test('user should be able to logout if user logged in', async () => {
        const response = await request(app)
            .get('/logout')
            .set('Accept', 'application/json');
        expect(response.status).toEqual(204);
    });

    //Register
    test('returns error if username empty (400)', async () => {
        const response = await request(app)
            .post('/register')
            .send({ "pwd": "Aa$12345" })
            .set('Accept', 'application/json');
        expect(response.status).toEqual(400);
    });

    test('returns error if password empty (400)', async () => {
        const response = await request(app)
            .post('/register')
            .send({ "user": "thinksurance" })
            .set('Accept', 'application/json');
        expect(response.status).toEqual(400);
    });

    test('returns conflict if username and password exist on register (409)', async () => {
        const response = await request(app)
            .post('/register')
            .send({ "user": "thinksurance", "pwd": "Aa$12345" })
            .set('Accept', 'application/json');
        expect(response.status).toEqual(409);
        accessToken = response.body.accessToken;
    });

    // test('user should be able to register if username doesn't exist', async () => {
    //     const response = await request(app)
    //         .post('/register')
    //         .send({ "user": "newUser", "pwd": "Aa$12345" })
    //         .set('Accept', 'application/json');
    //     expect(response.status).toEqual(200);
    //     accessToken = response.body.accessToken;
    // });


});