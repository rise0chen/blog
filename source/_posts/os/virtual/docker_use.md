---
title: docker常用指令
date: 2018-06-14
categories: [⚝系统, 虚拟化]
---

## 安装 Docker

```bash
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
```

## 根据代码生成镜像

```bash
docker build -t <img:latest> .
```

## 运行镜像并生成容器

```bash
docker run -d -p 80:80 --name <container> <img:latest>
docker run -d -p 3306:3306 --restart always -v /data/mysql/my:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 --name mysql_my mysql:5.6
#若镜像不存在，会自动下载镜像
#如需修改容器配置，必须停止、删除、再启动新容器

#后台运行  -d
#端口映射  -p 宿主:容器
#指定昵称  --name container
#磁盘映射  -v 宿主:容器
#环境变量  -e k=v
#连接容器  --link 容器:地址别名
```

## 查看运行情况

```bash
#查看运行日志
docker logs <container>
vi /var/lib/docker/containers/<container>/<container>-json.log
#查看容器IP
docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <container>
#查看系统进程
docker top <container>
```

## 进入控制台

```bash
docker exec -it <container> /bin/bash
```

## 导出镜像

```bash
docker save <img:latest> > <img:latest>.tar
```

## 导入镜像

```bash
docker load < <img:latest>.tar
```

## 查看镜像列表

```bash
docker images
```

## 查看容器列表

```bash
docker ps -a
```

## 删除容器

```bash
docker stop <container>
docker rm <container>
# 删除所有
docker rm -f `docker ps -a -q`
# 删除所有停止的
docker ps -a | grep Exit | cut -d ' ' -f 1 | xargs docker rm
```

## 删除镜像

需要先删除镜像下的所有容器

```bash
docker rmi <img>
# 删除所有
docker rmi `docker images -q`
# 删除所有悬空的
docker rmi $(docker images | grep "^<none>" | awk "{print $3}")
docker volume rm $(docker volume ls -qf dangling=true)
```

## 上传镜像到仓库

```bash
#登录
docker login -u <user> -p <passwd>
docker login -u <user> -p <passwd> [registry.cn-shanghai.aliyuncs.com]
#创建tag
docker tag <img> rise0chen/<app>:<ver>
docker tag <img> registry.cn-shanghai.aliyuncs.com/rise0chen/<app>:<ver>
#上传
docker push rise0chen/<app>:[ver]
docker push registry.cn-shanghai.aliyuncs.com/rise0chen/<app>:[ver]
```

## 相关链接

[Docker 命令大全](http://www.runoob.com/docker/docker-command-manual.html)
