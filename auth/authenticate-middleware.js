const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.headers.authorization

   Boolean (token) 
    ? jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err)
        res.status(401).json({ you: 'shall not pass!' });
      } else {
        req.decodedToken = decodedToken
        next()
      }
    })
  : res.status(400).json({ message: 'no token provided' })
  }

