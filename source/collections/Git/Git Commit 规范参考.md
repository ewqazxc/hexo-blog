---
title: Git Commit 规范参考
date: 2020-09-10
---

## 规范 Commit 的好处

1. 提供更明确的历史信息，方便判断提交目的和浏览
2. 可以过滤某些不必要的提交，方便快速查找信息
3. 自动化生产Changelog
4. 向同事、公众与其它利益关系人传达变化的性质
5. 基于提交的类型，自动决定语义化的版本变更

* 每一个提交尽量保证其目的单一性

## Commit 格式

### 网上常用格式参考
1. [react-commit](https://github.com/facebook/react/commits/master)
2. [vuejs-commit](https://github.com/vuejs/vue/commits/dev)
3. [angular-commit](https://github.com/angular/angular/commits/master)

### [Angular 规范](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits)

每个commit message 包含一个 `header`,`body` 和`footer`。
`header` 有一个特殊的格式，包含`type`，`scope` 和`subject`
```bash
  <type>(<scope>): <subject>
  <BLANK LINE>
  <body>
  <BLANK LINE>
  <footer>
```

* Type 用于说明commit 的类型：
  * feat  新的功能
  * fix  修复bug
  * docs  只是文档的更改
  * style 不影响代码含义的更改（例如空格、格式化）
  * refactor  既不是修复bug 也不是添加新功能的代码更改
  * perf  提高性能的代码更改
  * test  添加或修正测试
  * chore  对构建或者辅助工具的更改，例如生成文档

* Scope 用于说明commit 影响的范围，当影响的范围有多个时候，可以使用`*`

* Subject 用于对commit 变化的间接描述：
  * 使用祈使句，一般以动词原形开始，例如使用change 而不是changed 或者changes
  * 第一个字母小写
  * 结尾不加句号（.）

* Body 用于对commit 详细描述，使用祈使句，一般以动词原形开始，包含这次行为的动机以及与之前行为的对比

* Footer 有以下两种情况
  1. 不兼容的变动：
  所有不兼容的变动都必须在footer 区域进行说明，以`BREAKING CHANGE:`开头，后面是对变动的描述，变动的理由和迁移注释
  ```bash
      BREAKING CHANGE: isolate scope bindings definition has changed and
      the inject option for the directive controller injection was removed.

      To migrate the code follow the example below:

      Before:

      scope: {
        myAttr: 'attribute',
        myBind: 'bind',
        myExpression: 'expression',
        myEval: 'evaluate',
        myAccessor: 'accessor'
      }

      After:

      scope: {
        myAttr: '@',
        myBind: '@',
        myExpression: '&',
        // myEval - usually not useful, but in cases where the expression is assignable, you can use '='
        myAccessor: '=' // in directive's template change myAccessor() to myAccessor
      }

      The removed `inject` wasn't generaly useful for directives so there should be no code using it.
  ```
  2. 关闭issue 针对某个issue的提交
  ```bash
    # 关闭单个
    Close #234
    # 关闭多个
    Close #123,#456,#789
  ```

  * Revert 如果commit 用于撤销之前的commit，则以`revert:`开头，后面是撤销这个commit 的header。在body 里写`This reverts commit <hash>`
  ```bash
    revert: feat(pencil): add 'graphiteWidth' option

    This reverts commit 667ecc1654a317a13331b17617d973392f415f02.
  ```

## Commit 相关的工具
### 填写提示工具 [commitizen](https://github.com/commitizen/cz-cli)

这是个用来给commit 一个引导的作用，根据提示完善commit

### 格式校验工具 [commitlint](https://github.com/marionebl/commitlint)

```bash
  yarn add @commitlint/{config-conventional,cli} --dev
  # Configure commitlint to use angular config
  echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
```
示例使用的是 `config-coventional`规范，安装后还需要使用`commitmsg hook`,husky
```bash
  yarn add husky
```
然后配置package.json
```json
  {
    "husky": {
      "hooks": {
        "pre-commit": "npm test",
        "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
      }
    }
  }
```

### 生成Changelog 工具 [Conventional Changelog](https://github.com/conventional-changelog)

使用的工具是 Conventional Changelog，推荐使用 standard-version。commit 符合 Conventional Commits Specification 中描述的格式，就可以用程序自动生成 Changelog。

安装
```sh
  yarn add standard-version --dev
```
然后配置package.json配置执行的脚本。
```json
  {
    "scripts": {
      "release": "standard-version"
    }
  }
```
执行该脚本命令，产生的结果：生成文件 CHANGELOG、自动修改库的版本号、产生一个 commit,
每一次执行，不会覆盖之前的 CHANGELOG，只会在 CHANGELOG 的顶部添加新的内容。
