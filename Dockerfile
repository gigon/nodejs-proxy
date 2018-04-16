FROM node:8.9-alpine

ENV NODE_PATH /install/node_modules/
ENV PATH /install/node_modules/.bin:$PATH

COPY ./package.json ./app.js /home/node/app/
WORKDIR /home/node/app/
RUN npm install --quiet
