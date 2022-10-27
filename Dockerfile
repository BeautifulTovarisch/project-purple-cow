# Build Stage

FROM node:19.0.0 as build
WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY src .

RUN npm install
RUN npm test
RUN npm run build

CMD [ "npm", "start" ]

# Production Image

FROM node:19.0.0-alpine

RUN groupadd -r nodejs \
   && useradd -m -r -g nodejs nodejs

# Run application as non-root user
USER nodejs

WORKDIR /app

COPY --from=build /app /app

RUN npm install --production

CMD [ "npm", "start" ]
