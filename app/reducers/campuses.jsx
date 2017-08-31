import axios from 'axios'
import socket from '../socket'

// ACTION TYPES
const GET_CAMPUSES = 'GET_CAMPUSES'
const GET_CAMPUS = 'GET_CAMPUS'
const UPDATE_CAMPUS = 'UPDATE_CAMPUS'
const DELETE_CAMPUS = 'DELETE_CAMPUS'

// ACTION CREATORS
export function getCampuses(campuses) {
  const action = { type: GET_CAMPUSES, campuses }
  return action
}

export function getCampus(campus) {
  const action = { type: GET_CAMPUS, campus }
  return action
}

export function updateCampus(campus) {
  const action = { type: UPDATE_CAMPUS, campus }
  return action
}

export function deleteCampus(campusId) {
  const action = { type: DELETE_CAMPUS, campusId }
  return action
}

// THUNK CREATORS
export function fetchCampuses() {
  return function thunk(dispatch) {
    return axios.get('/api/campuses')
      .then(res => res.data)
      .then(campuses => dispatch(getCampuses(campuses)))
  }
}

export function postCampus(campus) {
  return function thunk(dispatch) {
    return axios.post('/api/campuses', campus)
      .then(res => res.data)
      .then(newCampus => {
        dispatch(getCampus(newCampus))
        socket.emit('new-campus', newCampus);
      })
      .catch(error => error) // returns the error to the form
  }
}

export function putCampus(campus) {
  return function thunk(dispatch) {
    return axios.put(`/api/campuses/${campus.id}`, campus)
      .then(() => {
        dispatch(updateCampus(campus))
        socket.emit('update-campus', campus);
      })
      .catch(error => error) //returns the error to the form
  }
}

export function removeCampus(campusId) {
  return function thunk(dispatch) {
    return axios.delete(`/api/campuses/${campusId}`)
      .then(() => {
        dispatch(deleteCampus(campusId))
        socket.emit('delete-campus', campusId);
      })
      .catch(error => error) //returns the error to the form
  }
}

// REDUCERS
export default (state = [], action) => {
  switch (action.type) {

    case GET_CAMPUSES:
      return action.campuses

    case GET_CAMPUS:
      return [...state, action.campus]

    case UPDATE_CAMPUS:
      // replace old version with most recent version.
      let newState = state.filter(campus => campus.id != action.campus.id)
      return [...newState, action.campus]

    case DELETE_CAMPUS:
      return state.filter(campus => campus.id != action.campusId)

    default:
      return state;
  }
}
