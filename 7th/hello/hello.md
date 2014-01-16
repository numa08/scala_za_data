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

## implict-class使った

 - 暗黙的な型変換をやってくれる
 - 既存クラスにメソッドを追加する感じで
 - 使いドコロを選びましょう

!SLIDE

## implict-class使った

 - FileをOptiondeラップしてあげたかった


```scala
val file = new File("Halleyfile").asOpt
file match {
  case None => sys.error
  case _ {/*do something*/}
}
```

!SLIDE

## implict-class使った


```scala
object FileWrapper {
  implicit class FileWrapper(val file:File) extends AnyVal {
    def asOpt : Option[File] = {
      if(file.exists){
              Some(file)
             } else {
              None
       }
    }
  }
}
```


!SLIDE

## 詰まったところとか

 - objectでラップせずに使った
     - *class*なのでつい・・・
     - implicit宣言されたものは、トップクラスにはできません

!SLIDE

## 詰まったところとか2

 - importで詰まった
     - implicitなメソッド、クラスは直接指定する必要がある
     - *_*とかつける必要がある
     - [こんな感じ](https://github.com/numa08/halley/blob/master/src/main/scala/Halley.scala#L7)
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

## [Scaloid](https://github.com/pocorall/scaloid)を使ってみた

 - 2014年、最も気になるScalaのフレームワーク
 - ScalaでAndroidアプリが作れる！！！！
 - ScalaでAndroidアプリをかっこ良く作れる！！！

!SLIDE

## ScalaでAndroidアプリを作る！！

 - [pfn/android-sdk-plugin](https://github.com/pfn/android-sdk-plugin)を発展させたものっぽい？
 - エレガントにコードが書ける！！
 - 過去のコードとの互換性もある！！
 - 簡単に使える！！

!SLIDE

## ScalaでAndroidアプリを作る夢

 - [Scala + sbt-android + IntelliJ で快適Androidアプリ開発 - パンダのメモ帳](http://shogogg.hatenablog.jp/entry/2013/12/06/000039)
     - [jberkel/android-plugin](https://github.com/jberkel/android-plugin)
 - [AndroidだってScalaしたい！！ - @numa08　猫耳帽子の女の子](http://numa08.hateblo.jp/entry/2013/09/22/100346)
     - Eclipseに無理やりビルドさせる

*苦行！！*

!SLIDE

## この辺りが苦行
 
 - メソッド数の上限
    - ビルドツールを使って、動的なライブラリのロードが必須
 - レイアウトとコードの結びつけがキモい
    - findViewByIdｪ・・・
    - javaならキャストするけど、Scalaでキャスト？

!SLIDE

## この辺りが苦行

 - ジェネリクスとか
    - ScalaとJavaで差があるので、死ぬ・・・

!SLIDE

## 苦行を乗り越えた者がいた

!SLIDE

## [pfn/android-sdk-plugin](https://github.com/pfn/android-sdk-plugin)
曰く

 - [jberkel/android-plugin](https://github.com/jberkel/android-plugin)は複雑すぎる
 - リソースとコードの結びつけがエレガント  
 - `conscript`や`g8`なんていらない

!SLIDE

## [Scaloid](https://github.com/pocorall/scaloid)
### [レイアウト周り](https://github.com/pocorall/scaloid#ui-layout-without-xml)

 - Scalaで定義可能なレイアウト
 - xmlでもレイアウト可
     - あんまり推奨されてない？
 - xml2Scalaなコンバータの提供

!SLIDE

### [ライフサイクル制御](https://github.com/pocorall/scaloid#lifecycle-management)

 - ライフサイクルのコールバックで必要な処理も、簡潔に
 - 例は`onResume`でregist,`onPause`でunregistが必須なBroadcastReceiver

!SLIDE
### [非同期処理関連](https://github.com/pocorall/scaloid/wiki/Basics#asynchronous-task-processing)

 - scalaのspawnが使えるっぽい
 - コールバックもお手軽に

!SLIDE

### その他
 
 - AndroidのAPIをTraitでラップしている
 - イミュータブルなオブジェクトの生成がしやすい
 - *お作法*的な処理を簡略化している

!SLIDE

## 気になったところ
 
 - テストの機能はないっぽい
 - Play以上のDSL祭り
 - 今までのAndroidとはかなり違うものに・・・

!SLIDE

## [Scaloid](https://github.com/pocorall/scaloid)

今年注目なんじゃないかなぁ？