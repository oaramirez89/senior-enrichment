import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { postCampus, putCampus } from '../reducers/campuses'

/*
  Use constants to make use of magic
  numbers clearer in your code.
*/
const NEW_CAMPUS = 0
const BACK_PAGE = -1

/*
  Error messages
*/
const POST_DUPE_ERROR = 'Trying to add a campus with a name that already exists in the DB'
const PUT_DUPE_ERROR = 'Trying to edit a campus with a name that already exists in the DB'

/*
  Forms keep local state while user is
  working on its edits, and sends data to
  the store once they submit.
*/
class NewCampus extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: NEW_CAMPUS,
      name: '',
      img: '',
      error: ''
    }

    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleImgChange = this.handleImgChange.bind(this)
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

  handleImgChange(event) {
    this.setState({
      img: event.target.value,
      error: ''
    })
  }

  /*
    If form is used to Add the campus id
    will be 0. Using this field to determine
    if we send a post or a put to the server.

    Added logic to show errors to user for better
    user feedback.
  */
  handleSubmit(event) {
    event.preventDefault()

    if (this.state.id === NEW_CAMPUS) {
      this.props.postCampus({
        id: this.state.id,
        name: this.state.name,
        img: this.state.img
      })
        .then(error => {
          if (error) {
            this.setState({
              error: POST_DUPE_ERROR
            })
          } else {
            this.props.history.go(BACK_PAGE)
          }
        })
    } else {
      this.props.putCampus({
        id: this.state.id,
        name: this.state.name,
        img: this.state.img
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
       the form to edit campus details. To add students
       to a campus we use the SingleCampus view.
    */
    if (this.props.match.params.campusId) {
      let campusId = Number(this.props.match.params.campusId)
      let campusToEdit = this.props.campuses.find(campus => campus.id === campusId)

      this.setState({
        id: campusToEdit.id,
        name: campusToEdit.name,
        img: campusToEdit.img
      })
    }
  }

  render() {
    return (
      <form className="form-horizontal" onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>Add/Edit Campus</legend>
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
            <label htmlFor="inputImage" className="col-lg-1 control-label">Logo</label>
            <div className="col-lg-11">
              <input
                type="text"
                className="form-control"
                id="inputImage"
                value={this.state.img}
                onChange={this.handleImgChange}
                placeholder="Paste an image link here" />
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
  }
}

const mapDispatchToProps = { postCampus, putCampus }

const NewCampusContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(NewCampus))

export default NewCampusContainer
