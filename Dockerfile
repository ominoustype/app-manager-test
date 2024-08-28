FROM node:20.15.1
WORKDIR /app
#COPY package*.json .
#RUN npm ci
COPY . ./
RUN yarn install --force

# Better be safe than sorry
RUN cd src/contexts/shared && yarn build
RUN cd src/contexts/documents && yarn build
RUN cd src/contexts/environments && yarn build
RUN cd src/contexts/deploymentConfigs && yarn build

EXPOSE 3000
CMD ["yarn", "serve:on-premise"]