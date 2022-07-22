FROM node:lts-alpine
WORKDIR /app
COPY * /app/
RUN npm install
COPY . .
CMD node app.js
EXPOSE 80
