var express = require('express')
var socket = require('socket.io')

var app = express();

// Init Server

// Heroku Setup (  process.env.PORT  )
var server = app.listen(process.env.PORT || 3000, (req,res) => {
 console.log('Express Server Is Live On Port 3000')
})

// Render Html Page From Public Folder
app.use(express.static('public'))

// Socket Setup
var io = socket(server)


// Event Handler - Connection to each clinet socket
io.on('connection' , ( socket ) => {

// User Signed In
socket.on('join' , (data) => {

  io.sockets.emit('join', data)
})

// 'chat' is the name of the object being received and sent

// (data) is the content of the object being received and sent back

  socket.on('chat' , (data) => {

    // Recieving individual socket's data as an object from front end and
    // emitting / sending to all sockets connected to the server
    io.sockets.emit('chat' , data)
  })

  socket.on('typing' , (data) => {
    socket.broadcast.emit('typing', data)
  })

})
