'use strict'

const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('campus', {
  name: Sequelize.STRING,
  img: Sequelize.STRING
})

