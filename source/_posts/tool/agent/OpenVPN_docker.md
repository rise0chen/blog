---
title: 使用docker安装OpenVPN
date: 2018-08-14
categories: [✮工具, 代理]
---

使用 docker 可以十分方便地安装 OpenVPN。

<!--more-->

操作步骤如下：

```bash
docker pull kylemanna/openvpn
OVPN_DATA="/root/ovpn-data"
IP="123.123.123.123"
mkdir ${OVPN_DATA}
docker run -v ${OVPN_DATA}:/etc/openvpn --rm kylemanna/openvpn ovpn_genconfig -u tcp://${IP}
docker run -v ${OVPN_DATA}:/etc/openvpn --rm -it kylemanna/openvpn ovpn_initpki
docker run -v ${OVPN_DATA}:/etc/openvpn --rm -it kylemanna/openvpn easyrsa build-client-full CLIENTNAME nopass
docker run -v ${OVPN_DATA}:/etc/openvpn --rm kylemanna/openvpn ovpn_getclient CLIENTNAME > ${OVPN_DATA}/CLIENTNAME.ovpn
docker run --name openvpn -v ${OVPN_DATA}:/etc/openvpn -d -p 1194:1194 --privileged kylemanna/openvpn
```

将/root/ovpn-data 中的 CLIENTNAME.ovpn 文件 下载到本地，利用 OpenVPN GUI 连接即可。

执行结果如下所示：

```bash
// 第一步
docker pull kylemanna/openvpn

OVPN_DATA="/root/ovpn-data"
// 下面的全局变量换成你的服务器的外网ip
IP="xxx.xxx.xxx.xxx"
mkdir ${OVPN_DATA}

// 第二步
docker run -v ${OVPN_DATA}:/etc/openvpn --rm kylemanna/openvpn ovpn_genconfig -u tcp://${IP}

// 第三步
docker run -v ${OVPN_DATA}:/etc/openvpn --rm -it kylemanna/openvpn ovpn_initpki

// ---------------------------------------------------------
Enter PEM pass phrase: 输入123456（你是看不见的）
Verifying - Enter PEM pass phrase: 输入123456（你是看不见的）
Common Name (eg: your user, host, or server name) [Easy-RSA CA]:回车一下
Enter pass phrase for /etc/openvpn/pki/private/ca.key:输入123456
// ---------------------------------------------------------

// 第五步
docker run -v ${OVPN_DATA}:/etc/openvpn --rm -it kylemanna/openvpn easyrsa build-client-full CLIENTNAME nopass

// ---------------------------------------------------------
Enter pass phrase for /etc/openvpn/pki/private/ca.key:输入123456
// ---------------------------------------------------------

// 第六步
docker run -v ${OVPN_DATA}:/etc/openvpn --rm kylemanna/openvpn ovpn_getclient CLIENTNAME > ${OVPN_DATA}/CLIENTNAME.ovpn

// 第七步
docker run --name openvpn -v ${OVPN_DATA}:/etc/openvpn -d -p 1194:1194 --privileged kylemanna/openvpn
```

## 相关链接

[五分钟利用 docker 搭建好 openvpn 服务环境](https://blog.csdn.net/technofiend/article/details/52452572)  
[Docker Compose—简化复杂应用的利器](http://debugo.com/docker-compose/)
