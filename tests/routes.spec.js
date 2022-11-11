const request = require('supertest');
const rewire = require('rewire');
const { expect } = require('chai');
let app;

describe('Testing express app routes', () => {
    before(() => {
        app = rewire('../index.js');
    });

    describe('Testing /api route', () => {

        it('GET /api should return the current time in a JSON object with a "unix" and "utc" key', () => {
            request(app)
                .get('/api')
                .expect(200)
                .end((error, response) => {
                    if (error) {
                        reject(new Error('An error occured with the /api route, error: ' + error))
                    }
                    expect(response.body)
                        .to.have.property('unix');
                    expect(response.body)
                        .to.have.property('utc');
                });
        });

        it('GET /api/this-is-not-a-date should return a JSON object { error: "Invalid Date" }', () => {
            request(app)
                .get('/api/this-is-not-a-date')
                .expect(200)
                .end((error, response) => {
                    if (error) {
                        reject(new Error('An error occured with the /api route, error: ' + error))
                    }
                    expect(response.body)
                        .to.have.property('error')
                        .to.equal("Invalid Date")
                });
        });

        it('GET /api/2015-12-25 return a JSON object { unix: 1451001600000, "utc":"Fri, 25 Dec 2015 00:00:00 GMT" }', () => {
            request(app)
                .get('/api/2015-12-25')
                .expect(200)
                .end((error, response) => {
                    if (error) {
                        reject(new Error('An error occured with the /api route, error: ' + error))
                    }
                    expect(response.body)
                        .to.have.property('unix')
                        .to.equal(1451001600000)
                    expect(response.body)
                        .to.have.property('utc')
                        .to.equal("Fri, 25 Dec 2015 00:00:00 GMT")
                });
        });

        it('GET /api/1451001600000 return a JSON object { unix: 1451001600000, "utc":"Fri, 25 Dec 2015 00:00:00 GMT" }', () => {
            request(app)
                .get('/api/1451001600000')
                .expect(200)
                .end((error, response) => {
                    if (error) {
                        reject(new Error('An error occured with the /api route, error: ' + error))
                    }
                    expect(response.body)
                        .to.have.property('unix')
                        .to.equal(1451001600000)
                    expect(response.body)
                        .to.have.property('utc')
                        .to.equal("Fri, 25 Dec 2015 00:00:00 GMT")
                });
        });

    });

});