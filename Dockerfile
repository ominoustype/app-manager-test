FROM node:20.15.1
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .

RUN yarn install --force
RUN cd src/contexts/shared && yarn build
RUN cd src/contexts/documents && yarn build

EXPOSE 3000
CMD ["npm", "start"]