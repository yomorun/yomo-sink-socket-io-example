#!/usr/bin/env /bin/sh

SUBCMD=$1

case ${SUBCMD} in
  "debug")
    /bin/sh
    ;;
  *)
    if [ "${SOCKET_SERVER_ADDR}" ]; then
      sed -i 's|https:\/\/yomo.cel-la.store|'"${SOCKET_SERVER_ADDR}"'|g' /app/src/NoiseProvider.js
      sed -i 's|\/v2\/socket.io|\/socket.io|g' /app/src/NoiseProvider.js
    fi

    exec /bin/sh -c "${*}"
    ;;
esac
