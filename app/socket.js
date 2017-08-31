import io from 'socket.io-client'
import { getCampus, updateCampus, deleteCampus } from './reducers/campuses'
import { getStudent, updateStudent, deleteStudent } from './reducers/students'
import store from './store'

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('Connected to socket server...');

  socket.on('new-campus', campus => {
    store.dispatch(getCampus(campus));
  });

  socket.on('update-campus', campus => {
    store.dispatch(updateCampus(campus));
  });

  socket.on('delete-campus', campusId => {
    store.dispatch(deleteCampus(campusId));
  });

  socket.on('new-student', student => {
    store.dispatch(getStudent(student));
  });

  socket.on('update-student', student => {
    store.dispatch(updateStudent(student));
  });

  socket.on('delete-student', studentId => {
    store.dispatch(deleteStudent(studentId));
  });

});

export default socket;
