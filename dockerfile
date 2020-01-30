FROM node:slim
WORKDIR /usr/src/app
COPY ["package*.json", "*.js", "*.env", "./"]
RUN npm install
CMD ["npm", "start"]
