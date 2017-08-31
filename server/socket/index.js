module.exports = io => {

  io.on('connection', socket => {

    console.log(socket.id, ' has made a persistent connection to the server!');

    socket.on('new-campus', campus => {
      socket.broadcast.emit('new-campus', campus);
    });

    socket.on('update-campus', campus => {
      socket.broadcast.emit('update-campus', campus);
    });

    socket.on('delete-campus', campusId => {
      socket.broadcast.emit('delete-campus', campusId);
    });

    socket.on('new-student', student => {
      socket.broadcast.emit('new-student', student);
    });

    socket.on('update-student', student => {
      socket.broadcast.emit('update-student', student);
    });

    socket.on('delete-student', studentId => {
      socket.broadcast.emit('delete-student', studentId);
    });

  });

};
