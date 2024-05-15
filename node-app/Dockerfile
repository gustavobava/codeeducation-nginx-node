FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install mysql
RUN npm install http

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]