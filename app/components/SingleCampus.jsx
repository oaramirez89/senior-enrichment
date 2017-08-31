import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { removeCampus } from '../reducers/campuses'
import Students from './Students'

const BACK_PAGE = -1

const SingleCampus = (props) => {
  /* Force param to be a numeric value. */
  const campusId = Number(props.match.params.campusId)

  /*
    Filter out state data to render single campus and list of
    students belonging to that campus.
  */
  const currentCampus = props.campuses.find(campus => campus.id === campusId)
  const studentBody = props.students.filter(student => student.campusId === campusId)

  /*
    Only allow removal of campus if no
    students are enrolled.
  */
  const handleDeleteClick = (event) => {
    event.preventDefault();
    if (studentBody.length > 0) {
      alert("Cannot remove a campus if students are enrolled. Transfer students out of campus first.")
    } else {
      props.removeCampus(currentCampus.id)
      props.history.go(BACK_PAGE)
    }
  }

  return (
    <div className="campus">
      <div>
        <div>
          <h3>{currentCampus.name}</h3>
          <button
            onClick={handleDeleteClick}
            type="button"
            className="close rounded"
            aria-label="Close">
            <span aria-hidden="true">Remove Campus;</span>
          </button>
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

const mapDispatchToProps = { removeCampus }

const SingleCampusContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleCampus))

export default SingleCampusContainer
