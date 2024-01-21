import React, { useEffect, useMemo, useState } from 'react'
import {io }from "socket.io-client";
import './App.css';

const App = () => {
 
  const socket =useMemo(()=>io("http://localhost:3000"),[]);

  const[socketid,setsocketid]=useState('');
  
  const [receivedMessages, setReceivedMessages] = useState([]);
  
    const [message, setMessage] = useState('');
  
  
  
    const handleSubmit = (e) => {
      e.preventDefault();
    
      socket.emit("message",message)
      setMessage("")
    };
  
    useEffect(()=>{

      socket.on("connect",()=>{
   setsocketid(socket.id);
        console.log("connected",socket.id);
      })
  
      socket.on("welcome",(s)=>{
      console.log(s);
      })
      socket.on("recive",(a)=>{
        console.log(a);
        setReceivedMessages((prevMessages) => [...prevMessages, a]);
      })
  
     
        return ()=>{
  
          socket.disconnect();
        }
    },[]) 
       


  return (
    <>
    {/* Navigation Bar */}
    <div className="navbar">
      <span>WEBCHAT</span>
      
    </div>
    <div className='myid' style={{alignItems:'center'}}> <div className='myids'><h2>Room ID </h2>  {socketid}</div></div>
    
    {/* Chat Interface */}
    <div className="chat-interface">
      {/* Message Input Form */}
      <form onSubmit={handleSubmit} className="send-message-form">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>

      {/* Display the received messages in a div with message-bubble style */}
      <div className="received-messages">
        {receivedMessages.map((msg, index) => (
          <div key={index} className="message-bubble">{msg}</div>
        ))}
      </div>
    </div>
  </>
  )
}

export default App;
