FROM node:14-alpine
WORKDIR /app
COPY . /app
RUN npm install -g create-react-app
RUN yarn install
CMD ["yarn", "start"]