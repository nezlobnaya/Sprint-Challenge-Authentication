const request = require('supertest')
const server = require('../api/server')

const db = require('../database/dbConfig')

describe('Auth router testing', () => {
    beforeEach(async () => {
        await db('users').truncate()
    })
    describe('Post /register', () => {
        it('should return 201 and a token', () => {
            return request(server)
            .post('/api/auth/register')
            .send({ username: 'vasya', password: 'password1 '})
            .then(res => {
                expect(res.status).toBe(201)
                expect(res.body.token).toBeDefined()
            })
        })
        it('should return a 400 error', () => {
            return request(server)
              .post('/api/auth/register')
              .send({ password: 'password1' })
              .then(res => {
                expect(res.status).toBe(400);
              });
          });
        it ('returns the created user from database', async () => {
            const user = {
                username: 'test',
                password: 'test'
            }
            const [ id ] = await db('users').insert(user);
            
            const newUser = await db('users').where({ id }).first();
            await expect(newUser.username).toBe('test');
            await expect(newUser.id).toBeDefined();
        });
      })
      describe('POST /login',() =>  {
        let username = 'vasya'
        let password = 'password1'
      it('should return 200', () => {
          request(server)
          .post('/api/auth/register')
          .send({ username: 'vasya', password: 'password1' })
          .then(res => {
              username = res.username;
              password = res.password;
          })
        return request(server)
          .post('/api/auth/login')
          .send({ username: username, password: password })
          .then(res => {
            expect(res.status).toBe(200);
            expect(res.body.token).toBeDefined()
          });
      });

      it('should return a 401 invalid credentials',()  => {
        return request(server)
          .post('/api/auth/login')
          .send({ username: 'andrew', password: 'password1' })
          .then(res => {
            expect(res.status).toBe(401);
          });
      });
    });

  })
