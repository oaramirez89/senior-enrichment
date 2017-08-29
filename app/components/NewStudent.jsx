import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { postStudent } from '../reducers/students'

class NewStudent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: 0,
      name: '',
      email: '',
      campusId: -1
    }

    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleCampusChange = this.handleCampusChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleNameChange(event) {
    this.setState({
      name: event.target.value
    })
  }

  handleEmailChange(event) {
    this.setState({
      email: event.target.value
    })
  }

  handleCampusChange(event) {
    this.setState({
      campusId: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    this.props.postStudent(this.state)
  }

  componentWillMount() {
    /*
       If form receives a student id we are using
       the form to edit an existing student.
      */
      console.log('edit student', this.props.match.params.studentId)
    if (this.props.match.params.studentId) {
      let studentId = Number(this.props.match.params.studentId)
      let studentToEdit = this.props.students.find(student => student.id === studentId)
      console.log('student to edit', studentToEdit)
      this.setState({
        id: studentToEdit.id,
        name: studentToEdit.name,
        email: studentToEdit.email,
        campusId: studentToEdit.campusId
      })
    }
  }

  render() {

    const campuses = this.props.campuses

    return (
      <form className="form-horizontal" onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>Add/Edit Student Profile</legend>
          <div className="form-group">
            <label htmlFor="inputName" className="col-lg-1 control-label">Name</label>
            <div className="col-lg-11">
              <input
                type="text"
                className="form-control"
                id="inputName"
                value={this.state.name}
                onChange={this.handleNameChange}
                placeholder="Name" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputEmail" className="col-lg-1 control-label">Email</label>
            <div className="col-lg-11">
              <input
                type="text"
                className="form-control"
                id="inputEmail"
                value={this.state.email}
                onChange={this.handleEmailChange}
                placeholder="Email" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="select" className="col-lg-1 control-label">Campus</label>
            <div className="col-lg-11">
              <select
                className="form-control"
                id="select"
                defaultValue={this.state.campusId}
                onChange={this.handleCampusChange}>
                {
                  campuses.map(campus => (
                    <option
                      key={campus.id}
                      value={campus.id} >
                      {campus.name}
                    </option>
                  ))
                }
                <option key="-1" value="-1">** Select a campus **</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <div className="col-lg-10 col-lg-offset-1">
              <button type="reset" className="btn btn-default">Cancel</button>
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </div>
        </fieldset>
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    campuses: state.campuses,
    students: state.students
  }
}

const mapDispatchToProps = { postStudent }

const NewStudentContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(NewStudent))

export default NewStudentContainer
