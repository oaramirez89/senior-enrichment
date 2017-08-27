'use strict'
const api = require('express').Router()
const { Campus, Student } = require('../db/models')

/*
  /api/campuses - Get all campuses
*/
api.get('/', (req, res, next) => {
  Campus.findAll()
    .then(campuses => res.json(campuses))
    .catch(next)
})

/*
  /api/campuses/:campusId - Get a campus
  by ID.
*/
api.get('/:campusId', (req, res, next) => {
  const campusId = req.params.campusId

  Campus.findById(campusId, {include: [{model: Student, as: 'StudentBody'}]})
    .then(campus => res.json(campus))
    .catch(next)
})

/*
  /api/campuses - Add a new campus
*/
api.post('/', (req, res, next) => {
  Campus.create(req.body)
  .then(campus => res.json(campus))
  .catch(next)
})

/*
  /api/campuses/:campusId - Edit a campus with
  ID = campusId
*/
api.put('/:campusId', (req, res, next) => {
  const campusId = req.params.campusId

  Campus.findById(campusId)
  .then(campus => campus.update(req.body))
  .then(() => res.status(204).end())
  .catch(next)
})

/*
  /api/campuses - Delete a campus with ID = campusID
*/
api.delete('/:campusId', (req, res, next) => {
  const campusId = req.params.campusId

  Campus.destroy({ where: { id: campusId } })
    .then(() => res.status(204).end())
    .catch(next)
})

module.exports = api
