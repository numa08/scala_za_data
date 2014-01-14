!SLIDE

# #新宿Scala座'14年 １月号

!SLIDE

## 自己紹介

 - [@numa08](http://numa08.net)
 - 仕事でScala使ってないマン
 - でじこちゃんかわいいガチ勢

!SLIDE

今年も

よろしくお願い

しまScala

!SLIDE

## やったこと

 - [conscript](https://github.com/n8han/conscript)でツール作った
     - `implicit-class`を今更使った
     - DSLなことをやってみた
 - [scaloid](https://github.com/pocorall/scaloid)を使ってみた

!SLIDE

## Conscriptとは？

 - [conscriptとは?](http://mironal.github.io/slides/2013-10-19/scala/index.html#15)
 - conscript-pluginとしてツールを作れる！

!SLIDE

## 作ったもの

 - [halley](https://github.com/numa08/halley)
 - 某海外のロダからエッチな画像を取ってくる物

!SLIDE

## 作った動機は不純なので省略

!SLIDE

## 使い方
 

```scala
new urls {
    add("URL(例：http://g.e-hentai.org/g/344872/6533c3fb52/")
    add("複数記入することもできる")
    // //から始まる行はコメントだ
}
```


 - 上記内容の`Halleyfile`を作る
 - `hally`コマンドを実行
 - 待つ

!SLIDE

## conscript-plugin


```
$ g8 n8han/conscript
# answer questions
$ cd my-app
$ sbt
> update
```



!SLIDE

## `src/main/conscript/[app]/launchconfig`に色々と書く


```bash
[app]
  version: 0.1.0
  org: net.numa08
  name: halley
  class: net.numa08.Halley #エントリポイント	
[scala]
  version: 2.10.3
[repositories]
  local #バイナリのあるリポジトリ
```


!SLIDE

## 気になったところ

 - テストコードはテンプレートに含まれない
     - 自分で付けたそう
     - g8テンプレート作ってもいいかも？
 - Mavenリポジトリが必要
     - Maven Centralとか
     - オレオレMaveリポジトリもOk？
     - ローカルでも可

!SLIDE

## DSLやった

 - ドメイン特化型言語
 - 設定ファイル書くのに便利
 - そのままオブジェクトになってくれる

!SLIDE

## DSLやった

 - [twitter/uti](https://github.com/twitter/util)
     - [Eval](https://github.com/twitter/util#eval)
     - Scalaファイルを実行して、値を返してくれる


```scala
val code = Source.fromFile(file)
	 .mkString("import net.numa08.urls\n", "", "")
val config = Eval[urls](code)				 
```


!SLIDE

## 詰まったところ

<blockquote class="twitter-tweet" data-cards="hidden" lang="ja"><p><a href="https://t.co/slFOKV6WZj">https://t.co/slFOKV6WZj</a> twiterのutil-eval、TwitterのMavenのバイナリはScala2.10で動かすと落ちるっぽいけど、Maven Centralの方のバイナリはうまく動いた</p>&mdash; numa (@numa08) <a href="https://twitter.com/numa08/statuses/419182634225246208">2014, 1月 3</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

!SLIDE

## sbtとか


```diff
 - resolvers ++= Seq(
 - "twiiter" at "http://maven.twttr.com/"
 - )
 - libraryDependencies += "com.twitter" % "util-eval" % "6.5.0"
 + libraryDependencies += "com.twitter" % "util-eval_2.10" % "6.10.0"
```


!SLIDE

