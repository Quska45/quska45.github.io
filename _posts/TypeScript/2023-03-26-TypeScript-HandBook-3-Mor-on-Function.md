---
layout: post
title: "TypeScript HandBook 3.More-on-Functions"
subtitle: ""
comments: true
categories : TypeScript
date: 2023-03-26
background: '/img/posts/06.jpg'
---

### 함수 타입 표현식
함수를 설명하는 가장 간단한 방법 입니다.

```javascript
function greeter(fn: (a: string) => void){
  fn('Hello, World');
}

function printToConsole(s: stirng){
  console.log(s);
}

greeter(printToConsole);
```

타입 별칭도 사용할 수 있습니다.
```javascript
type GreetFunction = (a: string) => void;
function greeter(fn: GreetFunction) {
  // ...
}
```

### 호출 시그니처
자바스크립트에서 함수는 호출이 가능할 뿐 아니라 프로퍼티도 가질 수 있습니다.
하지만 함수 타입 표현식 문법은 이를 허용하지 않기 때문에, 호출 시그니처를 이용해 이것을 가능하게 할 수 있습니다.

```javascript
type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};
function doSomething(fn: DescribableFunction) {
  console.log(fn.description + " returned " + fn(6));
}
```
함수 타입 표현식과 다르게 =>가 아닌 :를 사용하고 있다는 것을 알아두시면 좋겠습니다.




---
## 참고
- [TypeScript HandBook : Everyday Types](https://www.typescriptlang.org/ko/docs/handbook/2/functions.html){: target="_blank"}


{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
