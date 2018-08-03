var express = require('express')
var socket = require('socket.io')


var app = express();


var server = app.listen(3000, (req,res) => {
 console.log('We Are Live On Port 3000')
})


app.get('/' , (req,res) {

  res.send()

})

app.use(express.static('public'))


// Socket Setup

var io = socket(server)

io.on('connection' , ( socket ) => {
  console.log("Socket Connection Estiablished Between Client Browser And Server")
  console.log("Data Can Now Be Transfered To And Fro")

  // Unique Id For Each Connection
  console.log (socket.id)

  socket.on('chat' , (data) => {
    io.sockets.emit('chat' , data)
  })

})
