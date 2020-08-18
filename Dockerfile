FROM node:12.18.3-alpine3.12

RUN apk update --no-cache && \
    apk add --no-cache yarn git

USER node

WORKDIR /home/node/app

EXPOSE 3333