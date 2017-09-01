import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { putStudent, postStudent } from '../reducers/students'

/*
  Use constants to make use of magic
  numbers clearer in your code.
*/
const CAMPUS_NOT_ASSIGNED = -1
const NEW_STUDENT = 0
const BACK_PAGE = -1

/*
  Error messages
*/
const POST_DUPE_ERROR = 'Trying to add a student with an email that already exists in the DB'
const PUT_DUPE_ERROR = 'Trying to enter an email that already exists in the DB'
const NO_CAMPUS_ERROR = 'A student must be assigned to a campus. Please select a campus.'


/*
  Forms keep local state while user is
  working on its edits, and sends data to
  the store once they submit.
*/
class NewStudent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      id: NEW_STUDENT,
      name: '',
      email: '',
      campusId: CAMPUS_NOT_ASSIGNED,
      error: ''
    }

    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleCampusChange = this.handleCampusChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)

  }

  handleCancel(event) {
    this.props.history.go(BACK_PAGE)
  }

  handleNameChange(event) {
    this.setState({
      name: event.target.value,
      error: ''
    })
  }

  handleEmailChange(event) {
    this.setState({
      email: event.target.value,
      error: ''
    })
  }

  handleCampusChange(event) {
    this.setState({
      campusId: event.target.value,
      error: ''
    })
  }

  /*
    If form is used to Add the student id
    will be 0. Using this field to determine
    if we send a post or a put to the server.

    Added logic to show errors to user for better
    user feedback.
  */
  handleSubmit(event) {
    event.preventDefault()

    if (this.state.campusId === CAMPUS_NOT_ASSIGNED) {
      this.setState({
        error: NO_CAMPUS_ERROR
      })
      // no campus, no need to go further.
      return
    }

    if (this.state.id === NEW_STUDENT) {
      this.props.postStudent({
        id: this.state.id,
        name: this.state.name,
        email: this.state.email,
        campusId: this.state.campusId
      })
        .then((error) => {
          if (error) {
            this.setState({
              error: POST_DUPE_ERROR
            })
          } else {
            this.props.history.go(BACK_PAGE)
          }
        })
    } else {
      this.props.putStudent({
        id: this.state.id,
        name: this.state.name,
        email: this.state.email,
        campusId: this.state.campusId
      })
        .then(error => {
          if (error) {
            this.setState({
              error: PUT_DUPE_ERROR
            })
          } else {
            this.props.history.go(BACK_PAGE)
          }
        })
    }
  }

  componentWillMount() {
    /*
       If form receives a campus id we are using
       the form to add student to a specific campus.
    */
    if (this.props.match.params.campusId) {
      this.setState({
        campusId: this.props.match.params.campusId
      })
    }

    /*
       If form receives a student id we are using
       the form to edit an existing student.
    */
    if (this.props.match.params.studentId) {
      let studentId = Number(this.props.match.params.studentId)
      let studentToEdit = this.props.students.find(student => student.id === studentId)

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
              <button type="reset" className="btn btn-default" onClick={this.handleCancel}>Cancel</button>
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </div>
          {
            this.state.error.length > 0 &&
            <div className="alert alert-danger">
              <strong>Validation Error: </strong> {this.state.error}
            </div>
          }
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

const mapDispatchToProps = { postStudent, putStudent }

const NewStudentContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(NewStudent))

export default NewStudentContainer
