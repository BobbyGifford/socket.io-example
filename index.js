var express = require("express");
var socket = require("socket.io");

// App setup
const PORT = 8080;
var app = express();
var server = app.listen(8080, () => {
  console.log("Server on port", PORT);
});

// Static files
app.use(express.static("public"));

// Socket.io setup
var io = socket(server);

io.on("connection", socket => {
  console.log("made socket connection", socket.id);
  socket.on("chat", function(data) {
    // sockets emits to everyone
    io.sockets.emit("chat", data);
  });

  socket.on("typing", function(data) {
    // socket.broadcast emits to everyone except sender
    socket.broadcast.emit("typing", data);
  });
});
