import React, { useEffect } from 'react';
import ScrollToBottom from "react-scroll-to-bottom";
import { useState } from 'react'
function Chat({socket,username,room}) { //This component has been given socket as props to pass
const [currentmsg, setcurrentmsg] = useState("");
const [messageList, setmessageList] = useState([]);
const sendMessage = async ()=>{
    if(currentmsg !== ""){
        const messagedata = {
            room: room,
            author: username,
            message: currentmsg,
            time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
        };
        await socket.emit("send_message", messagedata);
        setmessageList((list)=>[...list,messagedata]);
        setcurrentmsg("");
    }
};

useEffect(()=>{
  socket.on("receive_message",(data)=>{
    setmessageList((list) => [...list,data])
  });
},[socket]);

  return (
    <div className="chat-window">
    <div className="chat-header">
        <p>LIVE CHAT</p>
        </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
        {messageList.map((messageContent)=>{
        return(
            <div className="message"
            id={username === messageContent.author? "you" : "other"}>
                <div>
                      <div className="message-content">
                        <p>{messageContent.message}</p>
                     </div>
                     <div className="message-meta">
                        <p id="time">{messageContent.time}</p>

                        <p id="author">{messageContent.author}</p>
                    </div>

                </div>
             </div>
                    
             );

        })}
        </ScrollToBottom>
        </div>
        <div className="chat-footer">
            <input type="text" 
            value={currentmsg} placeholder="Hey.."
            onChange={(event)=>{setcurrentmsg(event.target.value);
            }}
            onKeyPress={(event)=>{
                event.key === "Enter" && sendMessage();
            }}/>
            <button onClick={sendMessage}>&#9658;</button>
        </div>
      </div>
     
  );
}

export default Chat;
