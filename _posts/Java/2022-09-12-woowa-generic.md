---
layout: post
title: "그린론의 제네릭(10분 테코톡)"
subtitle: ""
comments: true
categories : Java
date: 2022-09-12
background: '/img/posts/06.jpg'
---

# 소개
우아한형제들의 유투브 채널인 `우아한Tech`에 올라온 Generic에 관한 영상을 바탕으로 글을 작성합니다.
10:12초의 영상입니다.
목차는 아래와 같습니다.
```
1. 제네릭이란?
  - 1-1. 제네릭의 장점
2. 변성( variance )
  - 2-1. 무공변( Invariance ) - <T>
  - 2-2. 공변( Covariance ) - <? extends T>
  - 2-3. 반공변( Contravariance ) - <? super T>
3. 제네릭 타입과 메서드
4. 와일드 카드
5. 제네릭 타입 소거
```

## 1. 제네릭이란?
컴파일 타임에 타입을 체크함으로써 코드의 안전성을 높여주는 기능입니다.
제네릭에 익숙하지 않으신 분들은 잘 와닿지 않는 정의 일 것 같습니다.
하지만 제네릭이 뭔지 모르시더라도 우리는 아주 자연스럽게 제네릭을 사용하고 있습니다.
```java
List<T> // T는 타입 매개변수 입니다.
List<String> stringList = new ArrayList<String>(); // String은 매개변수화된 타입입니다.
```
자바 개발을 할 때 한 번 쯤은 반드시 사용해 보셨을 List도 위의 코드와 같이 제네릭을 사용합니다.
이제 제네릭을 사용했을 때의 장점을 알아보겠습니다.

## 1-1. 제네릭의 장점
1. 컴파일 타임에 당력한 타입 검사
아래와 같이 String 타입만 다루고자 하는 목적을 가진 List를 생성 했을 때
제네릭을 이용해 타입을 강제 하여 개발자의 실수를 방지 할 수 있습니다.
```java
// 제네릭 미사용
List stringList = new ArrayList<>();
stringList.add( "woowacourse" );
stringList.add( 1 );
String result = (String) stringList.get( 0 ) + (String) stringList.get(1); // Runtime Error

// 제네릭 사용
List<String> stringList = new ArrayList<String>();
stringList.add( "woowacourse" );
stringList.add( 1 ); // Complie Error
```

2. 캐스팅(타입 변환)제거
아래와 같이 캐스팅을 따로 해줘야 하는 낭비가 없어집니다.
```java
// 제네릭 미사용
List stringList = new ArrayList<>();
stringList.add( "woowacourse" );
String result = (String) stringList.get( 0 );

// 제네릭 사용
List<String> stringList = new ArrayList<>();
stringList.add( "woowacourse" );
String result = stringList.get( 0 );
```

## 2. 변성( variance )
타입 계층 관계에서 서로 다른 타입간에 어떤 관계가 있는지 나타내는 개념입니다.
본격적으로 알아보기 전에 간단한 코드를 보겠습니다.
```java
List<Object> objectList = new ArrayList<Integer>();
```
위의 코드는 언뜻 보기에 문제가 없어 보이지만 에러가 발생되는 코드 입니다.
List는 타입을 검사할 때 특정 클래스를 상속한 클래스여도 상위 클래스와 같다고 보지 않습니다.
무공변의 특성을 가지기 때문입니다.
이렇게 변성에는 3가지 종류가 있습니다.
- 무공변( Invariance ) - <T>
- 공변( Covariance ) - <? extends T>
- 반공변( Contravariance ) - <? super T>

이제 이것들을 알아보겠습니다.

### 2-1. 무공변( Invariance ) - <T>
타입 B가 타입 A의 하위 타입일 때, Category<B>가 Category<A>의 하위 타입이 아닌 경우입니다. 
즉 아무런 관계가 없다고 봅니다.

### 2-2. 공변( Covariance ) - <? extends T>
타입 B가 타입 A의 하위 타입일 때, Category<B>가 Category<A>의 하위 타입인 경우 입니다.
배열이 여기에 해당 합니다.

### 2-3. 반공변( Contravariance ) - <? super T>
타입 B가 타입 A의 하위 타입일 때, Category<B>가 Category<A>의 상위 타입인 경우 입니다.


## 3. 제네릭 타입( Generic Types ) - Class<T>, interface<T>
제네릭 타입으로 클래스를 만드는 방법을 보겠습니다.
아래와 같습니다.
```java
// 비제네릭. 일반 적인 클래스
class Category {
  private Object object;

  public void set( Object object ){
    this.object = object;
  }

  public Object get(){
    return object;
  }
}

// 제네릭
class Category<T> {
  private T t;

  public void set( T t ){
    this.t= t;
  }

  public T get(){
    return t;
  }
}
```

제네릭 메서드를 만드는 방법도 알아보겠습니다.
아래와 같습니다.
```java
class NoodleCategory<T> {
  private T t;

  public void set( T t ) {
    this.t = t;
  }

  public T get() {
    return t;
  }

  public <T> void printClassName( T t ) {
    System.out.println( "클래스 필드에 정의된 타입 = " + this.t.getClass().getName() );
    System.out.println( "제네릭 메서드에 정의된 타입 = " + t.getClass().getName() );
  }
};

NoodleCategory<Noodle> noodleCategory = new NoodleCategory<>();
noodleCategory.set( new Noodle() );
noodleCategory.printClassName( new Pasta() );
// 클래스 필드에 정의된 타입 = Noodle
// 제네릭 메서드에 정의된 타입 = Pasta
```
위 코드에서 클래스 필드의 제네릭 타입과 메서드의 제네릭 타입은 다릅니다.
메서드의 제네릭 타입은 그 메서드 내로 제한 되기 때문입니다.

