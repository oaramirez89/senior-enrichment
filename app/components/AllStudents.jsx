import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Students from './Students'

/*
  This component obtains all students from
  the store and passes the data to the students
  viewer. This makes the students viewer reusable
  for this case and the single campus use case.
*/
const AllStudents = (props) => {

  return (
    <div>
      <h3>All Students</h3>
      <Students students={props.students} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    students: state.students
  }
}

const AllStudentsContainer = withRouter(connect(mapStateToProps)(AllStudents))

export default AllStudentsContainer
