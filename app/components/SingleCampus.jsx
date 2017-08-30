import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Students from './Students'

const SingleCampus = (props) => {
  /* Force param to be a numeric value. */
  const campusId = Number(props.match.params.campusId)

  /*
    Filter out state data to render single campus and list of
    students belonging to that campus.
  */
  const currentCampus = props.campuses.find(campus => campus.id === campusId)
  const studentBody = props.students.filter(student => student.campusId === campusId)

  return (
    <div className="campus">
      <div>
        <div>
          <h3>{currentCampus.name}</h3>
          <Link to={`/edit-campus/${currentCampus.id}`} className="btn btn-link bold">Edit Campus Details</Link>
        </div>
        <img src={currentCampus.img} />
      </div>
      <Link to={`/add-student-to-campus/${currentCampus.id}`} className="btn btn-link bold">Add Student To {currentCampus.name} </Link>
      <Students students={studentBody} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    campuses: state.campuses,
    students: state.students
  }
}

const SingleCampusContainer = withRouter(connect(mapStateToProps)(SingleCampus))

export default SingleCampusContainer
