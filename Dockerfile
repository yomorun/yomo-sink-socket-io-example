FROM node:alpine

RUN apk add tzdata && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone \
    && apk del tzdata

WORKDIR /app
COPY . .
RUN chmod +x ./docker-entrypoint.sh
RUN yarn

EXPOSE 3000

ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["yarn", "start"]
