# 使用官方 Nginx 镜像作为基础镜像
FROM nginx:alpine

# 将构建输出复制到 Nginx 用于服务的目录下
COPY dist/ /usr/share/nginx/html

# 使用自定义的 Nginx 配置文件 (如果有)
COPY nginx.conf /etc/nginx/nginx.conf
