FROM node:17-alpine

RUN mkdir -p /usr/app
WORKDIR /usr/app
RUN mkdir -p postgresdata
COPY package.json server.js knexfile.js jest.config.js index.js wait.sh ./
COPY .env.template ./.env
COPY src ./src
COPY tests ./tests
COPY data ./data
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait
RUN npm install

EXPOSE 3000
CMD /wait && npm start
