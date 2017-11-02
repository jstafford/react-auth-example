const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const config = require('./config')
const connect = require('./models/connect')

// connect to the database and load models
connect(config.dbUri)

const app = express()
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  next()
})

// tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }))
// pass the passport middleware
app.use(passport.initialize())

// load passport strategies
const localSignupStrategy = require('./passport/local-signup')
const localLoginStrategy = require('./passport/local-login')
passport.use('local-signup', localSignupStrategy)
passport.use('local-login', localLoginStrategy)

// pass the authorization checker middleware
const authCheckMiddleware = require('./middleware/auth-check')
app.use('/api', authCheckMiddleware)

// routes
const authRoutes = require('./routes/auth')
const apiRoutes = require('./routes/api')
app.use('/auth', authRoutes)
app.use('/api', apiRoutes)


// start the server
app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000 or http://127.0.0.1:4000')
})
