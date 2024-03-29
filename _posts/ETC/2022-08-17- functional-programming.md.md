---
layout: post
title: "레오의 함수형 프로그래밍(10분 테코톡)"
subtitle: ""
comments: true
categories : ETC
date: 2022-08-17
background: '/img/posts/06.jpg'
---

# 소개
우아한형제들의 유투브 채널인 `우아한Tech`에 올라온 함수형 프로그래밍에 관한 영상을 바탕으로 글을 작성합니다.
7:03초의 영상입니다.
목차는 아래와 같습니다.
```
1. 객체 지향과 함수형 예시(객체지향 물류센터 vs 함수형 물류센터)
  - 객체지향 물류센터
  - 함수형 물류센터
  - 함수형 물류센터의 특징(순수함수의 특징)
  - 함수형 물류센터의 장점
2. 함수형 프로그래밍
  - 함수형 프로그래밍의 특징
  - 함수형 언어의 조건
  - 함수형 프로그래밍 정의 해설
3. 마무리
  
```

## 객체 지향과 함수형 예시(객체지향 물류센터 vs 함수형 물류센터)
객체지향적으로 만들어진 물류센터와 함수형 물류센터가 있다고 가정하고 예시를 들어 보겠습니다.

### 객체지향 물류센터
객체지향 물류 센터에는 다음과 같은 역할을 하는 사람들이 있습니다.
- 관리자 : 다른 사람들에게 업무를 배정합니다.
- 물건 진열 직원 : 작업 목록을 확인하고 물건들을 진열 합니다.
- 물건 이동 직원 : 작업 목록을 확인해서 필요한 물건을 필요한 곳으로 이동시킵니다.
- 물건 포장 직원 : 이동된 물건을 포장 하고 검수 직원에게 인계 합니다.
- 물건 검수 직원 : 포장된 물건을 검수하고 상차시킵니다.

위와 같이 객체지향에서는 담당자 별로 역할이 분담되어 있다는 것을 알 수 있습니다.
하지만 사람과 역할을 많아질수록 복잡해질 수 밖에 없습니다.

### 함수형 물류센터
함수형 물류센터는 하는 작업으로 분류되어 있습니다.
- 정렬 : 들어온 상품을 정렬 시킵니다.
- 집품 : 정렬된 상품을 정해진 카테고리에 따라 집품 합니다.
- 포장 : 집품된 상품을 포장 합니다.
- 상차 : 포장된 상품을 상차 시킵니다.

각각의 역할을 누가 하는지는 중요하지 않습니다.
함수형 물류센터에서는 누가 됐건 배정 받은 역할을 똑같이 수행하기만 하면 됩니다.

### 함수형 물류센터의 특징(순수함수의 특징)
함수형 물류센터의 특징은 순수함수의 특징이라고 볼 수 있습니다.
아래와 같은 특징을 가집니다.
1. 입력에 따라 결과를 출력합니다.
  - 곰인형이라는 입력을 받으면 포장된 곰인형을 내보냅니다.
  - 이는 절대로 다른 출력을 반환하지 않는 다는 의미 입니다.
2. 외부환경에 독립적이다.
  - 객체 지향 물류센터는 작업목록, 시간 같은 외부 요소가 있습니다.
  - 하지만 함수형은 곰인형이라는 한 가지외에 다른 요소는 없습니다.
3. 항상 같은 입력, 같은 출력
  - 강조를 위해 한 번 더 적었습니다.
  - 함수형은 언제나 입력 값과 출력 값이 같다는 것을 기억하세요.

### 함수형 물류센터의 장점
1. 각각 하는 일의 과정이 명확하다.
2. 같은 결과가 항상 반환됨을 보증할 수 있다.

## 함수형 프로그래밍
값을 가지고 수학적 함수를 적용해 계산을 진행하는 패러다임의 한 종류 입니다.
정의는 위와 같습니다. 이제 세부적인 내용을 살펴 보겠습니다.

### 함수형 프로그래밍의 특징
1. 변하지 않는다.
2. 선언적 이다.
  - '무엇'을 할지에 집중한다는 의미 입니다.
  - 예를 들어 '7 1 0 8'을 정렬하려고 할 때 '숫자들을 오름차순 정렬할거야'가 무엇을 할지에 해당합니다.

### 함수형 언어의 조건
1. 함수가 일급 객체(First-class object)여야 합니다.
  -  Literal이 존재 해야 합니다.
  -  람다식을 만족하고 고차함수여야 합니다.
2. 고차함수여야 합니다. 즉 함수를 인수로 제공하고 반환할 수 있어야 합니다.
  - 일급객체와 고차함수의 개념은 비슷할 수 있지만 분명 다릅니다.
  - 관련된 내용을 자세히 다루지는 않겠지만 찾아보시면 도움이 될 것 같습니다.
3. 함수를 런타임 시점에 생성할 수 있어야 합니다.
  - 프로그램의 실행 과정 중에 함수가 생성 될 수 있다는 것을 의미합니다.
  - 이 내용은 함수형 언어의 조건인지에 대한 논란이 있습니다.

### 함수형 프로그래밍 정의 해설
```
값을 가지고 수학적 함수를 적용해 계산을 진행하는 패러다임의 한 종류 입니다.
```
위에서 봤던 함수형 프로그래밍의 정의 입니다.
여기서 `값`이란 함수를 포함하는 개념입니다.
`수학적 함수`란 순수함수를 의미합니다.
`계산을 진행한다`의 의미는 함수들의 조합과 합성을 통해 프로그램을 만들 수 있다는 것을 의미합니다.

## 마무리
일단 함수형 프로그래밍에 대해서 7분정도 되는 영상을 내용을 담아 냈다는 것이 인상적이었습니다.
제시해 주신 내용들을 잘 알고 있다면 개념적으로 함수형 프로그래밍을 알고 있다고 말할 수 있을 것 같다는 생각이 들었습니다.
하지만 중간중간 의문이 드는 부분이 없었던 것은 아닙니다.
예를 들어 `객체지향 물류센터와 함수형 물류센터`의 예시가 그렇습니다.
제가 느끼기겐 제시해 주신 예가 크게 다르지 않다는 생각이 들었습니다.
두 예시 모두 `사람이 주체`였기 때문입니다.
그래서 저는 글을 작성할 때 `사람과 역할`로 구분지어 글을 작성했습니다.
어쨌든 함수형 프로그래밍에 대해 짧은 시간동안 알찬 정보를 제공받아 매우 의미있는 영상이었습니다.

---
## 참고
- [레오의 함수형 프로그래밍](https://m.youtube.com/watch?v=24tL6-YKz3I){: target="_blank"}


{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
