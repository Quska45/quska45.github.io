---
layout: post
title: "TypeScript:HandBook 1.The Basics"
subtitle: ""
comments: true
categories : TypeScript
date: 2023-03-26
background: '/img/posts/06.jpg'
---

### 정적 타입 검사
코드를 실행하기 전에 버그를 미리 발견할 수 있는 방법 혹은 역할 이라고 표현 할 수 있습니다.
우리가 작성한 프로그램에서 사용된 값을의 형태와 동작을 설명합니다.
이런 정보를 활용하여 프로그램이 제대로 작동하지 않을 때 우리에게 알려줍니다.
다음과 같은 예시가 있을 수 있습니다.

```javascript
const message = 'Hello';
message(); // This expression is not callable. Type 'String' has no call signatures.
```

### 예외가 아닌 실행 실패
다른 언어에서는 예외가 발생할만한 상황이지만 자바스크립트에서는 아닌 경우가 있습니다.
다음과 같은 예시 입니다.

```javascript
const user = {
  name: "Daniel",
  age: 26,
};
user.location; // undefined 를 반환
```
아마 대부분의 언어에서 위와 같은 상황에 예외가 발생될 것 입니다.
하지만 자바스크립트는 그렇지 않기 때문에 개발자가 예상할 수 없는 더 큰 문제가 될 가능성이 있습니다.
타입스크립트는 위와 같은 상황에 예외(실행 실패)를 발생시켜 줍니다.
하지만 이것 또한 코드를 작성하는 단계에서만 확인 가능합니다.
타입스크립트의 런타임에 대한 기본적인 룰은 자바스크립트를 따르기 때문에 위와 같이 오류가 있을만한 상황에서도 실행 자체는 가능합니다.

### 프로그래밍 도구로서의 타입
자동완성과 같은 편의 기능을 제공한다는 의미 입니다.
위 예시의 user 객체만 알고 있으면 name, age를 기억할 필요 없이 자동완성을 통해 해당 속성에 접근 할 수 있습니다.
다만 이런 자동완성에 대한 기능은 vsCode, webstrom과 같은 개발툴의 역할이 아주 크다는 것도 알고 계시면 좋을 것 같습니다.

### tsc, TypeScript 컴파일러
TypeScript의 컴파일러 입니다.
TypeScript 코드를 자바스크립트 코드로 변환 시켜 줍니다.

### 명시적 타입
TypeScript를 사용해 명시적인 타입을 지정해 보겠습니다.

```javascriopt
function greet( person: string, date: Date ) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}
```

위와 같은 명시적 타입 지정은 TypeScript의 아주 기본적인 사용 예 입니다.
기본적인 만큼 아주 많이 사용되고 강력하다는 것을 알아두세요.
이때 명시적 타입지정을 꼭 활용할 필요는 없는 경우도 다수 있습니다.

```javascrip
let msg = 'hello there!'; // let msg: string
```
위의 예시 코드에서 msg는 자동으로 string 타입으로 지정됩니다.
많이 활용되는 코드 기본형이니 이것도 알아두시기 바랍니다.

### 지워진 타입
명시적 타입에서 봤던 타입스크립트 코드는 컴파일 후 다음과 같은 자바스크립트 코드가 됩니다.

```javascript
"use strict";
function greet(person, date) {
    console.log("Hello ".concat(person, ", today is ").concat(date.toDateString(), "!"));
}
greet("Maddison", new Date());
```
타입스크립트 코드와 백틱키워드가 없어졌다는 것을 알 수 있습니다.
타입스크립트는 엄밀히 말해 자바스크립트가 아닙니다.
따라서 브라우저에서 실행될 수 없기 때문에 위와 같은 컴파일의 과정이 반드시 필요 합니다.

### 다운레벨링
더 낮은 버전의 코드로 변환되는 것을 의미합니다.
'지워진 타입'의 코드 예시를 보면 백틱키워드도 없어진 것을 알 수 있습니다.
이는 타입스크립트가 ES3를 기본 타겟으로 하기 때문입니다.
따라서 비교적 최신 버전에 추가된 백틱키워드 또한 더 낮은 버전에는 없기 때문에 컴파일에 대상이 된 것 입니다.
따라서 <strong>--target es2015</strong>와 같은 키워드로 특정 버전을 지정해주면 다운레벨링이 일어나지 않을 수도 있습니다.

### 엄격도
얼마나 빡세게 타입을 검사할지에 대한 용어 입니다.
여러가지 상황과 사용자의 편의를 위해 이런 엄격도를 설정할 수 있습니다.
대표적으로 <strong>noImplicitAny</strong>와 <strong>strictNullChecks</strong>가 있습니다.

---
## 참고
- [TypeScript HandBook : The Basics](https://www.typescriptlang.org/ko/docs/handbook/2/basic-types.html){: target="_blank"}


{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
