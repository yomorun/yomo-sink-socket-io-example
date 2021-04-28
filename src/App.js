import React, { useState, useEffect } from 'react';
import RealTimeQuery, { createWebSocketTransport, rxjsOperators } from 'real-time-query';
import cx from 'classnames';
import { Main, Logo, Num } from './ui';

const OPYTIONS = process.env.NODE_ENV === 'production' 
  ? { apiUrl: 'https://yomo.cel-la.store', path: '/v2/socket.io' }
  : { apiUrl: 'http://localhost:8000', path: '/socket.io' };

export default function App() {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const realTimeQuery = new RealTimeQuery({
      transport: createWebSocketTransport(OPYTIONS)
    });

    const { pairwise, timestamp } = rxjsOperators;

    realTimeQuery.subscribe(
      {
        eventName: 'receive_sink',
        rxjsOperators: [
          pairwise(),
          timestamp(),
        ]
      },
      result => {
        setResult(result);
      }
    );

    return () => {
      realTimeQuery.close();
    }
  }, []);

  if (!result) {
    return null;
  }

  return (
    <Main>
      <Logo className='logo' src='logo.png' alt='YoMo' />
      <p>
        Real-time noise level: 
        <Num className={cx({ glow: result.value[0].noise !== result.value[1].noise })}>
          {result.value[1].noise}
        </Num>
      </p>
      <span>Delay: <Num>{result.timestamp - result.value[1].time}ms</Num></span>
    </Main>
  )
};