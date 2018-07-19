FROM node:7
workdir /app
COPY package.json /app

RUN npm install 
COPY . /app


EXPOSE 5000
CMD node src/index.js
 
# CMD ["npm", "start"]
# CMD ls node_modules

