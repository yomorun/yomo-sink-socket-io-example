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
  const socket = useSocketIO('https://yomo.cel-la.store');
  const [msg, setMsg] = useState('0');
  const [showGlow, setShowGlow] = useState(false);

  useEffect(() => {
    if (socket) {
      // receive_sink is the event name of broadcast.
      socket.on('receive_sink', msg => {
        setMsg(previousMsg => {
          setShowGlow(previousMsg === msg);
          return msg;
        });
      });
    }
  }, [socket]);

  return (
    <div className='App'>
      <img className='logo' src='logo.png' alt='YoMo' />
      <p>实时噪音分贝值: <span className={showGlow ? 'anim-glow' : ''}>{msg}</span></p>
    </div>
  );
}

export default App;
