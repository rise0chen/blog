---
title: hexo安装与使用
date: 2017-07-11
categories: [✮工具, Blog]
---

[hexo](https://hexo.io/zh-cn/docs/)是一个基于 nodejs 的快速、简洁且高效的博客框架。
Hexo 使用 Markdown（或其他渲染引擎）解析文章，在几秒内，即可利用靓丽的主题生成静态网页。

<!--more-->

## 安装

1. 安装 nodejs，详情参照[安装/卸载 Node.js](/linux/9010.html)
2. 安装[git](https://git-scm.com/downloads)客户端，详情参照[Linux 安装配置 git 服务器和客户端](/linux/9009.html)
3. 使用 npm 全局 hexo 命令：`npm install -g hexo-cli`

## 建站

```bash
hexo init <folder> #初始化hexo框架
cd <folder>
npm install  #根据package.json安装依赖包
```

## 了解更多

[hexo 官方文档](https://hexo.io/zh-cn/docs/index.html)
