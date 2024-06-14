const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const db=require('./db');
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  }
});
const userRoute=require("./routes/userRoutes");
const PORT=process.env.PORT||3000;
// app.use(express());
app.use(cors());
app.use('/user',userRoute);
app.get('/',(req,res)=>{
    res.send("Welcome to chat app");
})
io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  socket.on('sendMessage', (message) => {
    io.emit('message', message);
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
