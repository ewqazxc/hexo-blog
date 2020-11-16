---
title: 安卓APP 签名相关
date: 2020-11-16 23:55:50
---
## 一 生成APP 签名

```sh
keytool -genkey -v -keystore ~/key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias key

JDK1.8\bin>keytool -genkey -alias android.key.jks -keyalg RSA -validity 20000 -keystore android.key.jks

keytool -genkey -alias androidAppKey -keyalg RSA -validity 20000 -keystore androidAppKey
keytool -genkey -alias androidAppKey -keyalg RSA -validity 10000 -keystore androidAppKey
```
```sh
输入密钥库口令:
再次输入新口令:
您的名字与姓氏是什么?
  [Unknown]:  XC
您的组织单位名称是什么?
  [Unknown]:  TL
您的组织名称是什么?
  [Unknown]:  TL
您所在的城市或区域名称是什么?
  [Unknown]:  FZ
您所在的省/市/自治区名称是什么?
  [Unknown]:  FZ
该单位的双字母国家/地区代码是什么?
  [Unknown]:  CN
CN=XC, OU=TL, O=TL, L=FZ, ST=FZ, C=CN是否正确?
  [否]:  Y

输入 <android.keystore> 的密钥口令
        (如果和密钥库口令相同, 按回车):
再次输入新口令:
Warning:
JKS 密钥库使用专用格式。建议使用
 "keytool -importkeystore -srckeystore android.keystore -destkeystore android.keystore -deststoretype pkcs12"
 "keytool -importkeystore -srckeystore android.key.jks -destkeystore android.key.jks -deststoretype pkcs12"
 keytool -importkeystore -srckeystore androidAppKey -destkeystore androidAppKey -deststoretype pkcs12
迁移到行业标准格式 PKCS12。
```

---

`keytool -list -v -keystore H:\devTool\SDK\JDK1.8\bin\android.key.jks`

## 二 查看应用签名
https://www.jianshu.com/p/3d21f76a8edd

1. 查看三方应用签名
  在没有keystore文件和密钥的情况下，要想查看我们所需应用的签名信息，就需要借助keytool工具来完成。

  首先解压要查看的apk包，通过数据证书管理工具keytool查看apk的签名信息。具体步骤如下：
  
  - 1 将apk修改后缀为.rar文件后进行解压；
  - 2 进入解压后的META-INF目录，找到该目录下的xxx.RSA文件；
  - 3 通过命令cmd打开DOS窗口，输入命令 ：keytool -printcert -file [RSA文件路径]；

## 三 异常错误处理

### 报错：keystore password was incorrect
keyPassword 与 storePassword 取值一致
```js
    signingConfigs {
        release {
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
            storeFile file(keystoreProperties['storeFile'])
            storePassword keystoreProperties['keyPassword']
        }
    }
```