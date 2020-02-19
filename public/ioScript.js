/* eslint-disable no-undef */
const socket = io();
const formData = document.getElementById('myForm');
const msgArea = document.getElementById('messages');
const formMsg = document.getElementById('textMsg');

let senderName, senderId;
socket.on('private room', data => {
  senderName = data.name;
  senderId = data.id;
});
fetch(`${socket.io.uri}/api/chat/get`, { method: 'GET', })
  .then(res => res.json())
  .then(res => {
    const array = res.data;
    array.forEach(data => {
      const sender = (JSON.stringify(data.senderId) === senderId) ? 'You' : data.sender;
      msgArea.innerHTML += `<li><span> ${sender} </span><br/>${data.message}</li><br/>`;
    });
  })
  .catch(err => err);

const saveMessage = (data) => {
  fetch(`${socket.io.uri}/api/chat/post`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(res => res)
    .catch(err => err);
};

formData.addEventListener('submit', (evt) => {
  const msg = formMsg.value;
  evt.preventDefault();
  socket.emit('chat', {
    senderId,
    sender: senderName,
    message: msg,
  });
  formMsg.value = '';
  saveMessage({ id: senderId, sender: senderName, message: msg });
});

socket.on('chat', data => {
  const sender = (data.senderId === senderId) ? 'You' : data.sender;
  msgArea.innerHTML += `<li><span>${sender}</span><br/>${data.message}</li><br/>`;
});
