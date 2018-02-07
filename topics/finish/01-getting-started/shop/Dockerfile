FROM node:8.9.0-alpine

EXPOSE 9083

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# https://github.com/nodejs/docker-node/issues/57
ENV NPM_CONFIG_LOGLEVEL warn

# Changes NPM behaviour based on value:
# * production: installs dependencies only
# * development (default): installs dependencies and devDependencies
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

# Helps to not invalidate cache before installing node modules
COPY . .
RUN  if [ -f package-lock.json.alpine ]; then cp package-lock.json.alpine package-lock.json; fi \
&& npm install \
&& chown -R root:root /usr/src/app \
&& chmod -R g+w /usr/src/app

ENTRYPOINT ["npm"]
CMD ["start"]
