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
  - 2-1. 변수 호이스팅
  - 2-2. 함수 호이스팅
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

## 2-1. 변수 호이스팅
변수 선언자인 `var, let, const`에 대해서 호이스팅이 어떻게 일어나는지 보도록 하겠습니다.
먼저 `var`의 과정 입니다.
먼저 코드를 다시 제시해 드리겠습니다.
```javascript
// Global

console.log(TVChannel); // undefined

var TVChannel = 'Netflix';

console.log(TVChannel); // Netflix
```

위의 코드에 대한 실행 컨텍스트가 만들어지고 실행되기 전에 개념적인 내용을 잠깐 소개 드리겠습니다.
`생성 단계`와 `실행 단계` 입니다.
- 생성 단계 : 실행 컨텍스트를 생성하고 선언문만 실행해서 Environment Record에 기록 하는 단계 입니다.
- 실행 단계 : 선언문 외 나머지 코드를 순차적으로 실행합니다. Environment Record를 참조하거나 업데이트 합니다.

그럼 이제 과정에 대해 알아보겠습니다.
1. 전역 컨텍스트를 생성해 콜스택에 넣습니다.
2. 전체 코드를 스캔하면서 TVChannel 변수가 등록 되는데, var로 선언됐기 때문에 undefined로 초기화 됩니다.
3. 코드를 실행합니다.
4. 첫번째 라인에서 실행된 코드는 TVChannel 변수에 바인딩된 값을 찾기 위해 현재 실행된 컨텍스트의 레코드를 참조 합니다.
5. 참조된 레코드에는 TVChannel이 있고 값은 undefined기 때문에 undefined를 출력합니다.
6. 두번째 라인의 코드가 실행되고, TVChannel 변수는 이미 선언 했으니 할당만 해줍니다.
7. 전역 컨텍스트의 record의 TVChannel의 값이 'Netflix'로 업데이트 되고 기록 됩니다.
8. 마지막 라인의 코드가 실행되고 이번엔 'Netflix'를 출력합니다.

위의 과정에서 1,2번은 생성단계라고 할 수 있습니다.
코드를 스캔하고 실행컨텍스트를 만들어 record에 기록했습니다.
이후의 과정은 실행 단계라고 할 수 있습니다.
코드를 실행하면서 record를 참조해 값을 출력하고 변경했습니다.
만약 위의 코드를 var 대신 const를 이용해서 작성하면 어떻게 될까요?
`var`로 선언하는 경우 변수를 undefined로 초기화 해줬지만 `const`는 초기화 없이 선언만 합니다.
따라서 `Reference Error`가 발생하게 됩니다.
이렇게 let, const를 사용하는 경우 `일시적 사각지대(Temporal Dead Zone)`이 생깁니다.
선언 이전에 식별자를 참조할 수 없는 구역을 의미 합니다.
자바스크립트가 이런 현상을 만들어내는 키워드를 추가한 이유는 일반적인 프로그래밍 방식을 지키기 위해서 라고 생각해볼 수 있겠습니다.

### 2-2. 함수 호이스팅
먼저 코드 예시를 드리겠습니다.

```javascript
// Global
study(); // Type error

var study = () => {
  // do study
}
```
변수 호이스팅과 작동 자체는 똑같습니다.
함수의 호이스팅이라고 했지만 함수를 표현식으로 작성했기 때문에 변수와 동일하게 작동합니다.
따라서 var 변수로 선언된 study 함수가 호출되는 시점에는 undefined로 초기화 되어 있어 Type Error가 발생합니다.
만약 const 변수를 사용하면 변수와 동일하게 초기화된 값이 존재 하지 않아 Reference Error가 발생하게 됩니다.

그럼 선언문으로 함수를 작성하면 어떻게 될까요?
먼저 코드 예시를 제시 드리겠습니다.
```javascript
study(); // 정상 실행

function study() {

}
```
위의 코드는 정상적으로 작동합니다.
자바스크립트에서 선언문으로 작성된 함수는 선언과 동시에 함수도 생성되도록 합니다.
언뜻 보면 좋아보이지만 선언전에 함수가 실행 됨으로써 혼란을 초래할 수 있어 주의할 필요가 있습니다.

## 3. Outer로 JS 스코프체이닝 이해하기
이제 Outer에 대해서 알아보겠습니다.

### 3-1. Outer?
Outer Enviconment Reference(외부 환경 참조) 입니다.
관련된 글을 찾아보시면 대부분의 글이 Outer라고 줄여서 사용하고 있습니다.
렉시컬 환경 또는 정적 환경이라고도 부릅니다.
이는 바깥 Lexical Environment를 참조 하고 있습니다.
앞에서 봤던 Record와 함께 Lexical Environment를 이루는 요소 중에 하나 입니다.
이제 코드를 함께 보면서 Outer가 어떻게 사용되고 왜 알아야 하는지 보도록 하겠습니다.

### 3-2. 코드로 알아보는 Outer
코드를 보시기 전에 하나 다시 말씀드리고 싶은 것이 있습니다.
Outer는 현재 자신이 속해 있는 Lexical Environment가 아닌 바깥의 Lexical Environment를 참조한 다는 것입니다.
이부분을 잘 생각하면서 코드를 보시면 좋을 것 같습니다.

```javascript
// Global Lexical Environment = 1F;
let lamp = 'off';

function goTo2F(){
  let lamp = 'on';
  
  console.log(lamp); // ?
}

goTo2F();
```
코드에 약간의 추상적 개념을 적용해주시면 좋을 것 같습니다.
코드의 주석에 적은 것 처럼 Global Lexical Environmanet를 1층이라고 생각해주세요.
Global의 lamp 변수는 1층에 있는 불이 꺼진 램프입니다.
goTo2F의 lamp 변수는 2층에 있는 불이 켜진 램프입니다.
여기서 
<br/>
<br/>
그럼 이제 코드가 어떻게 동작하는지 생각해보겠습니다.
goTo2F의 lamp는 켜진 상태입니다.
Global의 꺼진 램프는 Global의 상태고 2층엔 켜진 램프가 있기 때문입니다.
자바스크립트에서 이렇게 변수의 값을 선택해야하는 상황일 때 어떤 변수를 사용해야할지 결정하는 것을 `식별자 결정` 이라고 합니다.
`식별자 결정`은 말 그대로 코드에서 변수나 함수의 값이 어떤 것일지 결정하는 것을 말합니다.
저희가 2장에서 확인 했던 코드도 식별자 결정이 계속해서 일어나고 있었던 것을 알 수 있습니다.
식별자 결정은 이 영상에서 아주 중요한 키워드 입니다.
실행 컨텍스트에 의해 식별자 결정이 어떻게 이뤄지는지 알게 됐다면 이번 영상을 잘 이해했다고도 생각할 수 있겠네요.
<br/>
<br/>
```javascript
// Global Lexical Environment = 1F;
let lamp = 'off';

function goTo2F(){
  let lamp = 'on';
  let puppy = 'park';
  
  console.log(lamp); // on
  
  function goTo3F(){
    let puppy = 'hoon';
    
    console.log(puppy);
  }
  
  goTo3F();
}

goTo2F();
```
위와 같은 코드를 작성하는 것은 좋은 방법이 아니지만 예시를 위해 작성했음을 알려드립니다.
좋은 코드는 아니지만 goTo2F 안에서 새로운 실행 컨텍스를 만들었다는 점에 집중해주세요.







---
## 참고
- [하루의 실행컨텍스트](https://m.youtube.com/watch?v=EWfujNzSUmw){: target="_blank"}


{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
