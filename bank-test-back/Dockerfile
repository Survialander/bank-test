FROM node
WORKDIR /app
COPY package.json /app 
RUN yarn && yarn cache clean
COPY . /app 
CMD ["yarn", "dev"]