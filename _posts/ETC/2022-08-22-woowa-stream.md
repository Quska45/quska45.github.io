---
layout: post
title: "차리의 Stream(10분 테코톡)"
subtitle: ""
comments: true
categories : ETC
date: 2022-08-22
background: '/img/posts/06.jpg'
---

# 소개
우아한형제들의 유투브 채널인 `우아한Tech`에 올라온 Stream에 관한 영상을 바탕으로 글을 작성합니다.
09:34초의 영상입니다.
목차는 아래와 같습니다.
이 글은 자바의 Stream을 기준으로 작성합니다.
하지만 자바에만 있는 개념은 아니기 때문에 글의 분류를 ETC로 했습니다.
내가 사용하는 언어나 개발 환경에서 Stream API를 지원하지 않는 다면 직접 만들어 사용하는 것도 얼마든지 가능 합니다.
Stream에 대해서 공부하실 때 자바의 Stream만 생각하시기 보단 좀 더 포괄적인 관점에서 공부하시면 좋을 것 같습니다.
```
1. 스트림의 정의
2. 스트림 알아보기
  - 2-1. 자바의 스트림
3. 스트림 구조
  - 3-1. 스트림의 생성
  - 3-2. 스트림의 가공
  - 3-3. 스트림의 소비
4. 스트림의 장점
5. 스트림의 단점
```

## 1. 스트림의 정의
오라클에서는 스트림을 `순차 및 병렬적인 집계연산을 지원하는 연속된 요소` 라고 표현합니다.
모던 자바 인 액션에서는 `데이터 처리 연산을 지원하도록 소스에서 추출된 요소` 라고 표현합니다.
많은 정의가 그렇듯이 스트림에 대해서 잘 모른다면 한 번에 이해하기 어려운 내용입니다.
하지만 저는 뭔가를 공부할 떄 정의를 먼저 보는 것을 좋아합니다.
그래야 `정의를 이해해야 겠다`라는 목표가 생기기 때문입니다.
그럼 이제 부터 위의 정의를 이해할 수 있도록 스트림에 대해서 알아보겠습니다.

## 2. 스트림 알아보기
스트림은 컴퓨터 공학에서도 쓰이지만 당연히 일반명사로도 사용됩니다.
- Computer Science : A sequence of data elements made available over time
- Common nouns : A continuous flow of things or people

위의 두 가지 다른 정의 에서 눈여겨볼 개념은 `flow`라는 키워드 입니다.
고정된 뭔가를 의미하는 것이 아니라 뭔가의 `흐름` 이라는 것입니다.
이제 부터 우리가 알아볼 스트림에 대한 내용에서 `뭔가`는 `데이터`를 의미합니다.

### 2-1. 자바의 스트림
스트림이 흐름을 의미한다는 것을 알아봤습니다.
그럼 자바의 스트림을 같이 보도록 하겠습니다.
`java.util.stream`은 자바의 스트림 패키지 입니다.
오라클 공식 문서는 이에 대해 `요소들의 스트림에 함수형 스타일의 연산을 지원하는 클래스들` 이라고 묘사합니다.
위의 정의를 풀어보면 요소들의 데이터 흐름을 어떻게 다룰 것인지를 지원하는 기능들이 모여있는 클래스라고 볼 수 있습니다.

## 3. 스트림의 구조
스트림의 구조를 크게 3개의 파트로 나누면 `생성 -> 가공 -> 소비` 입니다.

### 3-1. 스트림의 생성
자바의 리스트, 맵과 같은 컬렉션으로부터 생성할 수 있습니다.
뿐만 아니라 Array, File도 가능하고 Infinite나 Third-party를 이용해도 상관 없습니다.

### 3-2. 스트림의 가공
가공을 위한 중간연산자 들이 존재 합니다.
filter, map, peek / sorted, distinct, limit 등 많은 중간연산자가 존재 합니다.
이들은 생성된 스트림을 이용하여 새로운 스트림을 만들어 냅니다.
중간연산자는 새로운 스트림을 만들어내기 전까지는 어떤 기능도 수행하지 않습니다.
이런 특성을 이용해 `루프 퓨전`과 `쇼트 서킷`이라는 테크닉을 활용할 수 있습니다.
추가로 위에서 제시 드린 중간연산자는 두가지 타입으로 나눌 수 있습니다.
stateless(독립적. filter, map, peek)와 stateful(종속적. sorted, distinct, limit) 입니다.

