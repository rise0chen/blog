---
title: ssh 内网穿透
date: 2019-12-11
categories: [⚝系统, Linux]
---

## 配置

```bash /etc/ssh/sshd_config
GatewayPorts yes
```

## 映射端口

在内网机上运行以下指令，即可将本地的 22 端口映射到堡垒机的 2222 端口

```bash
ssh -fNgR 2222:127.0.0.1:22 <堡垒机用户名@堡垒机IP>
```

在内网机上运行`ps -ef | grep "ssh "`查看运行状态

在堡垒机上运行`netstat -an | grep 2222`查看网络连接

## 连接内网机

`ssh -p 2222 <内网机用户名@堡垒机IP>`连接内网机
