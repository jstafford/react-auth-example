const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const config = require('../config');


/**
 *  The Auth Checker middleware function.
 */
const authCheck = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  console.log(`req.method: ${req.method}`)
  console.log(`req.headers.authorization: ${req.headers.authorization}`)
  console.log(`req.headers: ${JSON.stringify(req.headers)}`)
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  // get the last part from a authorization header string like 'bearer token-value'
  const token = req.headers.authorization.split(' ')[1];
  console.log(`token: ${token}`)

  // decode the token using a secret key-phrase
  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    console.log(`err: ${err}`)
    // the 401 code is for unauthorized status
    if (err) { return res.status(401).end(); }

    const userId = decoded.sub;
    console.log(`userId: ${userId}`)

    // check if a user exists
    return User.findById(userId, (userErr, user) => {
      console.log(`userErr: ${userErr}`)
      console.log(`user: ${user}`)
      if (userErr || !user) {
        return res.status(401).end();
      }

      return next();
    });
  });
};


module.exports = authCheck
