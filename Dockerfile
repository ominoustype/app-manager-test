FROM node:20.15.1 AS build
WORKDIR /app

# Set dependencies for each App and Context
COPY src/apps/on-premise/express/package.json src/apps/on-premise/express/
    # Contexts
    COPY src/contexts/shared/package.json src/contexts/shared/
    COPY src/contexts/documents/package.json src/contexts/documents/
    COPY src/contexts/deploymentConfigs/package.json src/contexts/deploymentConfigs/
    COPY src/contexts/environments/package.json src/contexts/environments/
    COPY src/contexts/roles/package.json src/contexts/roles/

# Set global dependencies & install all of them
COPY [ "package*.json", "yarn.lock", "./" ]
RUN yarn install --force --frozen-lockfile

COPY . ./

# Build up the project
RUN yarn build:all

# TODO build @apps properly

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 

# Second stage
FROM node:20.15.1-alpine
WORKDIR /app

# Set global dependencies
COPY --from=build /app/package*.json /app/yarn.lock ./

# Set dependencies for each App and Context
COPY --from=build /app/src/apps/on-premise/express/package.json src/apps/on-premise/express/
COPY --from=build /app/src/contexts/shared/package.json src/contexts/shared/
COPY --from=build /app/src/contexts/documents/package.json src/contexts/documents/
COPY --from=build /app/src/contexts/deploymentConfigs/package.json src/contexts/deploymentConfigs/
COPY --from=build /app/src/contexts/environments/package.json src/contexts/environments/
COPY --from=build /app/src/contexts/roles/package.json src/contexts/roles/

# Copy only the necessary files (/dist) from the build stage
COPY --from=build /app/src/apps/on-premise/express/dist src/apps/on-premise/express/dist
COPY --from=build /app/src/contexts/shared/dist src/contexts/shared/dist
COPY --from=build /app/src/contexts/documents/dist src/contexts/documents/dist
COPY --from=build /app/src/contexts/deploymentConfigs/dist src/contexts/deploymentConfigs/dist
COPY --from=build /app/src/contexts/environments/dist src/contexts/environments/dist
COPY --from=build /app/src/contexts/roles/dist src/contexts/roles/dist

# Install only production dependencies & remove unnecessary cache files
RUN yarn install --force --production=true --frozen-lockfile && \
    yarn cache clean && \
    rm -rf /usr/local/share/.cache/yarn/v6

EXPOSE 3000
CMD [ "yarn", "serve:production" ]
