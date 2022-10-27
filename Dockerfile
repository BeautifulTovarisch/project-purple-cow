# Build Stage

FROM node:8.11.3 as build
WORKDIR /app

COPY package.json .
COPY package.lock .

RUN npm install
RUN npm test

COPY src /app

CMD [ "npm", "start" ]

# Production Image

FROM node:8.11.3-alpine

RUN groupadd -r nodejs \
   && useradd -m -r -g nodejs nodejs

# Run application as non-root user
USER nodejs

WORKDIR /app

COPY --from=build /app /app

RUN npm install --production

CMD [ "npm", "start" ]
