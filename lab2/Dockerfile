FROM node:18-alpine

COPY package.json /app/
COPY app.js /app/
COPY views/* /app/views/

WORKDIR /app

RUN npm install

EXPOSE 3000

CMD ["node", "app.js"]