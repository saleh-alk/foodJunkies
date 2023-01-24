import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Message.css'
import io from 'socket.io-client'
import { fetchPosts } from '../../store/post'
import { useLocation } from 'react-router-dom';

const socket = io.connect("http://localhost:5000")



function Message() {

    const dispatch = useDispatch()
    const [message, setMessage] = useState("")
    const [messageRecieved, setMessageReceived] = useState("")
    const post = useSelector(state => state.post)
    const location = useLocation();
    const query = location.search;
    console.log(post && post)
    
    const sendMessage = () => {

        socket.emit("send_message", {message: post})
    }


    useEffect(() => {
      dispatch(fetchPosts({query}))
    }, [])

    useEffect(()=> {
        socket.on("receive_message", (data) => {
                setMessageReceived(data.message)
        })
    }, [socket])
  return (
    <div className='message-box'>
        <input
        placeholder='Message'
        value = {message}
        onChange={e => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send Message</button>
        <div>{console.log(messageRecieved)}</div>
    </div>
  )
}

export default Message