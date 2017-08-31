'use strict'

const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('campus', {
  name: Sequelize.STRING,
  img: Sequelize.TEXT
}, {
    indexes: [
      // Create a unique index on campus name
      // to prevent dupes.
      {
        unique: true,
        fields: ['name']
      }
    ]
  })

