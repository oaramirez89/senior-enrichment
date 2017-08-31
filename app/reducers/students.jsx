import axios from 'axios';
import socket from '../socket'

// ACTION TYPES
const GET_STUDENTS = 'GET_STUDENTS';
const GET_STUDENT = 'GET_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT'
const DELETE_STUDENT = 'DELETE_STUDENT'

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

export function deleteStudent(studentId) {
  const action = { type: DELETE_STUDENT, studentId };
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
      .then(newStudent => {
        dispatch(getStudent(newStudent))
        socket.emit('new-student', newStudent);
      })
      .catch(error => error) // returns the error to the form
  }
}

export function putStudent(student) {
  return function thunk(dispatch) {
    return axios.put(`/api/students/${student.id}`, student)
      .then(() => {
        dispatch(updateStudent(student))
        socket.emit('update-student', student);
      })
      .catch(error => error) // returns the error to the form
  }
}

export function removeStudent(studentId) {
  return function thunk(dispatch) {
    return axios.delete(`/api/students/${studentId}`)
      .then(() => {
        dispatch(deleteStudent(studentId))
        socket.emit('delete-student', studentId);
      })
      .catch(error => error) // returns the error to the form
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

      case DELETE_STUDENT:
      // removed deleted student from state
      return state.filter(student => student.id != action.studentId)

    default:
      return state;
  }
}
