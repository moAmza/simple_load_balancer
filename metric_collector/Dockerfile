FROM node:alpine

RUN apk update && apk add --no-cache docker-cli
ENV HOST_IP=http://host.docker.internal

COPY package.json package.json
RUN npm install --production 

COPY src src
COPY containers.sh containers.sh
COPY .env.example .env


CMD ["node", "--no-warnings","src/index.js"]