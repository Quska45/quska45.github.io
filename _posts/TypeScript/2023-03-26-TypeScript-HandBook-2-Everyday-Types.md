---
layout: post
title: "TypeScript HandBook 2.Everyday-Types"
subtitle: ""
comments: true
categories : TypeScript
date: 2023-03-26
background: '/img/posts/06.jpg'
---

### 여러가지 타입
기본타입에 대한 내용들이 많습니다.
원문을 참고해주세요.

## 유니언 타입
기존의 타입을 기반으로 다양한 연산자를 사용하여 새로운 타입을 만들 수 있습니다.
타입들을 조합하여 흥미로운 방식으로 사용할 수 있습니다.

#### 유니언 타입 정의하기
타입을 조합하는 첫 번째 방법을 유니언 타입을 사용하는 것입니다.
서로 다른 두 개 이상의 타입을 사용해 만드는 것으로, 이 타입의 값은 조합에 사용된 타입 중 하나를 가질 수 있습니다.
조합에 사용된 각 타입은 유니언 타입의 멤버라고 부릅니다.

```javascript
function printId(id: number | string) {
  console.log("Your ID is: " + id);
}
// OK
printId(101);
// OK
printId("202");
// 오류
printId({ myID: 22342 });
```

#### 유니언 타입 사용하기
유니언 타입에 맞는 값을 제공하는 것은 간단합니다.
하지만 사용하는 것은 생각해볼 점이 있습니다.
만약 <strong>string | number</strong> 이라는 유니언 타입인 경우, string 타입에만 유효한 메서드는 사용할 수 없습니다.

```javascripot
function printId(id: number | string) {
  console.log(id.toUpperCase()); // error 발생
}
```

이를 해결하려면 코드상에서 유니언을 좁혀야 하는데, 이는 타입 표기가 없는 자바스크립트에서 벌어지는 일과 동일합니다.
이런경우엔 타입을 좁히는 방법이 필요하고 예시는 다음과 같습니다.

```javascript
function printId(id: number | string) {
  if (typeof id === "string") {
    // 이 분기에서 id는 'string' 타입을 가집니다
 
    console.log(id.toUpperCase());
  } else {
    // 여기에서 id는 'number' 타입을 가집니다
    console.log(id);
  }
}
```

### 타입 별칭
특정 타입을 미리 정의해놓고 사용하는 것을 의미합니다.
타입을 위한 이름을 제공하고 이를 사용할 수 있도록 합니다.
```javascript
type Point = {
  x: number;
  y: number;
}

function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
 
printCoord({ x: 100, y: 100 });
```

### 인터페이스
객체 타입을 만드는 또 다른 방법입니다.
```javascript
interface Point {
  x: number;
  y: number;
}
 
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
 
printCoord({ x: 100, y: 100 });
```


---
## 참고
- [TypeScript HandBook : Everyday Types](https://www.typescriptlang.org/ko/docs/handbook/2/everydat-types.html){: target="_blank"}


{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
