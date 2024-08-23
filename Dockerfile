FROM node:20.15.1
WORKDIR /app
#COPY package*.json .
#RUN npm install
COPY . ./
RUN yarn install --for
RUN cd src/contexts/shared && yarn build
RUN cd src/contexts/documents && yarn build

EXPOSE 3001
CMD ["yarn", "serve"]