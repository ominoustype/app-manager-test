#syntax=docker/dockerfile:1.7-labs
# Build stage
FROM node:22 AS build
WORKDIR /app

# Set global dependencies
COPY [ "package*.json", "yarn.lock", "./" ]

# Set dependencies for each App and Context
COPY --parents src/**/package.json ./

# Install all dependencies
RUN yarn install --force --frozen-lockfile

COPY . ./

# Build up the project
RUN yarn build:all
RUN yarn build:apps

    # yarn build:all is also OK, although slower since tests are also transpiled&compiled
    
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

# Run stage
FROM node:22-alpine
ENV NODE_ENV production
USER node:node
WORKDIR /app
RUN mkdir ./logs 

# Copy global dependencies
COPY --chown=node:node --from=build /app/package*.json /app/yarn.lock ./

# Copy only the necessary files (/dist & package.json) from the build stage for each App & Context
COPY --parents --chown=node:node --from=build /app/src/**/dist /
COPY --parents --chown=node:node --from=build /app/src/**/package.json /

# Install only production dependencies
RUN yarn install --force --frozen-lockfile --production=true && \
    yarn cache clean --all

EXPOSE 3000
CMD [ "node", "src/apps/on-premise/express/dist/index.js" ]
