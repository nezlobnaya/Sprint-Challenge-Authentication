const db = require('../database/dbConfig')

module.exports = {
    add: (user) => db('users').insert(user),
    getById: (id) => db('users').where({ id }).first(),
    getBy: (filter) => db('users').where(filter),
}
