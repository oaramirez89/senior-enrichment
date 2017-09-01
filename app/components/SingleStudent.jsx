import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

const SingleStudent = (props) => {
  /* Force param to be a numeric value. */
  const studentId = Number(props.match.params.studentId)
  const currentStudent = props.students.find(student => student.id === studentId)
  const studentCampus = props.campuses.find(campus => campus.id === currentStudent.campusId)

  return (
    <div className="panel panel-default">
      <div className="panel-heading"><h3>Student Profile</h3></div>
      <div className="panel-body">
        <span className="bold">Name:   </span>
        <span>{currentStudent.name}</span>
        <br />
        <span className="bold">E-Mail:   </span>
        <span>{currentStudent.email}</span>
        <br />
        <span className="bold">Campus:   </span>
        <Link to={`/campuses/${currentStudent.campusId}`}>
          <span>{studentCampus.name}</span>
        </Link>
        <br />
      </div>
      <div>
        <Link to={`/edit-student/${currentStudent.id}`} className="btn btn-link bold">Edit Student</Link>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    campuses: state.campuses,
    students: state.students
  }
}

const SingleStudentContainer = withRouter(connect(mapStateToProps)(SingleStudent))

export default SingleStudentContainer
