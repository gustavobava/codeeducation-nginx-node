FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./
COPY wait-for-it.sh ./

RUN chmod +x wait-for-it.sh

RUN npm install
RUN npm install mysql
RUN npm install http
RUN apt-get update && apt-get install -y netcat

COPY . .

EXPOSE 3000

#CMD ["./wait-for-it.sh", "mysql:3306", "--", "node", "app.js"]
CMD ["node", "app.js"]