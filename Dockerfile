FROM node:8.11.1

MAINTAINER liuwenzhe_neoye@163.com

COPY package.json /tmp/package.json
RUN cd /tmp && npm install --registry=https://registry.npm.taobao.org
RUN mkdir -p /app && cp -a /tmp/node_modules /app/

WORKDIR /app
COPY . .

EXPOSE 7100
EXPOSE 443

CMD [ "npm", "run", "pro" ]