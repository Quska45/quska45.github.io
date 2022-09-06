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
  console.log( this );
}

function showThisStrictMode(){
  'use strict'
  console.log( this );
}

showThis(); // window 객체
showThisStrictMode() // undefined
```
가장 기본적인 바인딩을 확인하기 위해서는 함수를 단독 실행해보면 됩니다.
엄격/비엄격 모드에 따라 결과가 달라지는 것도 확인 할 수 있네요.
위의 코드는 웹 환경입니다.
노드 환경에서의 this도 한 번 확인 해보겠습니다.
<br/>
<br/>
```javascript
function showThis() {
  console.log( this );
}

showThis(); // object [global]
console.log( this ); // {}
console.log( this === module.exports ); // true
```
노드 환경도 기본적으로 비슷하지만 조금 다른 점이 있습니다.
함수를 단독 실행 했을 때 this는 우리의 예상대로 전역 객체입니다.
하지만 전역에서 확인한 this는 빈객체가 나옵니다.
이는 그냥 빈객체가 아니라 module.exports와 정확히 동일한 객체라는 것을 확인 할 수 있습니다.

### 2-2. 암시적 바인딩
아래 코드는 객체의 메서드로서 호출되는 함수에서 this가 어떻게 바인딩 되는지를 확인 할 수 있습니다.
```javascript
const obj = {
  name: 'beuccol,
  getName() {
    return this.name;
  }
};

console.log( obj.getName() ); // beuccol
```
this는 obj의 컨텍스트이고 this.name은 obj.name 이라는 것을 쉽게 예상할 수 있습니다.
하지만 코드를 조금 변경해보면 this를 예상하는 것이 간단하지만은 않습니다.
<br/>
<br/>
```javascript
const obj = {
  name: 'beuccol,
  getName() {
    return this.name;
  }
};

function showReturnValue( callback ) {
  console.log( callback() );
}

console.log( obj.getName() ); // undefined
```
showReturnValue 함수는 obj.getName 메서드를 인자로 받아서 그대로 실행했지만 출력된 결과가 달라졌습니다.
왜 이런 결과가 생기게 됐을까요?
이유는 `.`연산 때문입니다.
Object.function()과 같이 함수를 호출하게 되면 `참조 타입(Reference Type)`이라는 특별한 타입을 반환해줍니다.
참조 타입은 다음과 같이 구성되어 있습니다.
```
(base, name, strict)

base: 객체
name: 프로포티 이름
strict: 엄격모드 true

ex> obj.getName (obj, getName, true)
```
암시적 연산을 조금 더 디테일하게 분석하면 이 `참조 타입`을 통해 this를 바인딩 합니다.
참조타입에 대해서 알게 됐으니 undefined를 출력했던 코드를 다시 보겠습니다.
```javascript
obj.getName(); // 참조 타입을 통해 암시적 바인딩

function show ReturnValue( callback ){ // 함수의 참조값만 전달
  callback(); // 단독 실행
}
```
이제 callback에 무슨일이 일어났는지 알 것 같습니다.
obj.getName은 참조 타입을 통해 암시적 바인딩이 일어났지만 callback은 단독 실행을 통해 기본 바인딩이 일어 났습니다.
여기서 일어난 기본 바인딩은 함수안에서의 기본 바인딩이기 때문에 전역 객체가 아닌 undefined가 출력된 것도 볼만한 가치가 있는 것 같네요.
추가로 위 코드를 통해 알 수 있는 것은 겨우 한 다리를 더 거쳤을 뿐인데 this가 우리의 의도대로 바인딩되지 않는 다는 점 입니다.
이걸 해결할 방법은 없는 걸까요?

### 2-3. 명시적 바인딩
당연히 방법이 있습니다.
call, apply, bind 메서드를 사용하면 됩니다.
이를 통해 this가 소실되지 않도록 할 수 있습니다.
```javascript
call( context, arg1, arg2, ... )
apply( context, args )
```
context 자리에는 this를 바인딩 하려는 객체를 넣어주면 됩니다.
call과 apply는 기본적으로 동일한 기능을 하는 메서드 입니다.
다만 call은 인자를 하나씩 따로 넣을 수 있는 형태이고 apply는 인자를 배열의 형태로 전달합니다.
<br/>
<br/>
bind의 목적도 call, apply 처럼 명시적 바인딩 입니다.
다른점은 call, apply가 1회성으로 함수를 호출해서 명시적 바인딩을 해줬다면,
bind는 컨텍스트 자체에 바인딩을 해서 this를 아예 변경 해줍니다.
```javascript
bind( context, arg1, arg2 )
```
코드의 형태 자체는 call, apply와 동일합니다.













---
## 참고
- [브콜의 This](https://m.youtube.com/watch?v=7RiMu2DQrb4){: target="_blank"}


{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
