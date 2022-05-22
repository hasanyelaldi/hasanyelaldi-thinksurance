FROM node:16

# Create app directory
WORKDIR /usr/src/hasanyelaldi-thinksurance/array-service

COPY ./array-service/package.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY ./array-service/ .

EXPOSE 5000
CMD [ "node", "server.js" ]