---
title: svn自动部署代码
date: 2016-08-30
categories: [✮工具, 备份]
---

SVN 是 Subversion 的简称，是一个开放源代码的版本控制系统，它采用了分支管理系统。说得简单一点 SVN 就是用于多个人共同开发同一个项目，共用资源的目的。

<!--more-->

## 1.安装 svn 服务器

```bash
apt-get install subversion
cd /usr/local/      #进入目录，准备创建svn目录
mkdir svn       #创建一个svn目录
svnadmin create /usr/local/svn/first  #创建一个svn版本仓库first(first可以随便起名字)
```

## 2.修改三个配置文件

```bash
cd first/conf    #进入first版本仓库下的配置文件目录
```

```ini svnserve.conf
anon-access = none       #默认是只读read
auth-access = write      #认证后有写入权限
password-db = passwd     #帐号密码配置文件
authz-db = authz         #权限配置文件
realm = first            #改成自己的版本库 生效范围
```

```ini authz
[group]
first = ddl,shl       #创建一个first的组，并制定两个用户ddl和shl
[/]                   #制定根目录下的权限
@first = rw           #first组用户权限为读写
* = r                 #其他用户只有读权限
```

```ini passwd
[users]
ddl = 123456    #用户名 = 密码(明文)
```

## 3.启动 svn 服务器

SVN 版本库起动方式，现在 svn 下面有 first、test 两个版本库

```bash
svnserve -d -r /usr/local/svn/first #单版本库起动
svnserve -d -r /usr/local/svn       #多版本库起动
```

区别在于起动 svn 时候的命令中的启动参数-r 指定的目录。

### 其他 svn 命令：

```bash
lsof -i :3690   #查看svn是否启动
ps aux |grep 'svn'  #查找所有svn启动的进程
netstat -anp|grep svnserve #查看一下SVN信息
```

## 4.svn 客户端

```bash
svn checkout svn:#localhost:3690/first  #注意目录后面还有一个点
svn add *  #将所有文件上传
svn commit -m "message" *  #开始上传
```

## 5.使用 post-commit 实现自动部署

在`svn目录`的`/hooks`里面有一堆 tmpl，这些 tmpl 可以做很多事情，不过今天我们就说一下自动部署`post-commit.tmpl`。

```bash
chmod 755 post-commit #增加可执行权限
vi post-commit #编辑
```

```bash
#!/bin/sh
svn update --username **** --password **** /var/www/test
```

## 6.常见错误

255 错误：post-commit 没有给执行权限 或者 头部没有执行用 sh 执行，就是没有#!/bin/sh
提示跳过目录：服务器目录没有 checkout 代码，记得一定要先 checkout 一次，才能同步(每次新建项目都需要）
