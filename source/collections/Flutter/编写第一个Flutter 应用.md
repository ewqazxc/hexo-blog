---
title: 编写第一个Flutter 引用
date: 2020-11-16 23:50:50
---

## 编写第一个 Flutter 引用

1. 运行`Flutter: New Project`，创建一个 flutter 项目,将`lib/main.dart.`替换为以下内容

```dart
import 'package:flutter/material.dart';

void main() => runApp(new MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Welcome to Flutter',
      home: new Scaffold(
        appBar: new AppBar(
          title: new Text('Welcome to Flutter'),
        ),
        body: new Center(
          child: new Text('Hello World ~'),
        ),
      ),
    );
  }
}

```

2. 使用外部包 package

- 在`pubspec.yaml`中，将`english_words: ^3.1.5`，添加到依赖列表，并更新依赖
- 在 `lib/main.dart` 中, 引入 `english_words`

```dart
import 'package:english_words/english_words.dart';
```

- 使用随机方法生成文字

```dart
final wordPair = new WordPair.random();
    return new MaterialApp(
      title: 'Welcome to Flutter',
      home: new Scaffold(
        appBar: new AppBar(
          title: new Text('Welcome to Flutter'),
        ),
        body: new Center(
          //child: new Text('Hello World'),
          child: new Text(wordPair.asPascalCase),
        ),
      ),
```

3. 添加一个有状态的组件
```dart
class RandomWordsState extends State<RandomWords> {
  @override
  Widget build(BuildContext context) {
    final worldPair = new WordPair.random();
    return new Text(worldPair.asPascalCase);
  }
}

class RandomWords extends StatefulWidget {
  @override
  createState() => new RandomWordsState();
}
```

4. 无限下拉列表
```dart
import 'package:flutter/material.dart';
import 'package:english_words/english_words.dart';

class RandomWordListState extends State<RandomWordList> {
  final _suggestions = <WordPair>[];
  final _biggerFont = const TextStyle(fontSize: 18.0);
  Widget _buildRow(WordPair pair) {
    return new ListTile(
      title: new Text(
        pair.asPascalCase,
        style: _biggerFont,
      ),
    );
  }

  Widget _buildSuggestions() {
    return new ListView.builder(
        padding: const EdgeInsets.all(16.0),
        // 对于每个建议的单词对都会调用一次itemBuilder，然后将单词对添加到ListTile行中
        // 在偶数行，该函数会为单词对添加一个ListTile row.
        // 在奇数行，该函数会添加一个分割线widget，来分隔相邻的词对。
        // 注意，在小屏幕上，分割线看起来可能比较吃力。
        itemBuilder: (context, i) {
          // 在每一列之前，添加一个1像素高的分隔线widget
          if (i.isOdd) return new Divider();

          // 语法 "i ~/ 2" 表示i除以2，但返回值是整形（向下取整），比如i为：1, 2, 3, 4, 5
          // 时，结果为0, 1, 1, 2, 2， 这可以计算出ListView中减去分隔线后的实际单词对数量
          final index = i ~/ 2;
          // 如果是建议列表中最后一个单词对
          if (index >= _suggestions.length) {
            // ...接着再生成10个单词对，然后添加到建议列表
            _suggestions.addAll(generateWordPairs().take(10));
          }
          return _buildRow(_suggestions[index]);
        });
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      // appBar: new AppBar(
      //   title: new Text('Startup Name Generator'),
      // ),
      body: _buildSuggestions(),
    );
  }
}

class RandomWordList extends StatefulWidget {
  @override
  createState() => new RandomWordListState();
}

```

5. 添加交互

6. 导航到新页面

在Flutter中，导航器管理应用程序的路由栈。将路由推入（push）到导航器的栈中，将会显示更新为该路由页面。 从导航器的栈中弹出（pop）路由，将显示返回到前一个路由。

https://flutterchina.club/get-started/codelab/