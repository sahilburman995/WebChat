import React, { useEffect, useMemo, useState } from 'react'
import {io }from "socket.io-client";

const App = () => {
 
  const socket =useMemo(()=>io("http://localhost:3000"),[]);

  
  
  

  
    const [message, setMessage] = useState('');
  
  
  
    const handleSubmit = (e) => {
      e.preventDefault();
    
      socket.emit("message",message)
      setMessage("")
    };
  
    useEffect(()=>{

      socket.on("connect",()=>{
  
        console.log("connected",socket.id);
      })
  
      socket.on("welcome",(s)=>{
      console.log(s);
      })
      socket.on("recive",(a)=>{
        console.log(a);
      })
  
     
        return ()=>{
  
          socket.disconnect();
        }
    },[]) 
       


  return (
    <>
    <form onSubmit={handleSubmit} className="send-message-form">
    <input
      type="text"
      placeholder="Type your message..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
    />
    <button type="submit">Send</button>
  </form>
  </>
  )
}

export default App;
