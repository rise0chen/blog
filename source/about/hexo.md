---
title: Hexo插件
layout: page
---

## 一、[在线写作](https://github.com/rise0chen/hexo-sync)
### 原由
由于移动设备的普及，电脑很少开机了。想写文章，又不想开电脑。
所以我开放了这个可以在浏览器上写文章的插件。
### 使用
在任意设备上，打开浏览器进行写作，并提交到服务器缓存。
在您开启电脑后，通过该插件获取服务器上的缓存，并保存到本地。
### 其他
详情参考[ReadMe](https://github.com/rise0chen/hexo-sync/blob/master/README.CN.md)

## 二、[七牛部署器](https://github.com/rise0chen/hexo-deployer-qiniucloud)
七牛云储存部署器
### 原由
由于github私有库要付费，并且网速缓慢；oschina(码云)无法CNAME；并且git的通病是容量小。
偶然的机会，发现`七牛`也又Pages功能，并且有10G免费容量，访问速度也可以，还支持CNAME。
所以，我把博客(包括图片、视频等)部署在了`七牛`上。
### 使用
与`hexo-deployer-`类似，安装插件，简单配置后，执行``hexo deploy``就可以了。
### 其他
详情参考[ReadMe](https://github.com/rise0chen/hexo-deployer-qiniucloud/blob/master/README.CN.md)