### 3-1. 제네릭 타입 제한의 필요성
제네릭을 통해 모든 타입을 사용할 수 있게 하는 것은 분명 유효한 방식입니다.
List와 같은 인터페이스가 얼마나 효과적인지 생각해보면 알 수 있습니다.
하지만 타입을 제한하는 것이 필요한 경우도 분명히 있습니다.
아래 코드를 보겠습니다.

```java
class NoodleCategory<T> {
  private T t;

  public void set( T t ) {
    this.t = t;
  }

  public T get() {
    return t;
  }
}

NoodleCategory<Noodle> noodleCategory = new NoodleCategory<>(); // Good
NoodleCategory<Coke> noodleCategory = new NoodleCategory<>(); // Bad
```
NoodleCategory 클래스는 Noodle 클래스를 담아서 사용하기 위한 클래스 입니다.
그런데 Coke를 담아서 사용해도 문제가 없습니다.
이는 우리가 의도한 바가 아닙니다.
이런 경우를 막기 위해서 타입을 제한할 필요가 있는 것 입니다.

```java
class NoodleCategory<T extends Noodle> {
  private T t;

  public void set( T t ) {
    this.t = t;
  }

  public T get() {
    return t;
  }
}

NoodleCategory<Noodle> noodleCategory = new NoodleCategory<>(); // Good
NoodleCategory<Ramen> noodleCategory = new NoodleCategory<>(); // Good
NoodleCategory<Coke> noodleCategory = new NoodleCategory<>(); // Compile Error
```
NoodleCategory가 Noodle만 사용할 수 있도록 제한 되었습니다.
제네릭 타입을 제한함으로서 우리가 원하는 바를 달성했네요.

## 4. 와일드 카드
`<?>`와 같이 사용하는 것을 와일드 카드라고 합니다.
와일드 카드 뜻을 찾아보니 비장의 수 정도 되는 말로 사용하더군요.
제네릭이 와일드 카드를 사용하는 방식은 3가지가 있습니다.
1. <?> - Unbounded Wildcards
  - 모든 타입이 가능 합니다.

2. <? extends Noodle> - Upper Bounded Wildcards
  - A 클래스와 A 클래스의 하위 타입

3. <? super Noodle> - Lower Bounded Wildcards
  - A 클래스와 A의 상위 타입

### 4-1. 와일드 카드의 제한 사항
```java
class CategoryHelper {
  // upper 일 경우에 상위 타입을 넣는 오류를 방지
  public void popNoodle( Category<? extends Noodle> category ) {
    Noodle noodle = category.get(); // 값을 꺼내와서 사용하는 것은 가능
    category.set( new Noodle() ); // 값을 넣어주는 것은 불가능
  }
  
  // lower 일 경우 상위 타입에 값을 넣는 오류를 방지
  public void popNoodle( Category<? super Noodle> category ) {
    category.set( new Noodle() ); // 값을 넣어주는 것은 가능
    Noodle noodle = category.get(); // 값을 꺼내와서 사용하는 것은 불가능
  }
}
```

위와 같은 제한 사항을 이펙티브 자바에서 `PECS(producer-extends, consumer-super)`라는 용어로 설명합니다.
생성하는 곳에서는 extends를 쓰고 소비 하는 곳에서는 super를 사용하라는 의미 입니다.
```java
// producer - extends
class NoodleCategory<E> {
  private List<E> list = new ArrayList<>();
  
  public void pushAll( Collection<? extends E> box ) {
    for( E e : box ){
      list.add( e );
    }
  }
}

// consumer - super
class NoodleCategory<E> {
  private List<E> list = new ArrayList<>();
  
  public void popAll( Collection<? super E> box ) {
    box.addAll( list );
    list.clear();
  }
}
```
## 5. 제네릭 타입 소거
이제 까지 봤던 내용들의 기반이 됐던 것은 제네릭이 컴파일 시에 타입을 검사하고,
런타임에는 타입을 소거 해서 특정 타입으로 타입을 바꿔주는 것을 의미합니다.
제네릭은 자바5에서 처음 나왔기 때문에 기존 코드도 사용가능하게 이런 개념이 도입되었습니다.
예시 코드를 보겠습니다.
```java
// 실제 작성한 코드. 컴파일 시에 타입을 검사
class Category<T> {
  protected T t;
  
  public void set( T t ) {
    this.t = t;
  }
  
  public T get() {
    return t;
  }
}

// 런타임 시의 코드. 
class Category {
  protected Object t;
  
  public void set( Object t ) {
    this.t = t;
  }
  
  public Object get() {
    return t;
  }
}
```
위의 코드는 unbouneded type에 대해 런타임 시 타입이 어떻게 지정되는지를 보여주고 있습니다.
따로 타입에 대한 제한이 되어 있지 않고 모든 타입이 가능한 형태로 작성 되었기 때문에,
T가 Object로 타입소거를 통해 치환된 것을 확인 할 수 있습니다.
```java
// 실제 작성한 코드. 컴파일 시에 타입을 검사
class Category<T extends Noodle> {
  protected T t;
  
  public void set( T t ) {
    this.t = t;
  }
  
  public T get() {
    return t;
  }
}

// 런타임 시의 코드. 
class Category {
  protected Noodle t;
  
  public void set( Noodle t ) {
    this.t = t;
  }
  
  public Noodle get() {
    return t;
  }
}
```
위의 코드는 bounded type으로,
타입 제한이 되어 있어 T가 Noodle로 치환된 것을 확인 할 수 있습니다.


---
## 참고
- [그린론의 제네릭](https://www.youtube.com/watch?v=w5AKXDBW1gQ&ab_channel=%EC%9A%B0%EC%95%84%ED%95%9CTech){: target="_blank"}


{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
