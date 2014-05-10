!SLIDE
# #新宿Scala座'14年 ５月号

!SLIDE

## 自己紹介

 - [@numa08](http://numa08.net)
 - 人間git-svn
 - でじこちゃんかわいいガチ勢

!SLIDE

## Functional Java

<div class="booklog_html"><table><tr><td class="booklog_html_image"><a href="http://www.oreilly.co.jp/books/9784873115405/" target="_blank"><img src="http://www.oreilly.co.jp/books/images/picture_large978-4-87311-540-5.jpeg" width="102" height="130" style="border:0;border-radius:0;" /></a></td><td class="booklog_html_info" style="padding-left:20px;"><div class="booklog_html_title" style="margin-bottom:10px;font-size:14px;font-weight:bold;"><a href="http://www.oreilly.co.jp/books/9784873115405/" target="_blank">Java開発者のための関数プログラミング </a></div><div style="margin-bottom:10px;"><div class="booklog_html_author" style="margin-bottom:15px;font-size:12px;;line-height:1.2em">著者 : <a href="http://booklog.jp/author/DeanWampler%E8%91%97%E3%80%81%E5%B1%B1%E5%8F%A3%E8%83%BD%E8%BF%AA%E3%80%81%E6%A0%AA%E5%BC%8F%E4%BC%9A%E7%A4%BE%E3%83%88%E3%83%83%E3%83%97%E3%82%B9%E3%82%BF%E3%82%B8%E3%82%AA%E8%A8%B3" target="_blank">DeanWampler著、山口能迪、株式会社トップスタジオ訳</a></div><div class="booklog_html_manufacturer" style="margin-bottom:5px;font-size:12px;;line-height:1.2em">O'Reilly Japan</div><div class="booklog_html_release" style="font-size:12px;;line-height:1.2em">発売日 : 2012-06-20</div></div><div class="booklog_html_link_amazon"><a href="http://booklog.jp/item/11/9784873115405" style="font-size:12px;" target="_blank">ブクログでレビューを見る»</a></div></td></tr></table></div>

!SLIDE

>本書はオブジェクト指向プログラミングに慣れ親しんだ読者を対象に、関数プログラミングの手法や考え方の一端を紹介する書籍です。
>
>Javaによるサンプルコードを例に、関数プログラミングの実用的で実践しやすい内容を紹介します。
>
>Javaプログラマだけでなく、他のオブジェクト指向プログラミング言語のユーザーにも参考になる内容でしょう。

!SLIDE

## ScalaやってるのにJavaで関数プログラミングやってみた

!SLIDE

## 背景

 - 社内のScala熱が上がってきた
 - 今のパッケージ製品を、Playで作りなおすかも？
 - バックエンド実装の機会も増えてきそう
 - Scalaを広めるなら今しかない！！

!SLIDE

## ねらい
 
 - 今一度関数型言語の利点を理解したかった
 - Scalaの再発明をして、内部理解

!SLIDE

## 感想（ひと通り読んだ）

 - 高階関数のない世界にはもう、戻れない

!SLIDE

## 感想

 - Collection APIまじ便利
     - コンビネータって言うんだ。初めて知った
     - 同じことをJavaでやると、割としんどい
 - マルチスレッドも怖くない

!SLIDE

## 結論

# Scalaｻｲｺｰ！！

!SLIDE

## 演習問題やった

!SLIDE

## 第２章

 - Function1VoidとFunction2の単体テストを書いてください
     - Function1Void: [src](https://github.com/numa08/FunctionalJava/blob/master/src/main/java/net/numa08/capter2/Function1Void.java),[test](https://github.com/numa08/FunctionalJava/blob/master/src/test/java/net/numa08/capter2/Function1VoidTest.java)
     - Function2: [src](https://github.com/numa08/FunctionalJava/blob/master/src/main/java/net/numa08/capter2/Function2.java), [test](https://github.com/numa08/FunctionalJava/blob/master/src/test/java/net/numa08/capter2/Function2Test.java)
 - リストとして与えられた数値を、順に加算するメソッドを再帰を使って書いてください。
     - IntCombinator: [src](https://github.com/numa08/FunctionalJava/blob/master/src/main/java/net/numa08/capter2/IntCombinator.java), [test](https://github.com/numa08/FunctionalJava/blob/master/src/test/java/net/numa08/capter2/IntCombinatorTest.java)

!SLIDE

## 第２章

 - 過去にあなたの書いたJavaのコードからnullチェックをしているものを探し、代わりにOptionを使うように変更してください
     - 略

!SLIDE

## 第２章

 - [形象化にある関数の型を調べます。](https://github.com/numa08/FunctionalJava/blob/master/param2.mdown)

!SLIDE

## 第３章

 - ListModuleにFactoryメソッドを追加してください。ただし、引数には可変長引数リストを取り、適切に構築されたリストを返すものとします。
     - [src](https://github.com/numa08/FunctionalJava/blob/master/src/main/java/datastructures/ListModule.java#L98-L117), [test1](https://github.com/numa08/FunctionalJava/blob/master/src/test/java/datastructures/ListTest.java),[test2](https://github.com/numa08/FunctionalJava/blob/master/src/test/java/net/numa08/capter3/ListTest.java)