!SLIDE
# #新宿Scala座'14年 ２月号

!SLIDE

## 自己紹介

 - [@numa08](http://numa08.net)
 - 人間git-svn
 - でじこちゃんかわいいガチ勢

!SLIDE

それでも

人は

夢を見る

!SLIDE

## Scala on Android...

!SLIDE

## Scala on Android

これからScalaでAndroidアプリを作ろうかなぁと思っている

個人、法人のあなた達へ

!SLIDE

## Scala on Android

ぶっちゃけ、一長一短です

!SLIDE

## おしながき

 - scaloid
 - androidの罠達
 - まとめ

!SLIDE

## Scala + sbt でAndroidするには？

 - Scaloid
 - android-sbt-plugin

!SLIDE

## [Scaloid](https://github.com/pocorall/scaloid)

 - AndroidAPIのScalaラッパーライブラリ
 - 暗黙的型変換でコード量削減
 - 謎のDSLでレイアウトを簡単記述

!SLIDE

## [android-sdk-plugin](https://github.com/pfn/android-sdk-plugin)

 - sbtでAndroidをビルド
 - 時代はsbt(gradleではなく)

!SLIDE

## Scaloidの機能紹介

 - SActivity
	 - Activityのラッパー(trait)
	 - Activity is 画面
	 - 面倒なAPIに対する暗黙的型変換とかの提供

!SLIDE

## SActivity

xmlで定義したViewを取得


```java

final TextView text = (TextView)findViewById(R.id.text_view);

```


!SLIDE

## SActivity


```scala

val textView = find(R.id.text_view)[TextView]


```


!SLIDE

## DSLによるレイアウトの記述


[Two verbose things VS One simple thing](https://github.com/pocorall/scaloid#ui-layout-without-xml)

!SLIDE

## 暗黙的引数Context

`android.content.Context`を暗黙的引数にしてる
<br><br>


```java
Button button = new Button(context);
button.setText("Click");
```

!SLIDE

## 暗黙的引数Context

`android.content.Context`を暗黙的引数にしてる
<br><br>


```scala
SButton("Click")
```

!SLIDE

## Androidの闇、罠

 - ライフサイクルの闇
 - オブジェクトのリークの罠
 - サポートライブラリとか

!SLIDE

ここでActivityのライフサイクルについて振り返ってみましょう

!SLIDE

![](http://developer.android.com/images/activity_lifecycle.png)

!SLIDE

## Activityのライフサイクル

 - 画面の状態などによって遷移する
 - 随時メソッドが呼び出される
 - ライフサイクルを考慮したコードを書くべき

!SLIDE

## Activityのライフサイクル

 - インスタンス生成時に生成できないオブジェクトは多い
 - 主に`Context`を利用するもの
 - `onCreate`や`onResume`で生成するのがセオリー

!SLIDE

## Activityのライフサイクル


```java

class HogeActivity extends Activity {
	final private Button mButton = new Button(this); 
	//アウト


```


!SLIDE

## Activityとライフサイクル


```java

class HogeActivity extends Activity {
	
	private Button mButton;

	protected void onCreate(Bundle b) {
		super.onCreate(b);
		mButton = new Button(this);
	}
}
```


!SLIDE

## Activityとライフサイクル

 - `val`宣言できない物も多い
 - `lazy val`を駆使する？
 - `lazy val`も怖い

!SLIDE

## Contextリーク問題


```java
private static Drawable back;

protected void onCreate(Bundle b) {
	super.onCreate(b);
	final TextView label = new TextView(this);
	//^LEAK!!
	if(back == null) back = getBd();
	label.setBackgroundDrawable(back);
	//^LEAK!!
```


!SLIDE

## Contextリーク問題

 - `TextView`が`Activity`のインスタンスを保持している
 - GCしてくれない
 - Activity関連のもろもろのオブジェクトがリークする
 - やばい

!SLIDE

## Contextリーク問題

```java

 - final TextView label = new TextView(this);
 + final TextView label = new TextView(getApplicationContext());

 /*onStop*/
 label.setBackgroundDrawable(null);
```


!SLIDE

## Contextリーク問題


```scala
/*app.scala*/
/*SActivity*/
override implicit val ctx = this

/*widget.scala*/
class SButton()(implicit context: Context, //ry

/*your code*/
SButton()
//^LEAK!?
```


!SLIDE

## Contextリーク問題

 - Activityを引数に渡すとリークしうる
 - しかし、場合によっては渡すべき
     - 参照されるUIのTheme設定とかに関わる
 - プログラマが制御する必要のある箇所


!SLIDE

## Support Libraryとか

 - Android2.x系以下に3.x系以上のAPIを提供
 - まだまだ現役
 - Support Libraryだけで提供されてるUIもある

!SLIDE

## Support Libraryとか

 - `Fragment`を2.x系以下で利用するのに必須
 - UIのパーツ
 - 多画面（解像度的な意味で）対応に必須

!SLIDE

## Support Libraryとか

 - `FragmentActivity`を使う
 - `SActivity`は`Activity`を継承したtrait
 - 使えない！！

!SLIDE

## Support Libraryとか

 - [scaloid/scaloid-support-v4](https://github.com/pocorall/scaloid/tree/master/scaloid-support-v4)
 - なんかサポートするっぽい？
 - ドキュメントはまだないっぽい

!SLIDE

## Support Libraryとか

 - Fragmentは独特のライフサイクルを持つ
 - インスタンスの生成方法も特殊
 - Scalaでやんの・・・？

!SLIDE

## まとめ

 - ライフサイクルのあるオブジェクトにScalaは弱い
 - Scaloidを暖かく見守ろう
 - モデルやデータ処理では力を発揮できそう
 - 非同期処理とかにもいけるか

!SLIDE

## 宣伝

 [Live Coding de Night #libcodingso infinite](http://www.zusaar.com/event/4137003)

 ![](http://lh5.ggpht.com/tLLzJag7g_ZqLRIu7Faamex9dEllp7WITA92MUfAtgcHIucG_QvUmlXK6cBstr7Qc8fyuw4HDnfyXhv55ZVsIw=s610)