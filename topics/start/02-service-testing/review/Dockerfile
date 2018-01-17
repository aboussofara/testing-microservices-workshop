FROM node:6.9.4-alpine

EXPOSE 9082

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# https://github.com/nodejs/docker-node/issues/57
ENV NPM_CONFIG_LOGLEVEL warn

# Changes NPM behaviour based on value:
# * production: installs dependencies only
# * development (default): installs dependencies and devDependencies
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

ENTRYPOINT ["npm"]
CMD ["start"]
