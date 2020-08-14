---
title: 十分钟迅速搭建 OAuth 2.0 授权服务
date: 2019-08-10
categories: [✬后端]
---

## 前言

随着互联网技术的兴起，OAuth 2.0 授权协议的应用已经越来越广泛。腾讯、阿里、百度、华为、小米等绝大多数互联网公司都在使用 OAuth 2.0 授权协议。  
我们或多或少也都接触过 OAuth 2.0 授权协议，比如通过微信、QQ、支付宝、钉钉等开放平台实现免密登录。

<!--more-->

然而，在对接免密登录时，我们充当 OAuth 2.0 授权协议客户端的角色，即使用别人的用户系统。接下来，我将带领大家十分钟迅速搭建 OAuth 2.0 授权服务，搭建属于自己的用户系统。  
那么搭建这个 OAuth 2.0 授权服务有什么作用呢？

1. 在与天猫精灵、小爱同学等物联网产品对接时，需要使用 OAuth 2.0 授权协议进行用户对接。
1. 能够统一公司内部多个项目的用户系统，可以实现单点登录（SSO）。
1. 能够授权其他公司或其他部门使用自己项目的用户数据。

当然，它的用处也不仅限于以上几点，它有着更多的潜力等着我们去挖掘。

## 开发指南

关于介绍 OAuth 的废话在这里就不多说，我们直接开始搭建 OAuth 2.0 授权服务，本项目的源代码已上传到[https://gitee.com/rise0chen/oauth.git](https://gitee.com/rise0chen/oauth.git)，大家可直接下载使用。

### 安装 Node.js

Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。Node.js 的流行程度非常高，网上已有大量关于它的介绍，详情可参考[安装/卸载 Node.js](http://blog.crise.cn/categories/linux/9010.html)。  
只要保证 Node.js 版本在 8.0 以上即可。

### 安装 Egg.js 运行环境

Egg.js 是一款基于 Node.js 运行的 MVC 框架，其生态建设良好，有大量的插件可以使用，可以大大缩减开发时间、提高开发效率。  
我们可以通过以下指令使用脚手架快速生成 Egg.js 项目，详情可参考[Egg.js 官方手册](https://eggjs.org/zh-cn/intro/quickstart.html)。

```bash
npm init egg --type=simple
npm install
```

### 安装 egg-oauth2-server 插件

`egg-oauth2-server`是一款基于`oauth2-server`软件包的 Egg.js 插件。有了这款插件，就可以轻松地在 Egg.js 上使用`oauth2-server`软件包。

首先，使用 npm 安装`egg-oauth2-server`插件的软件包。

```bash
npm install egg-oauth2-server --save
```

然后，根据[Egg.js 官方手册](https://eggjs.org/zh-cn/basics/plugin.html)开启并配置`egg-oauth2-server`插件即可。
开启插件，需要修改项目插件配置文件`config/plugin.js`。

```js
exports.oAuth2Server = {
  enable: true,
  package: 'egg-oauth2-server',
};
```

配置插件，需要修改项目插件配置文件`config/config.default.js`。

```js
exports.oAuth2Server = {
  grants: ['password', 'authorization_code'],
  accessTokenLifetime: 72 * 60 * 60,
};
```

### 定义路由规则

在`app/router.js`文件中修改全局的路由规则，如下所示。

```js
module.exports = (app) => {
  const { router, oAuth2Server: oauth } = app;

  router.get('/', 'home.index');
  router.get('/callback', 'home.callback');

  router.all('/oauth/authorize', oauth.authorize());
  router.all('/oauth/token', oauth.token());

  router.all('/oauth/user', oauth.authenticate(), 'oauth.user');
};
```

以上路由规则中，`/oauth/authorize`用于获取授权码；`/callback`用于接收授权码；`/oauth/token`用于获取 AccessToken；`/oauth/user`用于授权成功后获取用户信息。

### 定义模型

在`app/extend/`目录中，新建`oauth.js`文件，用于配置 oauth2-server 模型。  
**注意：** 这里是搭建 OAuth 2.0 授权服务的重中之重，几乎所有业务逻辑都将定义在这里。  
为了实现`授权码授权模式`和`密码凭证授权模式`，我们必须要完成`getClient`、`getUser`、`saveAuthorizationCode`、`getAuthorizationCode`、`revokeAuthorizationCode`、`saveToken`、`getAccessToken`共 7 个模型。如果要完善其他模型，可参考[模型说明书](https://oauth2-server.readthedocs.io/en/latest/model/spec.html)

#### getClient

用于校验客户端信息，即校验 OAuth 服务的接入方的信息。  
`Client Id`和`Client Secret`主要有 2 中添加方式。

1. 开发者在开放平台中生成的。本方式需要建立开放平台，成本较高。腾讯、淘宝等第三方登录平台就是使用的本方式。
2. 手动添加。本方式成本较低，只需要 OAuth 服务提供方在数据库中手动添加即可。下图中接入天猫精灵就是使用的本方法。

![天猫精灵OAuth配置](http://pvr87pf73.bkt.clouddn.com/aliOAuth.png)

方便起见，我没有搭建数据库，只是把 Client 信息保存在了 json 文件中。`getClient`的示例代码如下：

```js
async getClient(clientId, clientSecret) {
  const clients = require('../data/db_client.json');
  let client = null;
  // 根据clientId获取客户信息
  clients.forEach(e => {
    if (e.clientId === clientId) {
      client = e;
      return;
    }
  });

  if (!client) {
    return false;
  }
  // 校验客户密钥
  if (clientSecret && clientSecret !== client.clientSecret) {
    return false;
  }
  return client;
}
```

#### getUser

用于校验用户的账号密码，判断账号密码是否一致。  
同样，由于没有搭建数据库，把 User 信息保存在了 json 文件中。`getUser`的示例代码如下：

```js

async getUser(username, password) {
  const users = require('../data/db_user.json');
  let user;
  // 根据username获取用户信息
  users.forEach(e => {
    if (e.name === username) {
      user = e;
      return;
    }
  });

  if (!user) {
    return false;
  }
  if (user.password !== password) {
    return false;
  }
  return { userId: user.id };
}
```

#### saveAuthorizationCode 、getAuthorizationCode 、revokeAuthorizationCode

这 3 个函数负责 code 的保存、查询与删除。只有在`授权码授权模式`下才会用到。  
方便起见，我将 code 信息保存在了变量`cache`中，在生产环境中应当保存在 redis 等缓存服务中。示例代码如下：

```js
async saveAuthorizationCode(code, client, user) {
  const _code = { ...code, client, user };
  cache['authCode-' + code.authorizationCode] = _code;
  return _code;
}
async getAuthorizationCode(authorizationCode) {
  const _code = cache['authCode-' + authorizationCode];
  if (!_code) return false;

  _code.expiresAt = new Date(_code.expiresAt);
  return _code;
}
async revokeAuthorizationCode(code) {
  delete cache['authCode-' + code.authorizationCode];
  return true;
}
```

#### saveToken、getAccessToken

用于保存、查询 Token。
方便起见，我将 token 信息保存在了变量`cache`中，在生产环境中应当保存在 redis 等缓存服务中。示例代码如下：

```js
async saveToken(token, client, user) {
  const _token = { ...token, client, user };

  cache['bearerToken-' + token.accessToken] = _token;
  cache['refreshToken-' + token.refreshToken] = _token;
  return _token;
}
async getAccessToken(bearerToken) {
  const _token = cache['bearerToken-' + bearerToken];
  if (!_token) return false;

  _token.accessTokenExpiresAt = new Date(_token.accessTokenExpiresAt);
  _token.refreshTokenExpiresAt = new Date(_token.refreshTokenExpiresAt);
  return _token;
}
```

## 运行测试

### 运行服务

至此，开发环境与代码已经完成，我们可以运行 OAuth2.0 授权服务了。
在命令行中输入`npm run dev`即可开始运行了，如下图所示。
![运行OAuth2.0服务](http://pvr87pf73.bkt.clouddn.com/run.png)

### 接口测试

我使用 Postman 进行接口测试，大家可下载[测试文件](http://pvr87pf73.bkt.clouddn.com/testOauth.postman_collection.json)并导入到 Postman 中自行测试。

#### 授权码授权模式获取 AccessToken

需要先访问`oauth/authorize`获取授权码，再访问`oauth/token`使用授权码获取 AccessToken。
![1. 获取授权码](http://pvr87pf73.bkt.clouddn.com/code_getcode.png)
![2. 获取AccessToken](http://pvr87pf73.bkt.clouddn.com/code_gettoken.png)

#### 密码凭证授权模式获取 AccessToken

`密码凭证授权模式`相对而言较为简单，直接在访问`oauth/token`时使用账号密码即可获取 AccessToken。
![获取AccessToken](http://pvr87pf73.bkt.clouddn.com/password_gettoken.png)

#### 使用 AccessToken 获取用户信息

在 `Headers` 中加入 AccessToken 信息，即可获取当前的用户信息。
![获取用户信息](http://pvr87pf73.bkt.clouddn.com/getUser.png)

## 参考文献

[天猫精灵接入授权方式](https://doc-bot.tmall.com/docs/doc.htm?spm=0.7629140.0.0.45441780nUOrob&treeId=393&articleId=106999&docType=1)  
[小米 IOT 云云对接指南](https://iot.mi.com/new/guide.html?file=07-%E4%BA%91%E5%AF%B9%E4%BA%91%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97/01-%E6%99%BA%E8%83%BD%E7%A1%AC%E4%BB%B6%E4%BA%91%E5%AF%B9%E4%BA%91%E6%8E%A5%E5%85%A5/01-%E7%AC%AC%E4%B8%89%E6%96%B9%E8%AE%BE%E5%A4%87%E4%BA%91OAUTH)  
[Egg.js 开发指南](https://eggjs.org/zh-cn/intro/quickstart.html)  
[egg-oauth2-server 使用文档](https://npmjs.org/package/egg-oauth2-server)  
[egg-oauth2-server 旧版使用教程](https://cnodejs.org/topic/592b2aedba8670562a40f60b)  
[oauth2-server 使用手册](https://oauth2-server.readthedocs.io/en/latest/model/spec.html?highlight=revokeAuthorizationCode#revokeauthorizationcode-code-callback)
