FROM node:16.18.0 as builder
ARG BUILD_ENVIRONMENT
COPY . /app
WORKDIR /app
ENV NODE_OPTIONS="--max-old-space-size=4096"
# 设置淘宝镜像源
RUN npm config set registry https://registry.npm.taobao.org/

# 使用 Yarn 安装依赖并构建
RUN yarn install --ignore-scripts -- && yarn run build:$BUILD_ENVIRONMENT

FROM nginx:1.20 as prod
WORKDIR /app
COPY --from=builder /app/dist/ /app/
COPY --from=builder /app/nginx.conf /app/nginx.conf
RUN mv nginx.conf /etc/nginx/conf.d/default.conf \
    && chown -R nginx:nginx /app 
EXPOSE 80
EXPOSE 443
CMD ["/bin/bash","-c","nginx -g 'daemon off;'"]
