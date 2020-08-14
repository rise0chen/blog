---
title: docker-compose
date: 2018-06-26
categories: [✮工具, Linux]
---

## 安装 Docker-compose

```bash
curl -L https://github.com/docker/compose/releases/download/1.21.2/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```

## docker-compose.yml

```yml
version: '3'
services:
  mysql:
    image: 'mysql:5.6'
    restart: always
    ports:
      - 3306:3306
    volumes:
      - /data/mysql/my:/var/lib/mysql
    environment:
      - MYSQL_ROOT_PASSWORD=123456
  web:
    build: .
    ports:
      - 80:80
    volumes:
      - .:/usr/src/app
```

```yml
image: 镜像的ID
build: 直接从pwd的Dockerfile来build，而非通过image选项来pull
links: 连接到那些容器。每个占一行，格式为SERVICE[:ALIAS],例如 – db[:database]
external_links: 连接到该compose.yaml文件之外的容器中，比如是提供共享或者通用服务的容器服务。格式同links
command: 替换默认的command命令
ports: 导出端口。
expose: 导出端口，但不映射到宿主机的端口上。它仅对links的容器开放。格式直接指定端口号即可。
volumes: 加载路径作为卷，可以指定只读模式。
volumes_from: 加载其他容器或者服务的所有卷。
environment: 设置环境变量。
env_file: 从一个文件中导入环境变量，文件的格式为RACK_ENV=development
extends: 扩展另一个服务，可以覆盖其中的一些选项。
net: 容器的网络模式，可以为”bridge”, “none”, “container:[name or id]”, “host”中的一个。
dns: 可以设置一个或多个自定义的DNS地址。
dns_search: 可以设置一个或多个DNS的扫描域。

和 docker run 命令是一样的，这些命令都是单行的命令:
working_dir, entrypoint, user, hostname, domainname, mem_limit, privileged, restart, stdin_open, tty, cpu_shares
```

## docker-compose 常用命令

```yml
--verbose: 输出详细信息
-f: 制定一个非docker-compose.yml命名的yaml文件
-p: 设置一个项目名称（默认是directory名）
docker-compose的动作包括:
build: 构建服务
kill -s SIGINT: 给服务发送特定的信号。
logs: 输出日志
port: 输出绑定的端口
ps: 输出运行的容器
pull: pull服务的image
rm: 删除停止的容器
run: 运行某个服务，例如docker-compose run web python manage.py shell
start: 运行某个服务中存在的容器。
stop:停止某个服务中存在的容器。
up: create + run + attach容器到服务。
scale: 设置服务运行的容器数量。例如: docker-compose scale web=2 worker=3
```

## 相关链接

[Docker Compose—简化复杂应用的利器](http://debugo.com/docker-compose/)
