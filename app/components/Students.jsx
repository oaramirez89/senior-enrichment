import React from 'react'
import { Link } from 'react-router-dom';

export default (props) => {

  const students = props.students

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

              <tr key={student.id}>
                <Link to={`/students/${student.id}`} >{student.id}</Link>
                <td>{student.name}</td>
                <td>{student.email}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
