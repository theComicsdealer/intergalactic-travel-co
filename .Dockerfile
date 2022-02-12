FROM node:17-alpine

RUN mkdir -p /usr/app
WORKDIR /usr/app
RUN mkdir -p postgresdata
COPY package.json server.js knexfile.js jest.config.js index.js wait.sh ./
COPY src ./src
COPY tests ./tests
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait
RUN npm install
RUN npm install knex -g
RUN knex migrate:latest --env development
RUN knex seed:run

EXPOSE 3000
CMD /wait && npm start
