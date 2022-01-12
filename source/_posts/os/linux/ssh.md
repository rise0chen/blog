---
title: 使ssh支持中文
date: 2017-07-23
categories: [✮工具, Linux]
---

开启中文显示需要 2 个条件。
1.linux 上支持中文 utf-8 显示；
2.ssh 客户端软件支持中文 utf-8 显示。

<!--more-->

## linux 开启中文显示

编辑`/etc/default/locale`文件

```apacheconf /etc/default/locale
LANG="en_US.UTF-8"
LANGUAGE="en_US:"
```

之后执行`reboot`重启系统。

## ssh 开启中文显示

XShell：`文件`--`属性`--`终端`--`编码`，选择`UTF-8`
