---
title: curl命令
date: 2015-12-25
categories: [✮工具, Linux]
---

curl 是一个利用 URL 规则在命令行下工作的文件传输工具。它支持文件的上传和下载，所以是综合传输工具，但按传统，习惯称 url 为下载工具。

<!--more-->

## 一、curl 命令参数

-a/--append 上传文件时，附加到目标文件
-A/--user-agent 设置用户代理发送给服务器
-anyauth 可以使用“任何”身份验证方法
-b/--cookie &lt;name=string/file&gt; cookie 字符串或文件读取位置
-basic 使用 HTTP 基本验证
-B/--use-ascii 使用 ASCII /文本传输
-c/--cookie-jar 操作结束后把 cookie 写入到这个文件中
-C/--continue-at 断点续转
-d/--data HTTP POST 方式传送数据
--data-ascii 以 ascii 的方式 post 数据
--data-binary 以二进制的方式 post 数据
--negotiate 使用 HTTP 身份验证
--digest 使用数字身份验证
--disable-eprt 禁止使用 EPRT 或 LPRT
--disable-epsv 禁止使用 EPSV
-D/--dump-header 把 header 信息写入到该文件中
--egd-file 为随机数据(SSL)设置 EGD socket 路径
--tcp-nodelay 使用 TCP_NODELAY 选项
-e/--referer 来源网址
-E/--cert &lt;cert[:passwd]&gt; 客户端证书文件和密码 (SSL)
--cert-type 证书文件类型 (DER/PEM/ENG) (SSL)
--key 私钥文件名 (SSL)
--key-type 私钥文件类型 (DER/PEM/ENG) (SSL)
--pass 私钥密码 (SSL)
--engine 加密引擎使用 (SSL). "--engine list" for list
--cacert CA 证书 (SSL)
--capath CA 目录 (made using c_rehash) to verify peer against (SSL)
--ciphers SSL 密码
--compressed 要求返回是压缩的形势 (using deflate or gzip)
--connect-timeout 设置最大请求时间
--create-dirs 建立本地目录的目录层次结构
--crlf 上传是把 LF 转变成 CRLF
-f/--fail 连接失败时不显示 http 错误
--ftp-create-dirs 如果远程目录不存在，创建远程目录
--ftp-method [multicwd/nocwd/singlecwd] 控制 CWD 的使用
--ftp-pasv 使用 PASV/EPSV 代替端口
--ftp-skip-pasv-ip 使用 PASV 的时候,忽略该 IP 地址
--ftp-ssl 尝试用 SSL/TLS 来进行 ftp 数据传输
--ftp-ssl-reqd 要求用 SSL/TLS 来进行 ftp 数据传输
-F/--form &lt;name=content&gt; 模拟 http 表单提交数据
-form-string &lt;name=string&gt; 模拟 http 表单提交数据
-g/--globoff 禁用网址序列和范围使用{}和[]
-G/--get 以 get 的方式来发送数据
-h/--help 帮助
-H/--header 自定义头信息传递给服务器
--ignore-content-length 忽略的 HTTP 头信息的长度
-i/--include 输出时包括 protocol 头信息
-I/--head 只显示文档信息
从文件中读取-j/--junk-session-cookies 忽略会话 Cookie -界面指定网络接口/地址使用
-krb4 &lt;级别&gt;启用与指定的安全级别 krb4
-j/--junk-session-cookies 读取文件进忽略 session cookie
--interface 使用指定网络接口/地址
--krb4 使用指定安全级别的 krb4
-k/--insecure 允许不使用证书到 SSL 站点
-K/--config 指定的配置文件读取
-l/--list-only 列出 ftp 目录下的文件名称
--limit-rate 设置传输速度
--local-port 强制使用本地端口号
-m/--max-time 设置最大传输时间
--max-redirs 设置最大读取的目录数
--max-filesize 设置最大下载的文件总量
-M/--manual 显示全手动
-n/--netrc 从 netrc 文件中读取用户名和密码
--netrc-optional 使用 .netrc 或者 URL 来覆盖-n
--ntlm 使用 HTTP NTLM 身份验证
-N/--no-buffer 禁用缓冲输出
-o/--output 把输出写到该文件中
-O/--remote-name 把输出写到该文件中，保留远程文件的文件名
-p/--proxytunnel 使用 HTTP 代理
--proxy-anyauth 选择任一代理身份验证方法
--proxy-basic 在代理上使用基本身份验证
--proxy-digest 在代理上使用数字身份验证
--proxy-ntlm 在代理上使用 ntlm 身份验证
-P/--ftp-port 使用端口地址，而不是使用 PASV
-Q/--quote 文件传输前，发送命令到服务器
-r/--range 检索来自 HTTP/1.1 或 FTP 服务器字节范围
--range-file 读取（SSL）的随机文件
-R/--remote-time 在本地生成文件时，保留远程文件时间
--retry 传输出现问题时，重试的次数
--retry-delay 传输出现问题时，设置重试间隔时间
--retry-max-time 传输出现问题时，设置最大重试时间
-s/--silent 静音模式。不输出任何东西
-S/--show-error 显示错误
--socks4 &lt;host[:port]&gt; 用 socks4 代理给定主机和端口
--socks5 &lt;host[:port]&gt; 用 socks5 代理给定主机和端口
--stderr
-t/--telnet-option &lt;OPT=val&gt; Telnet 选项设置
--trace 对指定文件进行 debug
--trace-ascii Like --跟踪但没有 hex 输出
--trace-time 跟踪/详细输出时，添加时间戳
-T/--upload-file 上传文件
--url Spet URL to work with
-u/--user &lt;user[:password]&gt;设置服务器的用户和密码
-U/--proxy-user &lt;user[:password]&gt;设置代理用户名和密码
-v/--verbose
-V/--version 显示版本信息
-w/--write-out [format]什么输出完成后
-x/--proxy &lt;host[:port]&gt;在给定的端口上使用 HTTP 代理
-X/--request <command></command>指定什么命令
-y/--speed-time 放弃限速所要的时间。默认为 30
-Y/--speed-limit 停止传输速度的限制，速度时间'秒
-z/--time-cond 传送时间设置
-0/--http1.0 使用 HTTP 1.0
-1/--tlsv1 使用 TLSv1（SSL）
-2/--sslv2 使用 SSLv2 的（SSL）
-3/--sslv3 使用的 SSLv3（SSL）
--3p-quote like -Q for the source URL for 3rd party transfer
--3p-url 使用 url，进行第三方传送
--3p-user 使用用户名和密码，进行第三方传送
-4/--ipv4 使用 IP4
-6/--ipv6 使用 IP6
-#/--progress-bar 用进度条显示当前的传送状态

