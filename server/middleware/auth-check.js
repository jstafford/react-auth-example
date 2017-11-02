const jwt = require('jsonwebtoken')
const set = require('lodash/set')
const config = require('../config')

/**
 *  The Auth Checker middleware function.
 *  Inspired by express-jwt at:
 *  https://github.com/auth0/express-jwt/blob/master/lib/index.js
 */
const authCheck = (req, res, next) => {

  if (req.method === 'OPTIONS' && req.headers.hasOwnProperty('access-control-request-headers')) {
    const authorizationIndex = req.headers['access-control-request-headers']
                                  .split(',')
                                  .map(header => (header.trim().toLowerCase()))
                                  .indexOf('authorization')

    if (authorizationIndex >= 0) {
      return next()
    }
  }

  if (req.headers && req.headers.authorization) {
    const parts = req.headers.authorization.split(' ')
    if (parts.length === 2) {
      const scheme = parts[0]
      const credentials = parts[1]

      if (scheme.toLowerCase() === 'bearer') {
        jwt.verify(credentials, config.jwtSecret, (err, decoded) => {
          if (err) {
            return res.status(401).end()
          } else {
            set(req, 'user', decoded)
            return next()
          }
        })
      }
    }
  }

  // don't enforce credentials, since we allow anonymous access
  return next()
}

module.exports = authCheck
