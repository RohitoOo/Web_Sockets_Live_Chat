var express = require("express")
var socket = require("socket.io")
const path = require("path")
const cors = require("cors")

var app = express()

// Init Server

const port = process.env.PORT || 5000

// Heroku Setup (  process.env.PORT  )
var server = app.listen(port, (req, res) => {
  console.log("Express Server Is Live On Port 5000")
})

app.use(cors())

// Render Html Page From Public Folder
app.use(express.static(__dirname + "/public"))
// Socket Setup
// var io = socket(server)

// Event Handler - Connection to each clinet socket
// io.on("connection", socket => {
//   console.log("::: User Connected :::", socket)
//   // User Signed In
//   socket.on("join", data => {
//     io.sockets.emit("join", data)
//   })

//   // 'chat' is the name of the object being received and sent

//   // (data) is the content of the object being received and sent back

//   socket.on("chat", data => {
//     // Recieving individual socket's data as an object from front end and
//     // emitting / sending to all sockets connected to the server
//     io.sockets.emit("chat", data)
//   })

//   socket.on("typing", data => {
//     socket.broadcast.emit("typing", data)
//   })
// })
