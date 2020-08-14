---
title: OpenVPN安装与配置
date: 2017-08-13
categories: [✮工具, 代理]
---

OpenVPN 可用于翻墙、免流。
（大部分地区已经被封，无法实现免流）

<!--more-->

## 安装 OpenVPN

```bash
sudo apt-get install openvpn #安装
openvpn --version #查看OpenVPN版本
```

## 制作证书

### 制作 CA 证书

```bash
sudo cp -R /usr/share/doc/openvpn/examples/easy-rsa/2.0  /etc/openvpn/easy-rsa
sudo vi /etc/openvpn/easy-rsa/vars
```

```apacheconf vars
export KEY_COUNTRY=”CN”
export KEY_PROVINCE=”SH”
export KEY_CITY=”Shanghai”
export KEY_ORG=”Random”
export KEY_EMAIL=”me@host.cn”
export KEY_OU=”Rise”
export KEY_NAME=”server”
```

```bash
sudo su
cd /etc/openvpn/easy-rsa/
source vars
./clean-all  #删除keys文件夹
./build-ca
cp keys/ca.crt /etc/openvpn/
```

### 制作 Server 端证书

```bash
./build-key-server server
./build-dh
cp keys/server.crt keys/server.key keys/dh1024.pem /etc/openvpn/
```

### 制作 Client 端证书

```bash
./build-key client
```

## 配置 Server 端

```bash
cp /usr/share/doc/openvpn/examples/sample-config-files/server.conf.gz /etc/openvpn/
cd /etc/openvpn/
gzip -d server.conf.gz
vi /etc/openvpn/server.conf
```

```apacheconf server.conf
port 1194
proto tcp
dev tun
ca ca.crt
cert server.crt
key server.key
dh dh1024.pem
server 10.8.0.0 255.255.255.0
ifconfig-pool-persist ipp.txt
push "redirect-gateway def1 bypass-dhcp"
push "dhcp-option DNS 114.114.114.114"
push "dhcp-option DNS 114.114.115.115"
duplicate-cn
keepalive 10 120
comp-lzo
user nobody
group nogroup
persist-key
persist-tun
status openvpn-status.log
verb 3
```

```bash
iptables -t nat -A POSTROUTING -s 10.8.0.0/24 -o eth0 -j MASQUERADE  #eth0根据你的网卡修改
echo net.ipv4.ip_forward = 1 >> /etc/sysctl.conf
service openvpn start #启动VPN
```

## 配置 Client 端

利用 SFTP 等各种方法复制这三个文件到本地电脑中.
`/etc/openvpn/easy-rsa/keys/ca.crt`
`/etc/openvpn/easy-rsa/keys/client.crt`
`/etc/openvpn/easy-rsa/keys/client.key`
用记事本分别打开这三个文件，同时新建一个 client.ovpn，内容如下。

```apacheconf client.ovpn
client
dev tun
proto tcp
resolv-retry infinite
nobind
persist-key
persist-tun
ns-cert-type server
comp-lzo
verb 3

remote 服务器IP 1194

<ca>
ca.crt的内容复制到这里
</ca>
<cert>
client.crt的内容复制到这里
</cert>
<key>
client.key的内容复制到这里
</key>

########免流代码########
http-proxy-retry
http-proxy 10.0.0.172 80
http-proxy-option EXT1 "GET http://wap.10010.com"
http-proxy-option EXT1 "POST http://wap.10010.com"
http-proxy-option EXT1 "X-Online-Host: wap.10010.com"
http-proxy-option EXT1 "Host: wap.10010.com"
########免流代码########
```

其中需要修改服务器 IP 为自己的服务器 IP，ca、cert、key 的内容需要按上面那三个文件的内容完整的复制进去。免流代码每个地区每个运营商都不尽相同，需要自己不断尝试，找到最适合自己地区的那个。
下面是一些常用的免流代码。

```
#联通
http-proxy-retry
http-proxy 10.0.0.172 80
http-proxy-option EXT1 "X-Online-Host: wap.10010.com"
http-proxy-option EXT2 "Host: wap.10010.com"

#电信
http-proxy-retry
http-proxy 10.0.0.200 80
http-proxy-option EXT1 "X-Online-Host: ltetp.tv189.com"
http-proxy-option EXT2 "Host: ltetp.tv189.com"

#移动-默认
http-proxy-retry
http-proxy 10.0.0.172 80
http-proxy-option EXT1 "POST http://rd.go.10086.cn"
http-proxy-option EXT1 "GET http://rd.go.10086.cn"
http-proxy-option EXT1 "X-Online-Host: rd.go.10086.cn"
http-proxy-option EXT1 "Host: rd.go.10086.cn"

#移动-彩信
http-proxy-retry
http-proxy 10.0.0.172 80
http-proxy-option EXT1 "POST http://mmsc.monternet.com"
http-proxy-option EXT1 "GET http://mmsc.monternet.com"
http-proxy-option EXT1 "X-Online-Host: mmsc.monternet.com"
http-proxy-option EXT1 "CMCC: mmsc.monternet.com"
```

## 使用

最后，你需要在你的手机上下载安装 OpenVPN 的 Android 版或者 iOS 版(需要美区 AppleID)，然后将这个 client.ovpn 导入到手机中，并用 OpenVPN 打开，然后连接就 OK 了。
