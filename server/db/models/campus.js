'use strict'
const Sequelize = require('sequelize')
const db = require('../index.js')

module.exports = db.define('campus', {
  name: Sequelize.STRING,
  img: Sequelize.STRING
})

