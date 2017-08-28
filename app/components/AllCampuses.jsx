import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'


const AllCampuses = (props) => {

  const campuses = props.campuses || [{id: 1, name: 'Fullstack NYC Campus', img: 'LincolnPark.png', StudentBody: []}, {id: 2, name: 'Fullstack Chicago Campus', img: 'LincolnPark.png', StudentBody: []}]

  return (
    <div>
      <h3>Campuses</h3>
      <div className="row">
        {
          campuses.map(campus => (
            <div className="col-xs-4" key={ campus.id }>
              <Link className="thumbnail" to={`/campuses/${campus.id}`}>
                <img src={ campus.img } />
                <div className="caption">
                  <h5>
                    <span>{ campus.name }</span>
                  </h5>
                  <small>{ props.students && props.students.filter(student => student.campusId === campus.id).length } students</small>
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
