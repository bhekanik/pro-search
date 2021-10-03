FROM node:15-alpine

WORKDIR /app

ENV PATH="./node_modules/.bin:$PATH"

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]