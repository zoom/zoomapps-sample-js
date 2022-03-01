# https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
FROM node:17-alpine AS base

WORKDIR /home/node/app

COPY package*.json ./

FROM base as deps
ARG NODE_ENV
ENV NODE_ENV="${NODE_ENV}"
RUN npm clean-install

FROM deps AS app
COPY . .
CMD [ "npm", "start" ]
