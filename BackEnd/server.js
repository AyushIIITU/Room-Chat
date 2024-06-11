const express=require('express');
const {Server}=require('socket.io');
const {createServer}=require('http');
const app=express();
const port=process.env.PORT || 3000;
const server =createServer(app);
const io=new Server(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"],
        credentials:true,
    }
});

app.get('/',(req,res)=>{
    res.send("Hele");
});
io.on("connection",(socket)=>{
    console.log("userid",socket.id);
    // socket.on("message",(data)=>{
    //     console.log('data', data); 
    //     io.to(data.room).emit("recieve-message",data.message);
    //     // io.emit("recieve-message",data); 
    // })
    socket.on("disconnect",()=>{
        console.log("User is dissconnnected",socket.id);
    })
})
server.listen(port,()=>{
    console.log(`Server is running on port http://localhost:${port}`);
})