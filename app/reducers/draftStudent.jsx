// Action Types
const SET_NAME = 'SET_NAME'
const SET_EMAIL = 'SET_EMAIL'
const SET_CAMPUS = 'SET_CAMPUS'

// Action creators
export function setName(name) {
  const action = { type: SET_NAME, name };
  return action;
}

export function setEmail(email) {
  const action = { type: SET_EMAIL, email };
  return action;
}

export function setCampus(campusId) {
  const action = { type: SET_CAMPUS, campusId };
  return action;
}

// Initial state is an empty student object.
const emptyStudent = {
  id: 0,
  name: '',
  email: '',
  campusId: -1
}

// Reducers
export default (state = emptyStudent, action) => {
  let newState = Object.assign({}, state)

  switch (action.type) {

    case SET_NAME:
      newState.name = action.name
      return newState

    case SET_EMAIL:
      newState.email = action.email
      return newState

    case SET_CAMPUS:
      newState.campusId = action.campusId
      return newState

    default:
      return state;
  }
}
