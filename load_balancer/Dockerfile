FROM node:alpine

RUN apk update && apk add --no-cache docker-cli
ENV HOST_IP=http://host.docker.internal

COPY package.json package.json
RUN npm install --production 

COPY src src
COPY proxy-servers.sh proxy-servers.sh
COPY .env.example .env


CMD ["node", "src/index.js"]