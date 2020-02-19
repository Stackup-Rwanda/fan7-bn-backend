/* eslint-disable import/no-cycle */
import http from 'http';
import socketIo from 'socket.io';
import initEvent from './utils/event.util';
import app from './app';
import createAdministator from './controllers/createAdministrator';

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = socketIo(server);

createAdministator();

const connectedUsers = {};
/* istanbul ignore next */
io.on('connection', socket => {
  socket.emit('welcome', 'Welcome to Barefoot nomad');
  socket.on('join notification', user => {
    socket.join(user.id);
  });
  socket.on('new-user', client => {
    connectedUsers.name = client.user_name;
    connectedUsers.id = client.id;
  });
  socket.join(`user-${connectedUsers.id}`);
  io.sockets.to(`user-${connectedUsers.id}`).emit('private room', { id: `${connectedUsers.id}`, name: `${connectedUsers.name}` });

  socket.on('chat', data => {
    io.emit('chat', data);
  });
  socket.on('disconnect', () => {});
});

initEvent();

export { io };
export default server.listen(PORT, () => {});
