var express = require("express")
var socket = require("socket.io")

var app = express()

// Init Server

// Heroku Setup (  process.env.PORT  )
var server = app.listen(process.env.PORT || 5000, (req, res) => {
  console.log("Express Server Is Live On Port 5000")
})

// Configuration

app.configure(function() {
  app.use(express.bodyParser())
  app.use(express.methodOverride())
  app.use(app.router)
  app.use(express.static("public"))
})

// Heroku won't actually allow us to use WebSockets
// so we have to setup polling instead.
// https://devcenter.heroku.com/articles/using-socket-io-with-node-js-on-heroku
io.configure(function() {
  io.set("transports", ["xhr-polling"])
  io.set("polling duration", 10)
})

// Socket Setup
var io = socket(server)

// Event Handler - Connection to each clinet socket
io.on("connection", socket => {
  // User Signed In
  socket.on("join", data => {
    io.sockets.emit("join", data)
  })

  // 'chat' is the name of the object being received and sent

  // (data) is the content of the object being received and sent back

  socket.on("chat", data => {
    // Recieving individual socket's data as an object from front end and
    // emitting / sending to all sockets connected to the server
    io.sockets.emit("chat", data)
  })

  socket.on("typing", data => {
    socket.broadcast.emit("typing", data)
  })
})
