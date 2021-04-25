import io from "socket.io-client";

import { createContext, useContext, useState, useEffect } from "react";

import { EMPTY, fromEvent } from "rxjs";
import { timestamp, pairwise, map } from "rxjs/operators";

const NoiseContext = createContext({});

export function NoiseProvider({ children }) {
  const [raw$, setRaw$] = useState(EMPTY);

  useEffect(() => {
    const socket = io("http://localhost:8000", {
      transports: ["websocket"],
      path: "/socket.io"
    });

    const raw$ = fromEvent(socket, "receive_sink").pipe(
      timestamp(),
      pairwise(),
    );
    setRaw$(raw$);

    return () => {
      setRaw$(null);
      return socket.disconnect();
    };
  }, []);

  return (
    <NoiseContext.Provider value={{ lastReading$: raw$ }}>
      {children}
    </NoiseContext.Provider>
  );
}

export function useLastReading() {
  const { lastReading$ } = useContext(NoiseContext);
  return lastReading$;
}
