# Original Docker file taken from
# https://mherman.org/blog/dockerizing-a-react-app/

#start with 
# docker run --name dnd-npc-builder -it -v ${PWD}:/usr/dnd-npc-builder/src/app -p 3000:3000 --rm dnd-npc-builder
# base image
FROM node:9.6.1

# set working directory
RUN mkdir -p /usr/dnd-npc-builder/src/app
WORKDIR /usr/dnd-npc-builder/src/app

# add `/usr/dnd-npc-builder/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/dnd-npc-builder/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/dnd-npc-builder/src/app/package.json
RUN npm install
RUN npm install react-scripts@1.1.1 -g

# start app
CMD ["npm", "start"]