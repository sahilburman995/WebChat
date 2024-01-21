import express from "express";
import {Server } from "socket.io";
import {createServer} from "http";
import cors from 'cors';



const app =express();

const server = createServer(app);
const io= new Server(server,{
    cors: {
        origin: "http://127.0.0.1:5173",
        methods:["GET", "POST"],
        credentials:true,
    },
});


app.use(cors({


    origin: "http://127.0.0.1:5173",
    methods:["GET", "POST"],
    credentials:true,
}

));



app.get("/" ,(req,res)=>{

res.send("hello world");
})

io.on("connection", (socket) => {
    console.log("connected user");
    console.log("id", socket.id);
    socket.broadcast.emit("welcome",`welcome to the server${socket.id}`);

    
  socket.on("message",(data)=>{

    console.log(data);
   socket.broadcast.emit("recive",data);
  })
 
    socket.on("disconnect",()=>{
        console.log("user disconnected",socket.id);
         
    })


}); 
  
const port=3000;
server.listen(port,()=>{

    console.log(`server is runnuing ${port}`);
})