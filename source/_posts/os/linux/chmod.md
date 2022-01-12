---
title: Linux用户权限相关命令
date: 2015-07-04
categories: [⚝系统, Linux]
---

```bash
sudo chmod [-R] 777 文件或目录            #改变文件使用权限
sudo chown [-R] 用户[:用户组] 文件或目录  #改变文件所有者
sudo chgrp [-R] 用户组 文件或目录         #改变文件所属用户组
su 用户 -c "命令"                    #以其他用户身份执行
```
