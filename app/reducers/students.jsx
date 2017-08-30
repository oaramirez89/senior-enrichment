import axios from 'axios';

// ACTION TYPES
const GET_STUDENTS = 'GET_STUDENTS';
const GET_STUDENT = 'GET_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT'

// ACTION CREATORS
export function getStudents(students) {
  const action = { type: GET_STUDENTS, students };
  return action;
}

export function getStudent(student) {
  const action = { type: GET_STUDENT, student };
  return action;
}

export function updateStudent(student) {
  const action = { type: UPDATE_STUDENT, student };
  return action;
}

// THUNK CREATORS
export function fetchStudents() {
  return function thunk(dispatch) {
    return axios.get('/api/students')
      .then(res => res.data)
      .then(students => dispatch(getStudents(students)))
  }
}

export function postStudent(student) {
  return function thunk(dispatch) {
    return axios.post('/api/students', student)
      .then(res => res.data)
      .then(newStudent => dispatch(getStudent(newStudent)))
      .catch(error => {
        console.log(error)
      })
  }
}

export function putStudent(student) {
  return function thunk(dispatch) {
    return axios.put(`/api/students/${student.id}`, student)
      .then(() => dispatch(updateStudent(student)))
      .catch(error => {
        console.log(error);
      })
  }
}

export default (state = [], action) => {
  switch (action.type) {

    case GET_STUDENTS:
      return action.students

    case GET_STUDENT:
      return [...state, action.student]

    case UPDATE_STUDENT:
      // removed old version of updated student, then
      // added most recent version.
      let newState = state.filter(student => student.id != action.student.id)
      return [...newState, action.student]

    default:
      return state;
  }
}
