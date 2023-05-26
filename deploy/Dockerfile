FROM nginx:alpine
MAINTAINER "bbw <1526699702@qq.com>"

COPY www/dist /usr/share/nginx/html
COPY conf/nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]