# Author: Federico Engler
#
# The Dockerfile used to create the image for our backend.
FROM node:16.15-alpine

# Install the dependencies on an early layer so that changes in the source code
# don't extend the image building time. As dependencies change rarely, this layer
# will be fairly stable.
COPY package*.json ./
RUN npm install --no-optional

# Copy the application source...
COPY src src

# ...and define the entrypoint for the application.
ENTRYPOINT ["node", "-r", "esm", "src/index.js"]
