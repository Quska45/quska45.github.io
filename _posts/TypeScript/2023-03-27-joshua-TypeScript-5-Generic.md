---
layout: post
title: "캡틴판교 HandBook Generic"
subtitle: ""
comments: true
categories : TypeScript
date: 2023-03-27
background: '/img/posts/06.jpg'
---

### 개요
c#, java 등의 언어에서 재사용성이 높은 컴포넌트를 만들 때 자주 활용되는 특징 입니다.
특히, 한가지 타입보다 여러 가지 타입에서 동작하는 컴포넌트를 생성하는데 사용됩니다.

### 제네릭의 한 줄 정의와 예시
제네릭이란 타입을 마치 함수의 파라미터 처럼 사용하는 것을 의미합니다.

```javascript
function getText<T>(text: T): T {
  return text;
}

getText<string>('hi'); // return 'hi'
getText<number>(10); // return 10
getText<boolean>(true); // return true
```

위와 같이 특정타입을 <> 안에 전달하는 것으로 코드가 실행될 때 타입이 정해지도록 할 수 있습니다.

### 제네릭을 사용하는 이유
타입추론이 가능한 코드를 유연하게 작성할 수 있기 때문입니다.
다음의 예시를 보겠습니다.

```javascript
function logText(text: any): any {
  return text;
}

function logText<T>(text: T): T {
  return text;
}
```

위의 코드는 기능적으로 동일합니다.
어떤 타입이든 인자로 받아서 리턴해주는 기능을 수행합니다.
결정적인 차이는 any를 사용한 코드는 인자로 어떤 타입이 들어오고, 어떤 타입이 리턴되는지 전혀 알 수 없습니다.
하지만 제네릭으로 작성된 코드는 어떤 타입이 사용되는지 정확히 알 수 있습니다.
제네릭으로 선언한 함수는 2가지 방법으로 호출 할 수 있습니다.

```javascript
// #1
const text = logText<string>("Hello Generic");
// #2
const text = logText("Hello Generic");
```

2번째가 흔히 사용되지만, 모든 곳에 적용가능한 것은 아닙니다.

### 제네릭 타입 인터페이스
인터페이스에서도 제네릭을 사용할 수 있습니다.

```javascript
interface GenericLogTextFn<T> {
  (text: T): T;
}
function logText<T>(text: T): T {
  return text;
}
let myString: GenericLogTextFn<string> = logText;
```

참고로 이넘과 네임스페이스는 제네릭으로 생성할 수 없습니다.

### 제네릭 타입 클래스
클래스에서도 제네릭을 사용할 수 있습니다.

```javascript
class GenericMath<T> {
  pi: T;
  sum: (x: T, y: T) => T;
}

let math = new GenericMath<number>();
```

### 제네릭 extends
제네릭에 대해 extends 키워드를 활용해 특정 속성 값을 가지도록 강제할 수 있습니다.

```javascript
interface LengthWise {
  length: number;
}

function logText<T extends LengthWise>(text: T): T {
  console.log(text.length);
  return text;
}

logText(10); // Error, 숫자 타입에는 `length`가 존재하지 않으므로 오류 발생
logText({ length: 0, value: 'hi' }); // `text.length` 코드는 객체의 속성 접근과 같이 동작하므로 오류 없음
```

객체 자료형과 함께 사용하여 제네릭의 유연함을 가져가고, 일부 타입은 강제할 수 있는 유용한 방식 입니다.

### 제네릭 간의 타입 강제
제네릭을 2개 사용할 때 하나의 제네릭이 다른 제네릭에 영향을 주도록 만들 수도 있습니다.

```javascript
function getProperty<T, O extends keyof T>(obj: T, key: O) {
  return obj[key];  
}
let obj = { a: 1, b: 2, c: 3 };

getProperty(obj, "a"); // okay
getProperty(obj, "z"); // error: "z"는 "a", "b", "c" 속성에 해당하지 않습니다.
```


---
## 참고
- [Generic](https://joshua1988.github.io/ts/guide/generics.html#%EC%A0%9C%EB%84%A4%EB%A6%AD-generics-%EC%9D%98-%EC%82%AC%EC%A0%84%EC%A0%81-%EC%A0%95%EC%9D%98){: target="_blank"}


{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
