		var app = require('express')();
		var express = require('express');
		var http = require('http').Server(app);
		var io = require('socket.io')(http);
		var THREE = require('three');
		//var js = require('js')(http);

		app.use(express.static(__dirname + '/images'));
		app.use(express.static(__dirname + '/js'));
		app.get('/', function(req, res){
			res.sendFile(__dirname + '/index.html');
		});
		app.get('/player', function(req, res){
			res.sendFile(__dirname + '/player.html');
		});
		app.get('/wall', function(req, res){
			res.sendFile(__dirname + '/wall.html');
		});

		io.on('connection', function(socket){

			console.log('a user connected');
			socket.on('disconnect', function(){
				console.log('user disconnected');
			});

			socket.on('chat message', function(msg){
				io.emit('chat message', msg);
			});
			socket.on('accelX', function(msg){
				io.emit('accelX', msg);
			});
			socket.on('accelY', function(msg){
				io.emit('accelY', msg);
			});
			socket.on('accelZ', function(msg){
				io.emit('accelZ', msg);
			});

			socket.on('height', function(msg){
				io.emit('height', msg);
			});
			socket.on('chat message', function(msg){
				console.log('message: ' + msg);
			});
		});

		http.listen(3000, function(){
			console.log('listening on *:3000');
		});
