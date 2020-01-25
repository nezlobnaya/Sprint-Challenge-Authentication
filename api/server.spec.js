const request = require('supertest')
const server = require('../api/server')

describe('server.js', () => {
    it('should set environment to testing', () => {
        expect(process.env.NODE_ENV).toBe('test')
    })
})