const request = require('supertest');
const app = require('../../index');

describe('Sample Test', () => {
  it('should fetch all users', async () => {
    const res = await request(app).get('/api/v1/user');
    expect(res.statusCode).toEqual(200);
    // expect(res.body).toHaveProperty('posts');
    // expect(res.body.posts).toHaveLength(1);
  });
});
