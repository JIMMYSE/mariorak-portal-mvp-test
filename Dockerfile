# build stage
FROM node:18-alpine as build-stage

# 앱 디렉터리 생성
WORKDIR /app

# 앱 소스 추가
COPY . .
RUN rm -rf node_modules
COPY ./node_modules/seoroverse-dto /app/node_modules/seoroverse-dto

# 앱 모듈 설치
RUN npm install
RUN npm run build:dev

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist/spa /usr/share/nginx/html
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d 
RUN rm /etc/nginx/conf.d/default.conf 
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]