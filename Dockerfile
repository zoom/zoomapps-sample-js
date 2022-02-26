# https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
FROM node:17-alpine

WORKDIR /home/node/app

COPY package*.json .env ./

RUN npm install

COPY . .

CMD [ "npm", "run", "dev" ]
