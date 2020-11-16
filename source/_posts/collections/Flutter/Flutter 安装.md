---
title: Flutter 安装
date: 2020-11-16 23:45:50
---
## 一 安装 Flutter

1. 获取 Flutter SDK
   [官网下载](https://flutter.dev/docs/development/tools/sdk/releases#windows)
   [GitHub 下载](https://github.com/flutter/flutter/releases)

2. 更新环境变量

要在终端运行 flutter 命令， 需要添加以下环境变量到系统 PATH：

- 转到 “控制面板>用户帐户>用户帐户>更改我的环境变量”
- 在“用户变量”下检查是否有名为“Path”的条目:
  - 如果该条目存在, 追加 flutter\bin 的全路径，使用 ; 作为分隔符.
  - 如果条目不存在, 创建一个新用户变量 Path ，然后将 flutter\bin 的全路径作为它的值.
- 在“用户变量”下检查是否有名为”PUB_HOSTED_URL”和”FLUTTER_STORAGE_BASE_URL”的条目，如果没有，也添加它们。

```国内镜像
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
```

## 二 使用`flutter doctor` 检测依赖是否完整

* 环境变量需要 JDK、git

### Flutter Unable to locate Android SDK.

- 添加环境变量：ANDROID_HOME H:\devTool\AndroidSDK

### Android licenses not accepted.

- To resolve this, run: flutter doctor --android-licenses.
  Accept? (y/N): y
  All SDK package licenses accepted

### Flutter plugin not installed;

- 安装 Flutter 插件
  - 打开 Android Studio，直接进入设置界面 ，然后在 Preferences 的插件中搜索 Flutter
  - 点击安装 Flutter 插件，记得最后一定要重启 IDE。
  - 再次 flutter doctor 检测就会发现这个问题已经解决了。

### Dart plugin not installed

- 安装 Dart 插件

### Enable VT-x in your BIOS security setting (refer to documention for your computer)

- 重启的你的电脑,进入到 BIOS 中
- 选择 Config －－cpu －－ Intel－Virtualization Technology 将这个选项开启
- 然后执行虚拟机 就没有问题了

## 三 编译器配置

[Android Studio / VS Code](https://flutterchina.club/get-started/editor/)

## 四 体验 flutter

### vscode

1. 运行`Flutter: New Project`，创建一个 flutter 项目，其中包含一个使用[Material 组件](https://material.io/guidelines/)的简单的演示应用程序
   `在项目目录中，您的应用程序的代码位于 lib/main.dart.`

2. 按 F5 键或调用 Debug>Start Debugging，运行应用程序
3. 修改`lib/main.dart`文件，保存看热重载效果

#### Could not resolve the package ‘characters‘ in ‘package:characters/characters.dart‘.

- `flutter clean`

#### 卡在 Running Gradle task 'assembleDebug'.

- 修改项目中 android/build.gradle 文件
- 修改 Flutter 的配置文件, 该文件在 Flutter 安装目录/packages/flutter_tools/gradle/flutter.gradle

```gradle
buildscript {
    repositories {
        // maven { url 'https://maven.aliyun.com/repository/public/' }
        maven { url 'https://maven.aliyun.com/repository/google' }
        maven { url 'https://maven.aliyun.com/repository/public' }
        maven { url  'https://maven.aliyun.com/repository/gradle-plugin' }
        // google()
        // jcenter()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:3.5.0'
    }
}
```
