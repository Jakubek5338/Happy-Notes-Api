FROM node:16

WORKDIR /src

COPY 'package.json' ./

RUN npm install

RUN npm install -g nodemon

RUN pkill -f node

COPY . .

ENV DB_CONNECT=$DB_CONNECT
ENV TOKEN_SECRET=$TOKEN_SECRET
ENV PORT=$PORT


CMD ["nodemon", "index.js"]
