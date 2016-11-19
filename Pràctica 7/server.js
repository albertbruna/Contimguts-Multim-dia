var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var express = require('express');

var marcador = {
    local:0,
    visitor:0
};

app.use("/pub", express.static('public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
    io.emit('update-marcador', marcador);
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('visitor-goal', function(){
        marcador.visitor+=1;
        io.emit('update-marcador', marcador);
    });
    socket.on('local-goal', function(){
        marcador.local+=1;
        io.emit('update-marcador', marcador);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});