# Spies u25033931
FROM node:20-alpine
RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev git > /dev/null 2>&1
ENV NODE_ENV=production
WORKDIR /opt/app

COPY package*.json ./
RUN npm install --production

COPY . .
RUN npm run build

ENV HOST=0.0.0.0
ENV PORT=1337
EXPOSE 1337
CMD ["npm", "run", "start"]
