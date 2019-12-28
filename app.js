const express = require('express');
const app= express();
const http=require('http').createServer(app);
//var socket = require('socket.io-client')('http://localhost');
const io=require('socket.io')(http); //socket io çağır invokta http al

//var socket = require('socket.io-client')('http://localhost');

app.get('/', function( {res}){
    res.sendFile(__dirname + '/index.html');
 
});
io.on("connection",(socket)=>{
    console.log(`${socket.id} bağlantı oluştu`);
    socket.on("disconnect",()=>console.log(`${socket.id}  çıkış yaptı`));
    socket.on("message", (msg) => {
        socket.emit("post-msg",msg);

     });
    
     socket.broadcast.emit('broadcast', 'hello friends!');

})



http.listen(3000, function(){
  console.log('listening on *:3000');
});

