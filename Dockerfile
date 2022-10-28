# Build Stage

FROM node:19.0.0 as build
WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .

COPY src /app/src/

RUN npm install
# RUN npm test
RUN npm run build

CMD [ "npm", "start" ]
