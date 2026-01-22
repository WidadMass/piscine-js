FROM node:18-alpine

WORKDIR /app

# Installation explicite de OpenSSL pour Prisma
RUN apk add --no-cache openssl

COPY package*.json ./

RUN npm install

COPY . .


RUN npx prisma generate --schema=backend/prisma/schema.prisma

RUN npm run build

EXPOSE 3000


CMD ["npm", "start"]
