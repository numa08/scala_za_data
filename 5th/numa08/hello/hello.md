!SLIDE
# JenkisとPlayFramework
<br>
<br>

[@numa08](https://twitter.com/numa08)

!SLIDE

[http://numa08.net](htttp://numa08.net)
<br>
<br>

Playframeworkで動いてます

!SLIDE

更新 →　Githubにpush → 自動デプロイ
<br>
<br>
やりたいよね！！

!SLIDE

# 戦略

 - Jenkinsでビルド（play clean stage)
 - Chefとかでデプロイ

!SLIDE

# さっそく詰まった

Jenkinsでビルドする際になんかエラーが出る！！
<br>
<br>

```
java.io.IOException: No such file or directory
at java.io.UnixFileSystem.createFileExclusively(Native Method)
at java.io.File.createNewFile(File.java:900)
at xsbt.boot.Locks$.apply0(Locks.scala:34)
at xsbt.boot.Locks$.apply(Locks.scala:27)
at scala.collection.mutable.FlatHashTable$class.$init$(Proxy.scala:32)
```

!SLIDE

# playframeworkの注意点


`so don’t install to /opt, /usr/local or anywhere else you’d need special permission to write to.)`
<br>
<br>

「書き込み権限が必要な場所にインストールするなよ！！」

!SLIDE

# 対応策の検討

 - $JENINS_HOME(/var/lib/jenkins)にインストールする
     - 管理とか面倒くさくなりそう感ある
 - /usr/local/etc/playの権限を変える
     - スマートさが足りない
 - プラグインを作って管理する
     - これか？

!SLIDE

# jenkinsのプラグイン事情
 - maven,jdk,antとかの場合
     - インストールとかを自動でやってくれる
     - プロジェクト毎に利用するバージョンを変更できる
<br>
<br>
Playでも同じことできたら便利やね

!SLIDE

# プラグインのプロジェクトを作るよ

- [Plugin Skeleton Generator](http://plugin-generator.jenkins-ci.org/)

# Eclipseのプロジェクトにする

`mvn -DdownloadSources=true -DdownloadJavadocs=true -DoutputDirectory=target/eclipse-classes eclipse:eclipse`

# デバッグ

`mvn hpi:run`

!SLIDE

![](https://pbs.twimg.com/media/BP7wCzcCIAAXiJg.png)

!SLIDE

# コードは読みました・・・

 - [ant-plugin](https://github.com/jenkinsci/ant-plugin)
 - [jenkins/Maven.java](https://github.com/jenkinsci/jenkins/blob/master/core/src/main/java/hudson/tasks/Maven.java)
 - [jenkins/JDKInstaller.java](https://github.com/jenkinsci/jenkins/blob/master/core/src/main/java/hudson/tools/JDKInstaller.java)

!SLIDE

# プラグインの設計

 - 提供されているクラスを継承していくらしい
     - [Extension points](https://wiki.jenkins-ci.org/display/JENKINS/Extension+points)
     - ビルドタスク : hadson.task.Builder
     - ツールのインストール : hudson.tools.ToolInstallation
     - インストーラー : hudson.tools.ToolInstaller

 - 設定項目の定義は`jelly`で書く
     - [Architecture](https://wiki.jenkins-ci.org/display/JENKINS/Architecture)
     - [jelly](http://commons.apache.org/proper/commons-jelly/)
     - 拡張XMLとか、辛み感やばい・・・

