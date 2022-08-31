---
layout: post
title: "하루의 실행컨텍스트(10분 테코톡)"
subtitle: ""
comments: true
categories : JavaScript
date: 2022-08-31
background: '/img/posts/06.jpg'
---

# 소개
우아한형제들의 유투브 채널인 `우아한Tech`에 올라온 실행컨텍스트에 관한 영상을 바탕으로 글을 작성합니다.
15:32초의 영상입니다.
목차는 아래와 같습니다.
```
1. 자바스크립트 엔진과 실행컨텍스트
2. Record로 JS 호이스팅 이해하기
  - 2-1. 변수 호이스팅(Variable Hoisting)
  - 2-2. 함수 호이스팅(Function Hoisting)
3. Outer로 JS 스코프체이닝 이해하기
4. Execution Context 정리
```

본격적인 내용에 앞서 몇 가지 알려드릴 점이 있습니다.
목차에서 소개한 Record, Outer는 Execution Context에 포함되는 개념입니다.
또 Execution Context의 전체 개념은 아주 많고 복잡하기 때문에 일부만 다룬다는 점도 알아두시면 좋을 것 같습니다.

## 1. 자바스크립트 엔진과 실행컨텍스트
자바스크립트 엔진이 코드를 해석하고 실행하는 과정 중 언제 실행컨택스트를 생성하고 없애는지 간단히 살펴보겠습니다.
1. 자바스크립트 코드 실행
2. 자바스크립트 엔진은 콜 스택에 전역 실행컨텍스트를 담습니다. 여기에는 Record와 Outer가 포함됩니다.
3. 이 후 전역에서 함수 A가 호출된다면 함수 A의 실행컨텍스트를 콜스택에 담습니다. 물론 여기에도 Record와 Outer가 포함됩니다.
4. 이 후 코드가 함수 A가 실행되면 콜스택에서 빠지게 되고 전역 실행컨텍스트만 남게 됩니다.
5. 모든 코드가 실행되면 전역 실행컨텐스트도 빠지게 됩니다.

## 2. Record로 JS 호이스팅 이해하기

```javascript
// Global

// 1. 호이스팅이 일어나지 않는 코드
var TVChannel = 'Netflix';
console.log(TVChannel); // Netflix

// 2. 호이스팅이 일어나지 않는 코드
console.log(TVChannel); // undefined
var TVChannel = 'Netflix';
```
위의 코드는 결과의 차이가 있지만 1,2번 모두 문제 없이 실행됩니다.
특히 2번의 경우 다른 언어에서는 에러가 일어 날수도 있지만 자바 스크립트에서는 실행이 가능합니다.
이런 현상을 `호이스팅`이라고 합니다.
실제로는 선언문과 초기화가 하단에 있지만 실행된 코드를 보면 마치 선언문만 최상단에 있는 것 처럼 작동 했습니다.
이런 일이 일어날 수 있는 이유는 자바스크립트 엔진이 코드를 우선적으로 스캔하고 실행컨텍스트 어딘가에 기록해 놓기 때문입니다.
말씀드린 `어딘가에 기록 해놓는 곳`은 바로 앞서 제시해드린 `Record` 입니다.
정식명칭은 `Environment Record`로 식별자와 식별자에 바인딩된 값을 기록하는 객체 입니다.
이 환경 레코드에 변수가 어떻게 저장되는지를 보면 호이스팅을 제대로 이해할 수 있습니다.
변수 호이스팅, 함수 호이스팅으로 나눠 살펴보도록 하겠습니다.

## 2-1. 변수 호이스팅(Variable Hoisting)
변수 선언자인 `var, let, const`에 대해서 호이스팅이 어떻게 일어나는지 보도록 하겠습니다.
먼저 `var`의 과정 입니다.
먼저 코드를 다시 제시해 드리겠습니다.
```javascript
// Global

console.log(TVChannel); // undefined

var TVChannel = 'Netflix';

console.log(TVChannel); // Netflix
```

이제 어떤 식으로 실행 컨텍스트가 만들어지는지 보겠습니다.
1. 전역 컨텍스트를 생성해 콜스택에 넣습니다.
2. 전체 코드를 스캔하면서 TVChannel 변수가 등록 되는데, var로 선언됐기 때문에 undefined로 초기화 됩니다.
3. 코드를 실행합니다.
위의 과정 중 1,2번을 `생성 단계`라고 할 수 있습니다. 실행 컨텍스트를 생성하고 선언문만 실행해서 Environment Record에 기록 하는 단계 입니다.
위의 과정 중 3번은 `실행 단계`라고 할 수 있습니다. 선언문 외 나머지 코드를 순차적으로 실행합니다. Environment Record를 참조하거나 업데이트 합니다.





---
## 참고
- [하루의 실행컨텍스트](https://m.youtube.com/watch?v=EWfujNzSUmw){: target="_blank"}


{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
