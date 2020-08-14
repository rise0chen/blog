---
title: 自动备份MySQL并上传git
date: 2017-08-03
categories: [✬后端, 数据库]
---

使用 sh 脚本，调用`mysqldump`备份数据库，并调用`git`上传。

<!--more-->

## 使用`mysqldump`备份

```bash
/opt/lampp/bin/mysqldump -h [host] -u [user] -p[pwd] --databases [dbs] > ./mysql/test.sql
```

## 使用`git`上传

```bash
git add ./mysql/test.sql
git commit -m $(date +%Y%m%d)
git push
```

## 添加定时任务

见[Linux 添加定时任务](/linux/9003.html)。

## 示例代码

```bash backMysql.sh
#!/bin/bash
home_git='/opt/lampp/htdocs/tcp/'
cd $home_git
/opt/lampp/bin/mysqldump -h [host] -u [user] -p[pwd] --databases [dbs] > ./mysql/test.sql
git add ./mysql/test.sql

git commit -m $(date +%Y%m%d)
git push
```

## 三、恢复 MySQL

```bash
mysql -h主机地址 -P端口 -u用户名 -p用户密码 < ./mysql/db.sql
```
