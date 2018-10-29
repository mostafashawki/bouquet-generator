FROM node:8
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
# ENTRYPOINT [ "node",  "commands.js" ]
CMD [ "node",  "commands.js", "add", "update" ]