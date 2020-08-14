---
title: 使用certbot获取SSL证书
date: 2019-05-27
categories: [✬后端, 安全]
---

Let's Encrypt 提供免费、自动化、开放的证书签发服务。
使用 EFF 的 Certbot 在您的网站上自动启用 HTTPS，部署 Let 的加密证书。

<!--more-->

## 一、安装 certbot

```bash
sudo apt-get update
sudo apt-get install certbot
```

## 二、获取证书

```bash
sudo certbot --manual --preferred-challenges dns certonly
```

## 三、配置 dns

1. 配置 DNS 解析
1. 使用`nslookup -q=TXT _acme-challenge.domain.cn`查看解析是否生效

## 四、获取网站证书

证书已保存在`/etc/letsencrypt/live/`

## 五、自动更新证书

Let's Encrypt 签发的证书只有 90 天有效期，建议每月自动更新一次。

```bash /etc/crontab
0  0    1 * *   root    certbot renew --dry-run
```

## 相关链接

[Let's Encrypt](https://letsencrypt.org/upcoming-features/)
[certbot](https://certbot.eff.org/lets-encrypt/ubuntuxenial-other)
