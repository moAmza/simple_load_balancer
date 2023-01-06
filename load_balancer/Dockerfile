FROM node:alpine

COPY package.json package.json
RUN npm install --production 

COPY src src
COPY .env.example .env


CMD ["node", "src/index.js"]