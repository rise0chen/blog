---
title: git强制覆盖本地文件
date: 2018-01-17
categories: [✮工具, 备份]
---

使用 pull 时，强制覆盖本地文件。

```bash
git fetch --all
git reset --hard origin/master
git pull
```
