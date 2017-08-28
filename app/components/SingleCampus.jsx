import React from 'react';
import { withRouter } from 'react-router-dom'
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
        <h3>{currentCampus.name}</h3>
        <img src={currentCampus.img}/>
      </div>
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
