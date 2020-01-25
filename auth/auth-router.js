const router = require('express').Router();
const bcrypt = require('bcryptjs')
const generateToken = require('./generateToken')
const { check, validationResult } = require('express-validator')

const Users = require('../users/users-model')

router.post('/register', [
  check('username', 'Please Enter a Valid Username')
  .not()
  .isEmpty(),
  check('password', 'Please enter a Password')
],
async (req, res) => {
  // implement registration
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    })
  }
  let user = req.body
  user.password = bcrypt.hashSync(user.password, 10)
  Users.add(user)
  .then(saved => {
    const token = generateToken(saved)
    res.status(201).json({
      user: `${user.username} saved`, token})
  })
  .catch(error => {
    console.log(error)
    res.status(500).json(error)
  })
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body

  Users.getBy({ username })
  .first()
  .then(user => {
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user)
      res.status(200).json({
        m: `Welcome ${user.username}!`, token
      })
    } else {
      res.status(401).json({
        m: 'Invalid Credentials'})
    }
  })
  .catch(error => {
    res.status(500).json(error)
  })
});


module.exports = router;
