# 1. For build React app
FROM node:18 AS builder

# Set working directory
WORKDIR /app

COPY . /app
RUN chmod +x scripts/run.sh

# Install PM2 globally
# RUN npm install --global yarn

# Same as npm install
RUN yarn install
RUN npm run build
# Check after build
RUN ls build

# 2. For Nginx setup
FROM node:18 AS runner

RUN useradd -s /bin/bash -m vscode
RUN groupadd docker
RUN usermod -aG docker vscode

RUN npm install --global pm2
WORKDIR /app


# Copy static assets from builder stage
COPY --from=builder /app/build .
COPY --from=builder /app/config .


RUN ls
RUN ls /app/dist/

RUN apt update
RUN apt install net-tools

CMD [ "/bin/bash", "./run.sh" ]