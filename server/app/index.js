'use strict';
/*
  Modularizing application startup by separating
  the different application componets into their
  own initiation and configuration modules.
*/
const bodyParser = require('body-parser')
const {resolve} = require('path')
const express = require('express')
const app = express()

if (process.env.NODE_ENV !== 'production') {
  // Logging middleware (non-production only)
  app.use(require('volleyball'))
}

/*
  The code below works because `.use` returns `this` which is `app`. So what we want to return in the `module.exports` is `app`, and we can chain on that declaration because each method invokation returns `app` after mutating based on the middleware functions
*/
module.exports = app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(express.static(resolve(__dirname, '../..', 'public'))) // Serve static files from ../public
  .use('/api', require('./routes')) // Serve our api
  .get('/*', (_, res) => res.sendFile(resolve(__dirname, '../..', 'public', 'index.html'))) // Send index.html for any other requests.

/*
  Notice the use of `_` as the first parameter above. This is a pattern for parameters that must exist, but you don't use or reference (or need)in the function body that follows.
*/

// Error catching endware.
app.use(function (err, req, res, next) {
  console.error(err, typeof next)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})
