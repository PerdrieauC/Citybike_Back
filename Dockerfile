FROM node:18.13.0-alpine
WORKDIR /app
COPY package.json .
COPY tsconfig.json .
COPY tsconfig.build.json .
RUN mkdir -p /app/src
COPY /src /app/src
RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
