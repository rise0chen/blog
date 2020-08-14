---
title: JQuery中$.ajax()方法参数详解
date: 2016-04-21
categories: [✫前端, web]
---

ajax() 方法通过 HTTP 请求加载远程数据。
该方法是 jQuery 底层 AJAX 实现。简单易用的高层实现有 $.get, $.post 等。
\$.ajax() 返回其创建的 XMLHttpRequest 对象。

<!--more-->

## 参数详解

大多数情况下你无需直接操作该函数，除非你需要操作不常用的选项，以获得更多的灵活性。
最简单的情况下，$.ajax() 可以不带任何参数直接使用。
注意所有的选项都可以通过 $.ajaxSetup() 函数来全局设置。

### 1.url

要求为 String 类型的参数，（默认为当前页地址）发送请求的地址。

### 2.type

要求为 String 类型的参数，请求方式（post 或 get）默认为 get。注意其他 http 请求方法，例如 put 和 delete 也可以使用，但仅部分浏览器支持。

### 3.timeout

要求为 Number 类型的参数，设置请求超时时间（毫秒）。此设置将覆盖\$.ajaxSetup()方法的全局设置。

### 4.async

要求为 Boolean 类型的参数，默认设置为 true，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其他操作必须等待请求完成才可以执行。

### 5.cache

要求为 Boolean 类型的参数，默认为 true（当 dataType 为 script 时，默认为 false），设置为 false 将不会从浏览器缓存中加载请求信息。

### 6.data

要求为 Object 或 String 类型的参数，发送到服务器的数据。如果已经不是字符串，将自动转换为字符串格式。get 请求中将附加在 url 后。防止这种自动转换，可以查看 processData 选项。对象必须为 key/value 格式，例如{foo1:"bar1",foo2:"bar2"}转换为&foo1=bar1&foo2=bar2。如果是数组，JQuery 将自动为不同值对应同一个名称。例如{foo:["bar1","bar2"]}转换为&foo=bar1&foo=bar2。

### 7.dataType

要求为 String 类型的参数，预期服务器返回的数据类型。如果不指定，JQuery 将自动根据 http 包 mime 信息返回 responseXML 或 responseText，并作为回调函数参数传递。可用的类型如下：
xml：返回 XML 文档，可用 JQuery 处理。
html：返回纯文本 HTML 信息；包含的 script 标签会在插入 DOM 时执行。
script：返回纯文本 JavaScript 代码。不会自动缓存结果。除非设置了 cache 参数。注意在远程请求时（不在同一个域下），所有 post 请求都将转为 get 请求。
json：返回 JSON 数据。
jsonp：JSONP 格式。使用 SONP 形式调用函数时，例如 myurl?callback=?，JQuery 将自动替换后一个“?”为正确的函数名，以执行回调函数。
text：返回纯文本字符串。

### 8.beforeSend

要求为 Function 类型的参数，发送请求前可以修改 XMLHttpRequest 对象的函数，例如添加自定义 HTTP 头。在 beforeSend 中如果返回 false 可以取消本次 ajax 请求。XMLHttpRequest 对象是惟一的参数。

```javascript
function(XMLHttpRequest){
  this;   //调用本次ajax请求时传递的options参数
}
```

### 9.complete

要求为 Function 类型的参数，请求完成后调用的回调函数（请求成功或失败时均调用）。参数：XMLHttpRequest 对象和一个描述成功请求类型的字符串。

```javascript
function(XMLHttpRequest, textStatus){
  this;    //调用本次ajax请求时传递的options参数
}
```

### 10.success

要求为 Function 类型的参数，请求成功后调用的回调函数，有两个参数。
(1)由服务器返回，并根据 dataType 参数进行处理后的数据。
(2)描述状态的字符串。

```javascript
function(data, textStatus){
  //data可能是xmlDoc、jsonObj、html、text等等
  this;  //调用本次ajax请求时传递的options参数
}
```

### 11.error

要求为 Function 类型的参数，请求失败时被调用的函数。该函数有 3 个参数，即 XMLHttpRequest 对象、错误信息、捕获的错误对象(可选)。ajax 事件函数如下：

```javascript
function(XMLHttpRequest, textStatus, errorThrown){
  //通常情况下textStatus和errorThrown只有其中一个包含信息
  this;   //调用本次ajax请求时传递的options参数
}
```

### 12.contentType

要求为 String 类型的参数，当发送信息至服务器时，内容编码类型默认为"application/x-www-form-urlencoded"。该默认值适合大多数应用场合。

### 13.dataFilter

要求为 Function 类型的参数，给 Ajax 返回的原始数据进行预处理的函数。提供 data 和 type 两个参数。data 是 Ajax 返回的原始数据，type 是调用 jQuery.ajax 时提供的 dataType 参数。函数返回的值将由 jQuery 进一步处理。

```javascript
function(data, type){
  //返回处理后的数据
  return data;
}
```

### 14.dataFilter

要求为 Function 类型的参数，给 Ajax 返回的原始数据进行预处理的函数。提供 data 和 type 两个参数。data 是 Ajax 返回的原始数据，type 是调用 jQuery.ajax 时提供的 dataType 参数。函数返回的值将由 jQuery 进一步处理。

```javascript
function(data, type){
  //返回处理后的数据
  return data;
}
```

### 15.global

要求为 Boolean 类型的参数，默认为 true。表示是否触发全局 ajax 事件。设置为 false 将不会触发全局 ajax 事件，ajaxStart 或 ajaxStop 可用于控制各种 ajax 事件。

### 16.ifModified

要求为 Boolean 类型的参数，默认为 false。仅在服务器数据改变时获取新数据。服务器数据改变判断的依据是 Last-Modified 头信息。默认值是 false，即忽略头信息。

### 17.jsonp

要求为 String 类型的参数，在一个 jsonp 请求中重写回调函数的名字。该值用来替代在"callback=?"这种 GET 或 POST 请求中 URL 参数里的"callback"部分，例如{jsonp:'onJsonPLoad'}会导致将"onJsonPLoad=?"传给服务器。

### 18.username

要求为 String 类型的参数，用于响应 HTTP 访问认证请求的用户名。

### 19.password

要求为 String 类型的参数，用于响应 HTTP 访问认证请求的密码。

### 20.processData

要求为 Boolean 类型的参数，默认为 true。默认情况下，发送的数据将被转换为对象（从技术角度来讲并非字符串）以配合默认内容类型"application/x-www-form-urlencoded"。如果要发送 DOM 树信息或者其他不希望转换的信息，请设置为 false。

### 21.scriptCharset

要求为 String 类型的参数，只有当请求时 dataType 为"jsonp"或者"script"，并且 type 是 GET 时才会用于强制修改字符集(charset)。通常在本地和远程的内容编码不同时使用。

## 顺便说一下\$.each()函数:

\$.each()函数不同于 JQuery 对象的 each()方法，它是一个全局函数，不操作 JQuery 对象，而是以一个数组或者对象作为第 1 个参数，以一个回调函数作为第 2 个参数。回调函数拥有两个参数：第 1 个为对象的成员或数组的索引，第 2 个为对应变量或内容。
