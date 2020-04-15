var express = require('express');
var path = require('path');


var app =express();

var port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'webPages')));

app.use('/api/members', require('./routes/api/members'))

app.listen(port, function (){
    console.log("Server running on port : ", port);
})