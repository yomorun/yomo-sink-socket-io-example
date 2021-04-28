FROM node:alpine

RUN apk add tzdata && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone \
    && apk del tzdata

WORKDIR /app
COPY . .
RUN yarn

EXPOSE 3000

CMD ["sh", "-c", "yarn start"]
