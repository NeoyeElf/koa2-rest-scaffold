#!/bin/bash
npm run build

echo "docker start build"
docker build -t koa2-rest-scaffold .
if [ $? -ne 0 ]; then
echo "docker build fail!"
exit 1
fi
echo "docker build done!"

# docker run --name koa2-rest-scaffold -d -p 8000:7100 koa2-rest-scaffold:latest