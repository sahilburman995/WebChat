import React, { useEffect, useMemo, useState } from 'react'
import {io }from "socket.io-client";
import './App.css';

const App = () => {
 
  const socket =useMemo(()=>io("http://localhost:3000"),[]);

  const[socketid,setsocketid]=useState('');
  const [senderms,setsenderms]=useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [room,setroom]=useState('');
    const [message, setMessage] = useState('');
  
  
  
    const handleSubmit = (e) => {
      e.preventDefault();
    
      socket.emit("message",{message,room})
      socket.emit('send', message, room);

      // Update the senderms state with the new message
      setsenderms((prevMessages) => [...prevMessages, message]);
  
      // Clear the message and room input fields
      setMessage('');
     

    };
  
    useEffect(()=>{

      socket.on("connect",()=>{
   setsocketid(socket.id);
        console.log("connected",socket.id);
      })
  
      socket.on("welcome",(s)=>{
      console.log(s);
      })
      socket.on("send",(s)=>{
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
        <input
          type="text"
          placeholder="enter room id"
          value={room}
          onChange={(e) => setroom(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      
        
    

      {/* Display the received messages in a div with message-bubble style */}
      {/* <div className="received-messages">
  {[...receivedMessages, ...senderms]
    .sort((a, b) => a.timestamp - b.timestamp)
    .map((message, index) => (
      <div key={index} className={senderms.includes(message) ? "message-bubbles" : "message-bubble"}>
        {message}
      </div>

      
  ))}
</div> */}
<div className="received-messages">
        {receivedMessages.map((msg, index) => (
          <div key={index} className="message-bubble">{msg}</div>
        ))}
        {}
       
      </div> 
      <div>{senderms.map((jh,ind)=>{
        <div key={ind} className="message-bubble">{jh}</div>
      })}</div>
      
    </div>
  </>
  )
}

export default App;
