---
title: 配置phpMyAdmin连接MySQL数据库
date: 2015-03-16
categories: [✬后端, PHP]
---

1、phpmyadmin 程序所在服务器：HOST_phpmyadmin，访问地址为：http://HOST_phpmyadmin/phpmyadmin 。
2、MySQL 数据库所在服务器：HOST_mysql（需设置 MySQL 数据库用户，使`Host name`=%或 HOST_phpmyadmin，以便允许数据库外链）。
3、现在要通过http://HOST_phpmyadmin/phpmyadmin 来管理服务器 HOST_mysql 上面的 MySQL 数据库。

<!--more-->

## 一、下载[phpMyAdmin](https://www.phpmyadmin.net/downloads/)

解压到http://HOST_phpmyadmin/phpmyadmin 目录。

## 二、修改配置文件

在`HOST_mysql`上，检查端口是否被防火墙屏蔽，并修改 MySQL 配置文件`my.cnf`。

```bash /opt/lampp/etc/my.cnf
#skip-networking #注释掉，否则无法通过ip连接
```

在`HOST_phpmyadmin`上，修改`phpmyadmin根目录`中的`config.inc.php`文件。

```php config.inc.php
$cfg['Servers'][$i]['verbose'] = '别名';
$cfg['Servers'][$i]['auth_type'] = 'config';
$cfg['Servers'][$i]['host'] = 'HOST_mysql';
$cfg['Servers'][$i]['user'] = 'HOST_mysql_user';
$cfg['Servers'][$i]['password'] = 'HOST_mysql_user_pwd';
```

## 三、配置完成

现在通过http://HOST_phpmyadmin/phpmyadmin 即可访问 MySQL 数据库。

## 四、安全策略

一般情况下，不需要密码就可以直接访问 phpMyAdmin，这样非常不安全。
下面，介绍如何给 phpMyAdmin 添加访问密码。

1. 利用 apache2 自带的`htpasswd`命令，在`phpmyadmin根目录`生成密钥文件

```bash
sudo /opt/lampp/bin/htpasswd -bc <file> <user> <pwd> #重写文件，并添加用户
sudo /opt/lampp/bin/htpasswd -b <file> <user> <pwd> #添加用户
#<file>可设置为'/opt/lampp/phpmyadmin/.htpasswd'。
#apache默认不允许外部读取“.ht”开头的文件，安全系数会高一些。
```

2. 编辑`phpmyadmin根目录`中的`.htaccess`文件。

```apacheconf .htaccess
authName "Access denied"
AuthType basic
AuthUserFile /opt/lampp/phpmyadmin/.htpasswd
require valid-user
```

3. 再访问 phpMyAdmin 时，就需要用户认证了。
