const express = require('express');
const app = express();
const http = require('http');
const socketIO = require('socket.io');

app.use((req, res, next) => {
    // log useful info about the request
    console.log(`${req.method} request for '${req.url}'`);
    next();
})

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

const server = http.Server(app);
server.listen(3000);

const io = socketIO(server);

io.on('connection', function (socket) {
  socket.emit('greeting', {
      greeting: 'Hello World'
  });
  socket.on('greeting-from-client', function (message) {
    console.log(message);
  });
});
