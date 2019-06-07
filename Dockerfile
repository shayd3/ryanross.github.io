### STAGE 1: Build ###
FROM node:12 as builder

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# Install and cache app dependencies
COPY package.json package-lock.json ./
RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

# Store node modules on separate layer will prevent unnecessary npm installs at each build
RUN npm i && mkdir /ng-app && cp -R ./node_modules ./ng-app
WORKDIR /ng-app

COPY . .

RUN npm run-script build-prod

### STAGE 2: Setup

FROM nginx

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /ng-app/dist/IAmRyanRoss /usr/share/nginx/html

RUN ls /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]