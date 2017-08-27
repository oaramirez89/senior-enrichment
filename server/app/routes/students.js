'use strict'
const api = require('express').Router()
const { Student, Campus } = require('../../db/models')

/*
  /api/students - Get all students
*/
api.get('/', (req, res, next) => {
  Student.findAll()
    .then(students => res.json(students))
    .catch(next)
})

/*
  /api/students/:studentId - Get a student
  by ID.
*/
api.get('/:studentId', (req, res, next) => {
  const studentId = req.params.studentId

  Student.findById(studentId)
    .then(student => res.json(student))
    .catch(next)
})

/*
  /api/students - Add a new student and
  associate them to a campus. Student is
  required to belong to a campus per specs.
*/
api.post('/', (req, res, next) => {
  Campus.findById(req.body.campusId)
    .then(campus => {
      let newStudent = Student.build({
        name: req.body.name,
        email: req.body.email
      })
      newStudent.setCampus(campus, {save: false})
      newStudent.save()
      .then(student => res.json(student))
    })
    .catch(next)
})

/*
  /api/students/:studentId - Edit a student with
  ID = studentId
*/
api.put('/:studentId', (req, res, next) => {
  const studentId = req.params.studentId

  Student.findById(studentId)
    .then(student => student.update(req.body))
    .then(() => res.status(204).end())
    .catch(next)
})

/*
  /api/students - Delete a student with ID = studentID
*/
api.delete('/:studentId', (req, res, next) => {
  const studentId = +req.params.studentId

  Student.destroy({ where: { id: studentId } })
    .then(() => res.status(204).end())
    .catch(next)
})

module.exports = api
