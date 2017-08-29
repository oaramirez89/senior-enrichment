import { combineReducers } from 'redux'
import campuses from './campuses'
import students from './students'
import student from './draftStudent'

export default combineReducers({
  campuses,
  students,
  student
})
