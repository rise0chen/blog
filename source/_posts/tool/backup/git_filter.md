---
title: git自动替换文本
date: 2017-08-04
categories: [✮工具, 备份]
---

有些文件中(如.sql)含有一些经常变动的无用信息(如文件创建时间)。
为了避免重复备份这些无用信息，可以使用以下方法在提交前替换相应的文本。

<!--more-->

## 文件目录下新建`.gitattributes`文件

```bash .gitattributes
*.sql filter=[filter_name]
```

## 注册`filter`过滤器规则

可以通过命令行、编辑`user目录`下`.gitconfig`文件 等方式。

```bash 使用命令行
git config --global filter.[filter_name].clean 'sed "s/-- Dump completed on .*$/ /g"'
```

```bash user目录下.gitconfig文件
[filter "sql"]
  clean = sed \"s/-- Dump completed on .*$//g\"
```

## 解释

`filter`过滤器拥有`clean`、`smudge`方法。
clean 过滤器会在 staged 时（add 时）执行。
smudge 过滤器会在 checkout 时执行。
`sed`为文本替换命令，执行后面的正则表达式。
