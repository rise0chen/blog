---
title: MySQL常用命令
date: 2017-07-25
categories: [✬后端, 数据库]
---

记录常用的 MySQL 命令

<!--more-->

## 复制一个表的数据到另一方表

```sql
insert into newTable(column1, column2) select column1, column2 from oldTabale
```
