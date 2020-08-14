---
title: 安装/卸载Node.js
date: 2017-05-29
categories: [✬后端, NodeJS]
---

本文介绍如何在 Linux/Windows 下 安装/卸载[nodejs](https://nodejs.org/en/download/)。

<!--more-->

## Linux

### 方法一、二进制文件简单安装

#### 1.下载 Node.js 安装包

```bash
VERSION=v10.15.0
DISTRO=linux-x64
sudo wget https://nodejs.org/dist/$VERSION/node-$VERSION-$DISTRO.tar.xz #下载nodejs安装包
```

#### 2.解压文件并安装

```bash
sudo tar xf node-$VERSION-$DISTRO.tar.xz -C /usr/local/lib  #解压缩
sudo mv /usr/local/lib/node-$VERSION-$DISTRO /usr/local/lib/nodejs
sudo ln -s /usr/local/lib/nodejs/bin/node /usr/local/bin/node #创建node的软连接
sudo ln -s /usr/local/lib/nodejs/bin/npm /usr/local/bin/npm   #创建npm的软连接
node -v    #查看当前安装的Node的版本
```

#### 3.卸载

```bash
sudo rm -r /usr/local/lib/nodejs  #删除软件目录
sudo rm /usr/local/bin/node  #删除node的软连接
sudo rm /usr/local/bin/npm   #删除npm的软连接
```

### 方法二、源码安装

#### 1.下载 Node.js 安装包

```bash
cd /usr/local/src/     #进入/usr/local/src目录
sudo wget https://nodejs.org/dist/$VERSION/node-$VERSION.tar.gz #下载nodejs安装包
```

#### 2.解压文件并安装

```bash
sudo tar xf node-$VERSION.tar.gz  #解压缩
cd node-$VERSION   #进入目录
sudo apt-get install g++ #安装编译器
sudo ./configure ###执行配置文件
sudo make    #编译
sudo make install  #运行安装
#sudo cp /usr/local/bin/node /usr/sbin/ #复制快捷方式
node -v    #查看当前安装的Node的版本
```

#### 3.卸载

```bash
cd cd /usr/local/src/node-$VERSION   #进入目录
sudo make uninstall  #卸载
```

## Windows

### 1.下载

下载地址：https://nodejs.org/en/download/

### 2.安装

双击安装即可

### 3.卸载

与普通软件一样，到`控制面板`--`程序`--`卸载程序`

## 测试程序

这个简单 Node 编写的 Web 服务器，为每个请求响应返回“Hello World”。

```js
var http = require('http');
http
  .createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
  })
  .listen(1337);
console.log('Server running at  port 1337 ');
```

要运行服务器，将代码编写到文件 example.js 并执行 node 程序命令行：

```bash
node example.js
```

浏览器访问[http://127.0.0.1:1337/](http://127.0.0.1:1337/)即可。
