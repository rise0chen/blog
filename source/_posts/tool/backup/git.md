---
title: Linux安装配置git服务器和客户端
date: 2017-05-29
categories: [✮工具, 备份]
---

Git 是一款免费、开源的分布式版本控制系统，用于敏捷高效地处理任何或小或大的项目。

<!--more-->

## 1.配置前准备

```bash
sudo apt-get install openssh-client git-core #客户端：安装git-core openssh-client
sudo apt-get install openssh-server gitosis  #服务器：安装ssh server另外还装了gitosis做git的权限管理
ssh-keygen -t rsa #使用ssh-keygen生成一对密钥，注意 这个时候不要用sudo
sudo chmod 600 ~/.ssh/id_rsa #设置权限范围
```

默认情况下，公钥和私钥会保存在`~/.ssh`目录下

## 2.服务器配置

服务器：创建 git 服务器管理用户

```bash
sudo useradd -m git
sudo passwd git
su git #切换到git用户
gitosis -init < id_rsa.pub #初始化gitosis
chmod 755 /home/git/repositories/gitosis-admin.git/hooks/post-update #设置权限让gitosis-admin仓库可clone
```

## 3.客户端配置

客户端：在`/tmp`目录下 clone 仓库

```bash
cd /tmp
git clone git@hostname:/home/git/repositories/gitosis-admin.git
cd gitosis-admin
vi gitosis.conf #编辑gitosis.conf文件
```

```ini
[gitosis]
[group gitosis-admin]
writable = gitosis-admin
members = a@server1
[group developers]
writable = helloworld
members = a@server1 b@server2
[group test]
readonly = helloworld
members = c@server3
```

这个配置文件表达了如下含义：
gitosis-admin 组成员有 a，该组对 gitosis-admin 仓库有读写权限；
developers 组有 a，b 两个成员，该组对 helloworld 仓库有读写权限；
test 组有 c 一个成员，对 helloworld 仓库有只读权限。
当然目前这些配置文件的修改只是在你的本地，你必须推送到 git 服务器上才能真正生效。

将本用户的公钥拷贝到 keydir 目录内的 user1.pud, 这个 user1.pud 名字 和 gitosis.conf 中的“members = user1”对应。

```bash
cp /home/user1/.ssh/id_rsa.pud /tmp/gitosis-admin/keydir/user1.pud
git add .
git commit -am "add user1 pub"
git push
```
