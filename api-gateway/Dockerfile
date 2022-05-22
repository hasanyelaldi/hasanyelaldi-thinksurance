FROM node:16

# Create app directory
WORKDIR /usr/src/hasanyelaldi-thinksurance/api-gateway

COPY ./api-gateway/package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY ./api-gateway/ .

EXPOSE 3000
CMD [ "npm", "run", "start" ]