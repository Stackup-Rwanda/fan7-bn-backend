/* eslint-disable import/no-cycle */
// import http from 'http';
// import socketIo from 'socket.io';
// import eventInit from './utils/event.util';
import app from './app';
import createAdministator from './controllers/createAdministrator';

const PORT = process.env.PORT || 5000;

createAdministator();

// const server = http.createServer(app);
// const io = socketIo(httpServer);
// io.on('connection', socket => socket.emit('welcome', 'Welcome to barefoot nomad'));
export default app.listen(PORT, () => {
  // eventInit();
  console.log(`Server is running on port ${PORT}`);
});


// export { io };
// export default server;
