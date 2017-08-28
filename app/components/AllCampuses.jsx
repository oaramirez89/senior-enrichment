import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'


const AllCampuses = (props) => {

  const campuses = props.campuses

  return (
    <div>
      <h3>Campuses</h3>
      <div className="row">
        {
          campuses.map(campus => (
            <div className=" campus col-xs-4" key={campus.id}>
              <Link className="thumbnail" to={`/campuses/${campus.id}`}>
                <img src={campus.img} />
                <div className="caption">
                  <h5>
                    <span>{campus.name}</span>
                  </h5>
                  <small>{props.students && props.students.filter(student => student.campusId === campus.id).length} students</small>
                </div>
              </Link>
            </div>
          ))
        }
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

const AllCampusesContainer = withRouter(connect(mapStateToProps)(AllCampuses))

export default AllCampusesContainer
