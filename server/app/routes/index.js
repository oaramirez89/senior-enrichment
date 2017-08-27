'use strict'
const api = require('express').Router()

api.use('/students', require('./students'))
api.use('/campuses', require('./campuses'))

/*
  This error handling for any url which
  is invalid but does include the /api
  in front. E.g. /api/banana or /api/student
*/
api.use(function (req, res) {
  res.status(404).end()
});

module.exports = api
