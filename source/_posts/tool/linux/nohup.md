---
title: 后台运行Shell脚本
date: 2015-06-25
categories: [✮工具, Linux]
---

## 问题

从终端软件登录远程的 Linux 主机，如果突然断网、退出终端软件时，正在执行的 Shell 脚本会自动取消运行。

## 方案

### (1)输入命令

`nohup 'shell命令' &`

<!--more-->

### (2)回车，使终端回到 shell 命令行

### (3)关闭:

```bash
ps -ef | grep 'shell命令' #查找进程
kill 'PID' #杀死进程
```

## 解释

nohup 命令，可以让 shell 命令忽略 SIGHUP 信号，即可以使之脱离终端运行；
“&”，可以让你的命令在后台运行。
