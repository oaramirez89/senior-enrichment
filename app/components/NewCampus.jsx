import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { postCampus, putCampus } from '../reducers/campuses'

/*
  Forms keep local state while user is
  working on its edits, and sends data to
  the store once they submit.
*/
class NewCampus extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: 0,
      name: '',
      img: ''
    }

    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleImgChange = this.handleImgChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  handleCancel(event) {
    this.props.history.go(-1)
  }

  handleNameChange(event) {
    this.setState({
      name: event.target.value
    })
  }

  handleImgChange(event) {
    this.setState({
      img: event.target.value
    })
  }

  /*
    If form is used to Add the campus id
    will be 0. Using this field to determine
    if we send a post or a put to the server.
  */
  handleSubmit(event) {
    event.preventDefault()

    if (this.state.id === 0) {
      this.props.postCampus(this.state)
    } else {
      this.props.putCampus(this.state)
    }
    // go back to where you were prompted.
    this.props.history.go(-1)
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
