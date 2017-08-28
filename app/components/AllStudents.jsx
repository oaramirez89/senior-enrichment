import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

const AllStudents = (props) => {

  const students = props.students || [{id: 1, name: 'Oscar', email: 'oscar@gmail.com', campusId: 2}, {id: 2, name: 'Isabel', email: 'isabel@gmail.com', campusId: 1}]

  return (
    <table className='table table-striped table-hover'>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>E-Mail</th>
          <th>Campus</th>
        </tr>
      </thead>
      <tbody>
        {
          students && students.map(student => (
            <tr key={student.id}>
              <td>{ student.id }</td>
              <td>{ student.name }</td>
              <td>{ student.email }</td>
              <td>{ student.campusId }</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

const mapStateToProps =  (state) => {
  return {
    students: state.students
  }
}

const AllStudentsContainer = withRouter(connect(mapStateToProps)(AllStudents))

export default AllStudentsContainer