### 3-3. 스트림의 소비
최종연산자로 결과를 생성하거나 사이드 이펙트를 만드는 과정입니다.
최종연산자에는 collect, findAny, findFirst, anyMatch, allMatch, forEach 등이 있습니다.
최종연사자를 사용할 때 주의할 점 2가지만 언급하도록 하겠습니다.
1. 최종연산자가 수행되고 나면 소비된 것으로 간주됩니다. 다시 사용하려면 새로운 스트림을 만들어야 합니다.

```java
public static void main(String[] args){
  List<String> list = List.of("pobi", "jason", "neo", "gugu");
  Stream<String> stream = list.stream();
  
  recycle(stream);
  System.out.pringln("------complete------");
  recycle(stream);
}

public static void recycle(Stream<String> stream){
  stream.forEach(str -> System.out.println("consuming = " + str));
}
```
위 코드는 두번째 recycle 호출에서 예외가 발생됩니다.
recycle은 내부에서 최종연산자를 사용했기 때문에 똑같은 stream 인스턴스로 recycle이 호출 될 수 없습니다.
2. forEach에 대해서.
forEach는 로그나 디버깅을 위한 출력으로만 사용할 것을 권장합니다.
이펙티브 자바에서는 forEach가 `덜 스트림 스럽다`라고 표현합니다.
이유는 코드를 보면서 얘기해보겠습니다.
```java
public static List<String> discouragedVersion(Stream<String> stream, Pattern pattern){
  List<String> results = new ArrayList<>();
  stream
    .filter(s -> pattern.matcher(s).matches())
    .forEach(results::add); // Unnecessary use of side-effects.
  return results;
}

public static List<String> discouragedVersionWithParallel(Stream<String> stream, Pattern pattern){
  List<String> results = new ArrayList<>();
  stream.parallel()
    .filter(s -> pattern.matcher(s).matches())
    .forEach(results::add); // There are no guarantees of results to be always same.
  return results;
}


public static List<String> encouragedVersion(Stream<String> stream, Pattern pattern){
  return stream
          .filter(s -> pattern.matcher(s).matches())
          .forEach(results::add); // no side-effects.
}
```
1, 2번의 코드는 좋지 않은 방식입니다.
불필요한 사이드 이펙트를 만들어내거나 결과 값이 항상 같다고 보장 할 수 없습니다.
그에 반해 collet와 같은 최종연산자를 사용하면 이런 문제가 발생시키지 않고 안정적으로 개발할 수 있습니다.

## 4. 스트림의 장점
1. 코드의 가독성 입니다. 아래 스트림을 사용한 코드와 사용하지 않은 코드를 보시면 한번에 이해가 되실 것 같습니다.

```java
// 스트림을 사용하지 않은 코드
public static List<String> forLoopVersion(List<String> list){
  List<String> result = new ArrayList<>();
  for(String str : list){
    if(str.length() < 10){
      str = str.toLowerCase();
      if(!str.contains("abc")){
        result.add(str);
      }
    }
  }
  return result;
}

// 스트림을 사용한 코드
public static List<String> streamVersion(List<String> list){
  return list.stream()
          .filter(str -> str.length() < 10)
          .map(String::toLowerCase)
          .filter(str -> !str.contains("abc"))
          .collect(Collectors.toList());
}
```

2. 코드의 변경이 쉽다는 점 입니다. 위의 코드에서 "abc"가 포함 되어 있는지에 대한 코드와 toLowerCase의 순서를 변경하는 경우를 생각해보시면 될 것 같습니다.
3. 병렬처리를 간단하게 할 수 있습니다. 물론 병렬처리 시에는 고려해야할 부분이 많지만 이 글에서 다루지는 않겠습니다.

## 5. 스트림의 단점
1. 컴퓨팅 비용이 큽니다. 
2. 내부 반복에 대해 인지하고 있어야 합니다.

```java
public static void main(String[] args){
  IntStream.iterate(0, i -> (i + 1) % 2)
    .distinct()
    .limit(10)
    .forEach(System.out::println);
  System.out.println("complete");
}
```
위 코드는 0,1을 출력한 이후에 무한루프에 빠집니다.
하지만 distinct와 limit의 순서를 변경하면 무한 루프가 발생하지 않습니다.
이렇게 작은 차이지만 각 api가 어떤 특성을 가지고 있는지 모른다면 오류를 잡아내기 쉽지 않습니다.

---
## 참고
- [차리의 Stream](https://m.youtube.com/watch?v=rbm87IFpwvQ){: target="_blank"}


{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
