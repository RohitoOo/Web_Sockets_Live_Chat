// Connect to Server
var socket = io.connect('http://localhost:3000')

// Query DOM

var message = document.getElementById('message')
var handle = document.getElementById('handle')
var btn = document.getElementById('send')
var output = document.getElementById('output')
var feedback = document.getElementById('feedback')

// Emit Events

btn.addEventListener('click' , () => {

  socket.emit('chat' , {
    handle : handle.value,
    message : message.value
    })
})

// Event Listener For typing...

message.addEventListener('keypress' , () => {
  socket.emit('typing' , handle.value )
})

// Listen for Output Events ( from Server )

socket.on('chat' , (data) => {
  feedback.innerHTML = ""
  message.value = ""
  output.innerHTML += `<p> <strong> ${data.handle} </strong> : ${data.message} </p>`
})


socket.on('typing' , (data) => {
  feedback.innerHTML = data + " is typing..."
})
