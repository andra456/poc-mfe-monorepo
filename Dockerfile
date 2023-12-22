# 1. For build React app
FROM node:16.20.0 AS development

# Set working directory
WORKDIR /app

# 
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

# Install PM2 globally
RUN npm install --global pm2

# Same as npm install
RUN yarn install

COPY . /app

ENV CI=true
ENV PORT=4200

CMD [ "yarn", "dev" ]

FROM development AS build

RUN npm run build


FROM development as dev-envs
RUN apt update -y
RUN apt install -y --no-install-recommends git

RUN useradd -s /bin/bash -m vscode
RUN groupadd docker
RUN usermod -aG docker vscode

# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /
CMD [ "yarn", "start" ]

# 2. For Nginx setup
FROM nginx:alpine

# Copy config nginx
COPY --from=build /app/nginx/nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=build /app/dist/apps .

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
# Launch app with PM2
CMD [ "pm2-runtime", "start", "npm", "--", "start" ]