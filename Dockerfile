FROM node:19.2-alpine
WORKDIR /app
COPY package.json .
COPY public/ /app/public/
RUN npm install
COPY . /app/
EXPOSE 3001
CMD ["yarn", "start"]