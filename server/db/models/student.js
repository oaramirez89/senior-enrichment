'use strict'
const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('student', {
  name: Sequelize.STRING,
  email: Sequelize.STRING
})
