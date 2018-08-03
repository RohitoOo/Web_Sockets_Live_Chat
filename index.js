var express = require('express')

var app = express();


var server = app.listen(3000, (req,res) => {
 console.log('We Are Live On Port 3000')
})

app.use(express.static('public'))
