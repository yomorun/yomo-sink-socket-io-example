# YoMo Example: yomo-sink-socket-io-example

An example of [socket.io](https://socket.io/) for [YoMo](https://github.com/yomorun/yomo), this example demonstrates how to build a `yomo-sink` to show real-time data in a react app. You can also get more detailed information from the [example-noise](https://github.com/yomorun/example-noise).

## How to run this example

```shell
cd yomo-sink-web
yarn 
yarn start
```

## How to receive and display data on the react app

- Code snippet

```js
import RealTimeQuery, { createWebSocketTransport, rxjsOperators } from 'real-time-query';

// Create an instance.
const realTimeQuery = new RealTimeQuery({
  transport: createWebSocketTransport({ apiUrl: 'http://localhost:8000', path: '/socket.io' })
});

// RxJS operators. https://www.learnrxjs.io/learn-rxjs/operators
// Optional parameter.
const { pairwise, timestamp } = rxjsOperators;

// Start getting data.
realTimeQuery.subscribe(
  {
    eventName: 'receive_sink',
    rxjsOperators: [
      pairwise(),
      timestamp(),
    ]
  },
  result => {
    // The data you need.
    console.log('result:', result)
  }
);

// Close connection when cleaning up
realTimeQuery.close();
```

## How `yomo-sink-socket-io-example` works

![YoMo](https://github.com/yomorun/yomo-sink-socketio/raw/main/yomo-sink.png?raw=true)

## More about YoMo

[yomorun/yomo](https://github.com/yomorun/yomo)

More [examples](https://github.com/yomorun?q=examples&type=&language=)

## Container

### Docker Image

The case provides [Dockefile](https://github.com/yomorun/yomo-sink-socket-io-example/blob/main/Dockerfile) files for packaging into images.

Also, you can get the official packaged image ([noise-web](https://github.com/yomorun/yomo-sink-socket-io-example)) from the mirror repository.

```
docker pull yomorun/noise-web:latest
```


### Docker run

You can run the service with the following command:

```
docker run --rm --name noise-web -p 3000:3000 \
  -e SOCKET_SERVER_ADDR=http://localhost:8000 \
  yomorun/noise-web:latest
```

- SOCKET_SERVER_ADDR: defines the service address of [noise-sink](https://github.com/yomorun/yomo-sink-socketio-server-example).

### View Results

Visit the website [http://localhost:3000/](http://localhost:3000/), to see the following page: 

![result.jpg](https://github.com/yomorun/yomo-sink-socket-io-example/blob/main/docs/result.jpg?raw=true) 

