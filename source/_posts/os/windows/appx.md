---
title: 卸载Win10自带小程序
date: 2017-08-13
categories: [⚝系统, Windows]
---

新装 Win10 操作系统后，自带了很多小程序。

<!--more-->

## 卸载

以管理员身份运行 PowerShell。

```
Get-AppxPackage *OneNote* | Remove-AppxPackage #OneNote
Get-AppxPackage *3d* | Remove-AppxPackage #3D
#Get-AppxPackage *camera* | Remove-AppxPackage #Camera相机
#Get-AppxPackage *communi* | Remove-AppxPackage #邮件和日历
Get-AppxPackage *bing* | Remove-AppxPackage #新闻订阅
Get-AppxPackage *zune* | Remove-AppxPackage #Groove音乐、电影与电视
Get-AppxPackage *people* | Remove-AppxPackage #人脉
Get-AppxPackage *phone* | Remove-AppxPackage #手机伴侣（Phone Companion）
Get-AppxPackage *photo* | Remove-AppxPackage #照片
Get-AppxPackage -AllUsers *solit* | Remove-AppxPackage #纸牌游戏
Get-AppxPackage *soundrec* | Remove-AppxPackage #录音机
Get-AppxPackage -AllUsers *xbox* | Remove-AppxPackage #Xbox
```
