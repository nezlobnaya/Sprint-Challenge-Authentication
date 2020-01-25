const request = require('supertest');
const jwt = require('jsonwebtoken');

const server = require('../api/server');
const generateToken = require('../auth/generateToken');
const auth = require('../auth/authenticate-middleware');

describe('GET /api/jokes', () => {
    describe('GET /jokes', () => {
        it('returns 400 status code if not provided a token', async () => {
            const res = await request(server).get('/api/jokes');

            await expect(res.status).toBe(400);
        });

        it('returns 200 status and a list of jokes', async () => {
            const token = generateToken({ id: 1, username: "test" });

            const res = await request(server).get('/api/jokes', auth).set('authorization', token);
            await expect(res.status).toBe(200);
            await expect(res.type).toMatch(/json/i)
            await expect(res.body[0].id).toBeDefined();            
            await expect(res.body[0].joke).toBeDefined();  
            await expect(res.body.find(j => j.joke === `What did one nut say as he chased another nut?  I'm a cashew!`)).toBeDefined()
            })
        });
    });