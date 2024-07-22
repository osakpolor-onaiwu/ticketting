FROM node:alpine

WORKDIR /app
COPY package.json .
# note --omit=dev ensures dev depentdencies are not installed
RUN npm install --omit=dev
COPY . .

CMD ["npm", "start"]