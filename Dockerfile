# https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
FROM node:17-alpine

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "run", "dev" ]
