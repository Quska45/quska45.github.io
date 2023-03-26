---
layout: post
title: "캡틴판교 HandBook Union Type"
subtitle: ""
comments: true
categories : TypeScript
date: 2023-03-27
background: '/img/posts/06.jpg'
---

### Union Type
자바스크립트의 OR 연산자 처럼 a이거나 b이다 라는 의미의 타입입니다.

```javascript
function logText(text: string | number){
  // ...
}
```

위 코드와 같이 logText의 인자로 string, number 두 가지 타입이 가능하도록 합니다.

### Union Type의 장점
유니온 타입의 장점은 타입을 제한하여 추론이 가능하도록 만들어 준다는 것 입니다.
```javascript
// any를 사용하는 경우
function getAge(age: any) {
  age.toFixe(); // 에러 발생, age의 타입이 any로 추론되기 때문에 숫자 관련된 API를 작성할 때 코드가 자동 완성되지 않는다.
  return age;
}

// 유니온 타입을 사용하는 경우
function getAge(age: number | string) {
  if (typeof age === 'number') {
    age.toFixed(); // 정상 동작, age의 타입이 `number`로 추론되기 때문에 숫자 관련된 API를 쉽게 자동완성 할 수 있다.
    return age;
  }
  if (typeof age === 'string') {
    return age;
  }
  return new TypeError('age must be number or string');
}
```

### Intersection Type
여러 타입을 모두 만족하는 하나의 타입을 의미합니다.

```javascript
interface Person {
  name: string;
  age: number;
}
interface Developer {
  name: string;
  skill: number;
}
type Capt = Person & Developer;
```

Capt 타입은 Person과 Developer의 속성을 모두 가지게 됩니다.
따라서 name, age, skill의 속성을 가집니다.


---
## 참고
- [Union Type](https://joshua1988.github.io/ts/guide/operator.html#union-type%EC%9D%98-%EC%9E%A5%EC%A0%90){: target="_blank"}


{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
