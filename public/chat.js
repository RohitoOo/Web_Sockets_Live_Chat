// Connect to Server
var socket = io.connect("https://whatsapp-socketio.herokuapp.com")

// Query DOM

var message = document.getElementById("message")
var handle = document.getElementById("handle")
var btn = document.getElementById("send")
var output = document.getElementById("output")
var feedback = document.getElementById("feedback")
var joined = document.getElementById("joined")

// Emit Events

$(document).ready(function() {
  $("#form").submit(function(e) {
    e.preventDefault()

    // Send Message From Client To Server
    socket.emit("chat", {
      handle: handle.value,
      message: message.value
    })

    e.target.message.value = ""
  })
})

$("#formJoined").submit(function(e) {
  e.preventDefault()
  console.log(
    ":::::USER JOINED!!! :::::",
    socket.io.opts.hostname,
    socket.io.opts.port
  )
  $("#form").css({ display: "" })
  $("#handle").val(e.target.handle.value)
  $("#formJoined").css("display", "none")
  $("#feedback").css("display", "")

  socket.emit("join", { UserName: handle.value })
})

// Event Listener For typing...

message.addEventListener("keypress", () => {
  socket.emit("typing", handle.value)
})

// Listen for Output Events ( from Server )

socket.on("chat", data => {
  feedback.innerHTML = ""

  output.innerHTML += `<p> <strong> ${data.handle} </strong> : ${
    data.message
  } </p>`

  //Scroll

  $(document).ready(function() {
    $("#chat-window")
      .stop()
      .animate({
        scrollTop: $("#chat-window")[0].scrollHeight
      })
  })
})

socket.on("typing", data => {
  feedback.innerHTML = data + " is typing..."
})

socket.on("join", data => {
  joined.innerHTML = data.UserName + " just joined the group chat..."
  setInterval(() => {
    joined.innerHTML = ""
  }, 2000)
})