## 二、常用 curl 实例

### 1，抓取页面内容到一个文件中

curl -o home.html http://www.codesky.net

### 2，用-O（大写的），后面的 url 要具体到某个文件，不然抓不下来。我们还可以用正则来抓取东西

curl -O http://www.codesky.net/wp-content/uploads/2010/09/compare_varnish.jpg
curl -O http://www.codesky.net/wp-content/uploads/2010/[0-9][0-9]/aaaaa.jpg

### 3，模拟表单信息，模拟登录，保存 cookie 信息

curl -c ./cookie_c.txt -F log=aaaa -F pwd=**\*\*** http://www.codesky.net/wp-login.php

### 4，模拟表单信息，模拟登录，保存头信息

curl -D ./cookie_D.txt -F log=aaaa -F pwd=**\*\*** http://www.codesky.net/wp-login.php
-c(小写)产生的 cookie 和-D 里面的 cookie 是不一样的。

### 5，使用 cookie 文件

curl -b ./cookie_c.txt http://www.codesky.net/wp-admin

### 6，断点续传，-C(大写的)

curl -C -O http://www.codesky.net/wp-content/uploads/2010/09/compare_varnish.jpg

### 7，传送数据,最好用登录页面测试，因为你传值过去后，curl 回抓数据，你可以看到你传值有没有成功

curl -d log=aaaa http://www.codesky.net/wp-login.php

### 8，显示抓取错误

curl -f http://www.codesky.net/asdf

### 9，伪造来源地址，有的网站会判断，请求来源地址。

curl -e http://localhost http://www.codesky.net/wp-login.php

### 10，代理 IP

curl -x 24.10.28.84:32779 http://www.codesky.net

### 11，比较大的东西，我们可以分段下载

curl -r 0-100 -o img.part1 http://www.codesky.net/compare_varnish.jpg
curl -r 100-200 -o img.part2 http://www.codesky.net/compare_varnish.jpg
curl -r 200- -o img.part3 http://www.codesky.net/compare_varnish.jpg
查看：ls |grep part | xargs du -sh
组装：cat img.part\* &gt;img.jpg

### 12，不显示下载进度信息

curl -s -o aaa.jpg http://www.codesky.net/compare_varnish.jpg

### 13，显示下载进度条

curl -# -O http://www.codesky.net/compare_varnish.jpg

### 14，通过 ftp 下载文件

curl -u 用户名:密码 -O http://www.codesky.net/demo/curtain/bbstudy_files/style.css
curl -O ftp://用户名:密码@ip:port/demo/curtain/bbstudy_files/style.css

### 15，通过 ftp 上传

curl -T test.sql ftp://用户名:密码@ip:port/demo/curtain/bbstudy_files/

转自[源码天空](http://www.codesky.net/article/201010/170043.html)
