import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { removeStudent } from '../reducers/students'

const Students = (props) => {

  const students = props.students

  const handleDeleteClick = (studentId, event) => {
    event.preventDefault();
    props.removeStudent(studentId)
  }

  return (
    <div>
      <table className='table table-striped table-hover'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>E-Mail</th>
          </tr>
        </thead>
        <tbody>
          {
            students && students.map(student => (
              <tr key={student.id} >
                <Link to={`/students/${student.id}`} >{student.id}</Link>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>
                  <button
                    onClick={handleDeleteClick.bind(event, student.id)}
                    type="button"
                    className="close rounded"
                    aria-label="Close" >
                    <span value={student.id} aria-hidden="true">&times;</span>
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = { removeStudent }

const StudentsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Students))

export default StudentsContainer
