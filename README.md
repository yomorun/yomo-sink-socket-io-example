# yomo-sink-web

The example of [socket.io](https://socket.io/) for yomo-sink which can be used to show the realtime data on the react app.

## How to run the example

``` shell
cd yomo-sink-web
yarn 
yarn start
```

## How to receive and display data on the react app

- Code snippet

```js
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
      This is the message value: {msg}
    </div>
  );
}
```

## How `yomo-sink-socketio` works

![YoMo](https://github.com/yomorun/yomo-sink-socketio/blob/main/yomo-sink.png)
