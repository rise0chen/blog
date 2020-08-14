---
title: xampp安装与使用
date: 2015-03-11
categories: [✬后端, PHP]
---

xampp 包含 Apache、PHP、MySQL、phpMyAdmin、ftp。

<!--more-->

## 下载安装

```bash
sudo wget https://nchc.dl.sourceforge.net/project/xampp/XAMPP%20Linux/5.6.30/xampp-linux-x64-5.6.30-0-installer.run
sudo chmod 775 xampp-linux-x64-5.6.30-0-installer.run
sudo ./xampp-linux-x64-5.6.30-0-installer.run
```

## 目录结构

| 文件/目录                            | 用途                |
| :----------------------------------- | :------------------ |
| /opt/lampp/bin/                      | XAMPP 命令库。      |
| 例如 /opt/lampp/bin/mysql            | 可执行 MySQL 监视器 |
| /opt/lampp/htdocs/                   | Apache 文档根目录   |
| /opt/lampp/etc/httpd.conf            | Apache 配制文件     |
| /opt/lampp/etc/my.cnf                | MySQL 配制文件      |
| /opt/lampp/etc/php.ini               | PHP 配制文件        |
| /opt/lampp/etc/proftpd.conf          | ProFTPD 配制文件    |
| /opt/lampp/phpmyadmin/config.inc.php | phpMyAdmin 配制文件 |

## 配置文件

```apacheconf /opt/lampp/etc/httpd.conf
DocumentRoot "/opt/lampp/htdocs/www"
<Directory "/opt/lampp/htdocs/www">
Include etc/extra/httpd-vhosts.conf
Include etc/extra/httpd-xampp.conf
```

```apacheconf /opt/lampp/etc/extra/httpd-xampp.conf
Alias /sql "/opt/lampp/phpmyadmin"
<Directory "/opt/lampp/phpmyadmin">
  AllowOverride AuthConfig Limit
  Require all granted
  ErrorDocument 403 /error/XAMPP_FORBIDDEN.html.var
</Directory>
```

```apacheconf /opt/lampp/etc/extra/httpd-vhosts.conf
<VirtualHost *:80>
  #ServerName *
  DocumentRoot "/opt/lampp/htdocs/www"
  <Directory "/opt/lampp/htdocs/www">
    Options Indexes FollowSymLinks ExecCGI Includes
    AllowOverride All
    Require all granted
  </Directory>
</VirtualHost>

<VirtualHost *:80>
  ServerName blog.crise.cn
  DocumentRoot "/opt/lampp/wordpress"
  <Directory "/opt/lampp/wordpress">
    Options Indexes FollowSymLinks ExecCGI Includes
    AllowOverride All
    Require all granted
  </Directory>
</VirtualHost>
```

## 常用命令

```bash
sudo /opt/lampp/lampp start #启动
sudo /opt/lampp/lampp restart #重启
sudo /opt/lampp/lampp security #安全检查
```

## 安全问题

1. XAMPP 页面没有密码加密。
2. MySQL 可通过网络访问。
3. phpMyAdmin 的用户 pma 没有密码。
4. MySQL 管理员（root）没有密码。
5. ProFTPD 默认用户名`daemon`；密码`xampp`。
6. phpMyAdmin 可以通过网络访问。
7. 示例程序可以通过网络访问。
8. MySQL 和 Apache 在同一个用户名下运行。
