---
title: 微信 JS-SDK使用权限签名算法
date: 2020-09-21 22:22:22
---

## 获取 access_token

[官方文档](https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Get_access_token.html)

access_token是公众号的全局唯一接口调用凭据，公众号调用各接口时都需使用access_token。开发者需要进行妥善保存。access_token的存储至少要保留512个字符空间。access_token的有效期目前为2个小时，需定时刷新，重复获取将导致上次获取的access_token失效。

* 接口调用请求说明
https请求方式: GET https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET

参数说明

参数 | 是否必须 | 说明
---|---|----
grant_type	| 是 |	获取access_token填写client_credential
appid	| 是 |	第三方用户唯一凭证
secret	| 是 | 第三方用户唯一凭证密钥，即appsecret 

```js
{
  "access_token": "37_3XIsfX3H0-M8cFhrFfR49EKu5t_wih0X28MK906lRky3tXX6QxMG7Napa9rB6beM2N0hcJFeV6PS6PCSvoTC3tB4xwhmsus0qoYqZWtRnRDMTnlgv8qPmqipxFBOuFuJHXJyJ1URa9SJ6tBDMNReABAHIM",
  "expires_in": 7200
}
```

## 获取 jsapi_ticket

用第一步拿到的access_token 采用http GET方式请求获得jsapi_ticket（有效期7200秒，开发者必须在自己的服务全局缓存jsapi_ticket）：
https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi

```js
{
  "errcode": 0,
  "errmsg": "ok",
  "ticket": "HoagFKDcsGMVCIY2vOjf9hnXmHkAZqPV_IVoFARtQo7ncUBqyYxOJV5GxUeVYbPKBRuQWNegvbiUAYJrpgouUQ",
  "expires_in": 7200
}
```

## 签名算法

* 签名生成规则如下：
  - 参与签名的字段包括noncestr（随机字符串）
  - 有效的jsapi_ticket
  - timestamp（时间戳）
  - url（当前网页的URL，不包含#及其后面部分） 

对所有待签名参数按照字段名的ASCII 码从小到大排序（字典序）后，使用URL键值对的格式（即key1=value1&key2=value2…）拼接成字符串string1。这里需要注意的是所有参数名均为小写字符。对string1作sha1加密，字段名和字段值都采用原始值，不进行URL 转义。

即signature=sha1(string1)。 示例：
```md
noncestr=Wm3WZYTPz0wzccnW
jsapi_ticket=sM4AOVdWfPE4DxkXGEs8VMCPGGVi4C3VM0P37wVUCFvkVAy_90u5h9nbSlYy3-Sl-HhTdfl2fzFy1AOcHKP7qg
timestamp=1414587457
url=http://mp.weixin.qq.com?params=value
```
* 步骤1. 对所有待签名参数按照字段名的ASCII 码从小到大排序（字典序）后，使用URL键值对的格式（即key1=value1&key2=value2…）拼接成字符串string1
```md
  jsapi_ticket=sM4AOVdWfPE4DxkXGEs8VMCPGGVi4C3VM0P37wVUCFvkVAy_90u5h9nbSlYy3-Sl-HhTdfl2fzFy1AOcHKP7qg&noncestr=Wm3WZYTPz0wzccnW&timestamp=1414587457&url=http://mp.weixin.qq.com?params=value
```

* 步骤2. 对string1进行sha1签名，得到signature：
[在线工具](https://tool.oschina.net/encrypt?type=2)
```md
  0f9de62fce790f9a083d5c99e95740ceb90c27ed
```

**注意事项**

签名用的noncestr和timestamp必须与wx.config中的nonceStr和timestamp相同。

签名用的url必须是调用JS接口页面的完整URL。

出于安全考虑，开发者必须在服务器端实现签名的逻辑。

如出现invalid signature 等错误详见附录5常见错误及解决办法。
