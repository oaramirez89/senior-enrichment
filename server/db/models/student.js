'use strict'
const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('student', {
  name: Sequelize.STRING,
  email: Sequelize.STRING
}, {
    indexes: [
      // Create a unique index on email to
      // prevent duplicate entries.
      {
        unique: true,
        fields: ['email']
      }
    ]
  })
