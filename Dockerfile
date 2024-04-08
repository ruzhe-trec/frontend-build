# 使用 Nginx 官方镜像作为基础镜像
FROM nginx:alpine

# 将 dist 目录（包含你的前端构建文件）复制到 Nginx 服务器的相应目录下
COPY ./dist /usr/share/nginx/html

# （可选）如果你有自定义的 Nginx 配置文件，也可以复制到容器中
COPY ./nginx.conf /etc/nginx/nginx.conf

# 暴露 80 端口
EXPOSE 80

# 使用 Nginx 镜像默认的启动命令
CMD ["nginx", "-g", "daemon off;"]
