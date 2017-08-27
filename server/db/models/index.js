'use strict'

// Require all the models
	// Running each model (i.e. table) module (i.e. file) registers each model into our sequelize db so any other part of the application could call db.model('user') OR db.models.user to get access to the `user` model.
	// This works if we all use the same Sequelize instance (instantiated in and exported from `/db/index.js`)
	// This is an acceptable pattern but it does have limitations in that if you change the name of the model you will have to change every time it is requeired everywhere

const Student = require('./student')
const Campus = require('./campus')

/*
	Sequelize adds campusId to Student table. Options enforce a
	non-null foreign key. If a campus is deleted, all students
	in that campus will be deleted. Will have to warn through
	UI before such action is taken of its consequences.
*/
Student.belongsTo(Campus, { foreignKey: {allowNull: false}, onDelete: 'CASCADE'})

/*
	Relates Campus to students, provides accessors
	getStudentBody / setStudentBody.
*/
Campus.hasMany(Student, {as: 'StudentBody', foreignKey: {allowNull: false}, onDelete: 'CASCADE'})

module.exports = {Student, Campus}
