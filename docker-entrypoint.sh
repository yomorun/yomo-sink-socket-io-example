#!/usr/bin/env /bin/sh

SUBCMD=$1

case ${SUBCMD} in
  "debug")
    /bin/sh
    ;;
  *)
    if [ "${SOCKET_SERVER_ADDR}" ]; then
      sed -i 's|http:\/\/localhost:8000|'"${SOCKET_SERVER_ADDR}"'|g' /app/src/App.js
    fi

    exec /bin/sh -c "${*}"
    ;;
esac
