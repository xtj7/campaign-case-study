# Build node, makes sure the project is built within docker
# and to force a rebuild of node-sass, so that it can run within
# the linux-based docker container.

FROM node:10.16.2-alpine AS build-node
WORKDIR /app
COPY . .
RUN yarn add --force node-sass
RUN yarn run build

# Create the actual serving container using node serve. This could
# be replaced with an nginx-based image, if high-performance
# without a CDN is required.

FROM node:10.16.2-alpine
RUN yarn global add serve
WORKDIR /app
COPY --from=build-node /app/build .
CMD ["serve", "-p", "80", "-s", "."]
