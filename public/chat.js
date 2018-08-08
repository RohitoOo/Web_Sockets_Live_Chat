// Connect to Server
var socket = io.connect('https://pacific-springs-28604.herokuapp.com')

// Query DOM

var message = document.getElementById('message')
var handle = document.getElementById('handle')
var btn = document.getElementById('send')
var output = document.getElementById('output')
var feedback = document.getElementById('feedback')



// Emit Events

$(document).ready(function(){
    $("#form").submit(function(e){
        e.preventDefault()
        console.log('Jquery Works')

        socket.emit('chat' , {
          handle : handle.value,
          message : message.value
          })
    });
});

// Event Listener For typing...

message.addEventListener('keypress' , () => {
  socket.emit('typing' , handle.value )
})

// Listen for Output Events ( from Server )

socket.on('chat' , (data) => {
  feedback.innerHTML = ""
  message.value = ""
  output.innerHTML += `<p> <strong> ${data.handle} </strong> : ${data.message} </p>`

//Scroll

$(document).ready(function(){

$('#chat-window').stop().animate ({
  scrollTop: $('#chat-window')[0].scrollHeight
});

});

})


socket.on('typing' , (data) => {
  feedback.innerHTML = data + " is typing..."
})
