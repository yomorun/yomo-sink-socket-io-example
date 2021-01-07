import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

// should only run once and not on every re-render.
function useSocketIO(url) {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const socketIo = io(url);
    setSocket(socketIo);
    return () => {
      socketIo.disconnect();
    }
  }, []);
  return socket;
}

function App() {
  const socket = useSocketIO('http://localhost:8000');
  const [msg, setMsg] = useState('no message value yet');

  useEffect(() => {
    if (socket) {
      // receive_sink is the event name of broadcast.
      socket.on('receive_sink', msg => {
        setMsg(msg);
      });
    }
  }, [socket]);

  return (
    <div className='App'>
      <p>This is the message value: {msg}</p>
    </div>
  );
}

export default App;
