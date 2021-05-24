FROM node 
WORKDIR /usr/app
COPY package.json /usr/app 
RUN yarn && yarn cache clean
COPY . /usr/app 
RUN yarn typeorm migration:run
CMD ["yarn", "dev"]