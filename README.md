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

![YoMo](https://github.com/yomorun/yomo-sink-socketio/blob/main/yomo-sink.png)

## More about YoMo

[yomorun/yomo](https://github.com/yomorun/yomo)

More [examples](https://github.com/yomorun?q=examples&type=&language=)
