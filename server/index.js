const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const {Server} = require("socket.io"); //we are importing the server class inside the socket io library
app.use(cors());
const server = http.createServer(app);
 //this will create a server for us using express js
const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods: ["GET,POST"]
    },
});

io.on("connection" ,(socket)=>{
   console.log(`User connected: ${socket.id}`);//this will connect to the frontend server of the port 3000.

   socket.on("join_room",(data)=>{
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
   });

   socket.on("send_message", (data)=>{
    socket.to(data.room).emit("receive_message",data);
   });
//here join_room is the event when the button called Join room is hit this socket connection mus t be made

   socket.on("disconnect" , ()=>{
    console.log("User disconnected" , socket.id);
   });


});


server.listen(3001, ()=>{
    console.log("Server is running");
})
