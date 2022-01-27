#A lightweight node image
FROM node:16-alpine

WORKDIR .

COPY package.json /app/package.json

WORKDIR /app

RUN npm i

COPY . .

CMD ["npm", "run", "dev"]