---
title: Ubuntu更新软件源
date: 2021-02-22
categories: [⚝系统, Linux]
---

ubuntu 下载软件慢的原因大部分是因为软件源地址是国外的，更新软件源，可以提升很大的下载速度。
本文介绍从 12.04 起所有版本的软件源，包括阿里、腾讯、华为、163、搜狐、中科大、清华、上交大、官方等。

<!--more-->

## 一、备份

```bash
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak
```

## 二、编辑

```bash
sudo vi /etc/apt/sources.list
```

<iframe src="/static/other/ubuntu.html" width="100%" height="346px"></iframe>

## 三、更新

```bash
sudo apt-get update
```
