# YoMo Example: yomo-sink-socket-io-example

An example of [socket.io](https://socket.io/) for [YoMo](https://github.com/yomorun/yomo), this example demonstrates how to build a `yomo-sink` to show real-time data in a react app.

## How to run this example

```shell
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
  // YoMo provides a simulated Socket.io server with data sent at a frequency of 100ms. 
  // Data comes from the real noise sensor of YoMo N'Office
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

## How `yomo-sink-socket-io-example` works

![YoMo](https://github.com/yomorun/yomo-sink-socketio/blob/main/yomo-sink.png)

## More about YoMo

[yomorun/yomo](https://github.com/yomorun/yomo)

More [examples](https://github.com/yomorun?q=examples&type=&language=)
