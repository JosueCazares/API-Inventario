FROM node:20-slim

RUN apt-get update -y

RUN apt-get install -y openssl

RUN npm install -g bun

WORKDIR /home/app

COPY . .

RUN bun install


EXPOSE  3000

CMD ["bun", "run", "src/index.ts"]


