import React, { useEffect, useMemo, useState } from 'react'
import {io }from "socket.io-client";

const App = () => {
  const [meassage,setmessage]=useState("");
  const socket = io("http://localhost:3000");

  
  useEffect(()=>{

    socket.on("connect",()=>{

      console.log("connected",socket.id);
    })

    socket.on("welcome",(s)=>{
    console.log(s);
    })

   
  }) 
   
      
       


  return (
    <div>
       <h1>saoxoli</h1>
    </div>
  )
}

export default App
