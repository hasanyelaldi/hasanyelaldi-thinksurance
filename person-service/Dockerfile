FROM node:16

# Create app directory
WORKDIR /usr/src/hasanyelaldi-thinksurance/person-service

COPY ./person-service/package.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY ./person-service/ .

EXPOSE 4000
CMD [ "node", "server.js" ]