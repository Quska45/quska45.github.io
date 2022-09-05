---
layout: post
title: "브콜의 This(10분 테코톡)"
subtitle: ""
comments: true
categories : JavaScript
date: 2022-09-05
background: '/img/posts/06.jpg'
---

# 소개
우아한형제들의 유투브 채널인 `우아한Tech`에 올라온 This에 관한 영상을 바탕으로 글을 작성합니다.
15:07초의 영상입니다.
목차는 아래와 같습니다.
```
1. This 란?
2. This의 바인딩 룰
3. Arrow function에서 This
```

## 1. This 란?
말 그대로 자기 자신을 가리키는 키워드 입니다.
This를 이해하는데 중요한 키워드는 `자신`입니다.
언어적 특성에 따라 `자신`을 어떻게 정의 하느냐에 따라 This를 정의할 수 있습니다.
그럼 This를 이해하고 정의내리기 위해서는 자바스크립트의 언어적 특성을 알고 있어야 하는데, 꽤나 복잡합니다.
차근 차근 This를 이해해 보겠습니다.
먼저 자바스크립트의 언어적 특징 중 함수에 관련된 내용입니다.

### 1-1. 자바스크립트의 함수
자바스크립트의 함수를 알아보려는 이유는 결국 this가 호출되는 곳은 함수기 때문입니다.
그러니 this를 위한 함수에 대한 내용을 살펴보도록 하겠습니다.
자바스크립트의 함수는 객체 입니다.
그 중에서도 일급 객체 입니다.
따라서 다음과 같은 특징을 가지고 있습니다.
- 변수나 데이터에 저장할 수 있습니다.
- 함수의 인수로 전달할 수 있습니다.
- 함수의 반환 값으로 사용할 수 있습니다.

따라서 같은 함수 A라고 하더라도 다양한 환경에서 호출 될 수 있습니다.
예를 들면 다음과 같습니다.
```javascript
A();
SampleObject1.A();
SampleObject2.A();
```
위와 같이 다양한 환경에서 호출이 되다 보니 This를 특정하는 것이 다른 언어에 비해 한번 더 생각해보게 됩니다.

### 1-2. 자바스크립트의 실행 환경( context )과 바인딩
위에서 본 것 처럼 this는 어떤 환경에서 실행되는냐에 따라서 달라집니다.
`자신`이라는 개념 자체가 어디서 실행되느냐 따라 달라지게 되는 것 입니다.
여기서 얘기하는 `어디서` 라는 개념을 알아보겠습니다.
자바스크립트에서 `어디서`라는 개념은 객체로 구현되어 있습니다.
`어디서`라는 개념 자체는 추상적이지만 이를 구현하기 위해서는 결국 객체가 사용된 것 입니다.
따라서 this는 어떤 객체에 의해 호출 되느냐에 따라서 바뀌게 된다고 표현 할 수 있습니다.
이런 과정을 this가 특정 객체에 `바인딩`된다고 표현합니다.

## 2. This의 바인딩 룰
This에 대한 이해와 바인딩을 소개 하기 위해 꽤나 많은 내용이 필요했네요.
그럼 이제는 This의 바인딩의 룰에 대해서 알아보겠습니다.
바인딩 룰은 4가지가 있습니다.
- 기본 바인딩
- 암시적 바인딩
- new 바인딩
- 명시적 바인딩

이번 장에서는 이것들에 대해서 알아보겠습니다.

### 2-1. 기본 바인딩
먼저 코드를 하나 제시드리겠습니다.
```javascript
function showThis(){
  console.log(this);
}

function showThisStrictMode(){
  'use strict'
  console.log(this);
}

showThis(); // window 객체
showThisStrictMode() // undefined
```






---
## 참고
- [브콜의 This](https://m.youtube.com/watch?v=7RiMu2DQrb4){: target="_blank"}


{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
