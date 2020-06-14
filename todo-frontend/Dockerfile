# build environment
FROM node:13.12.0-alpine as build
WORKDIR /app
#HACK:for reasons, below environment variable is not seen by React app build when injected from environment-variables.env
ENV REACT_APP_API_URL http://pvpcounters.com/alchemy/api
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
#EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]