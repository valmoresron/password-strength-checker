FROM node:16.14-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm install --loglevel verbose

RUN mkdir node_modules/.cache
RUN chmod -R 777 node_modules/.cache

COPY . ./

CMD ["npm", "start"]
