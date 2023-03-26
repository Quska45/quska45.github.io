---
layout: post
title: "캡틴판교 HandBook Interface"
subtitle: ""
comments: true
categories : TypeScript
date: 2023-03-26
background: '/img/posts/06.jpg'
---

## 개요
인터페이스는 상호 간에 정의한 약속 혹은 규칙을 의미합니다.
타입스크립트에서의 인터페이스는 보통 다음과 같은 범주에 대해 약속을 정의 할 수 있습니다.

### 인터페이스 맛보기
인터페이스를 적용한 간단한 코드 예시를 보겠습니다.

```javascript
interface personAge {
  age: number;
}

function logAge(obj: personAge) {
  console.log(obj.age);
}
let person = { name: 'Capt', age: 28 };
logAge(person);
```

logAge()의 인자가 더 명시적이 됐다는 것을 알 수 있습니다.
인자는 반드시 perAge라는 타입을 가져야만 합니다.
위 코드를 보고 알 수 있는 또 다른 점은 인터페이스 타입의 인자가 인터페이스 속성과 일치할 필요는 없다는 것입니다.
정의된 속성은 반드시 가져야 하지만 추가로 받는 것은 상관 없다는 것 입니다.

### 옵션 속성
인터페이스를 사용할 때 정의되어 있는 속성을 모두 이용하지 않을 수 있도록 하는 것을 말합니다.
물음표를 붙여서 사용합니다.

```javascript
interface 인터페이스_이름 {
  속성?: 타입;
}

interface CraftBeer {
  name: string;
  hop?: number;  
}

let myBeer = {
  name: 'Saporo'
};
function brewBeer(beer: CraftBeer) {
  console.log(beer.name); // Saporo
}
brewBeer(myBeer);
```

이런 식의 코드작성이 가능함으로서 개발자는 더 유연하고 깔끔한 코딩이 가능 합니다.

### 읽기 전용 속성
객체를 처음 생성할 때만 값을 할당하고 그 이후에는 변경할 수 없는 속성을 의미합니다.

```javascript
interface CraftBeer {
  readonly brand: string;
}

let myBeer: CraftBeer = {
  brand: 'Belgian Monk'
};
myBeer.brand = 'Korean Carpenter'; // error! 변경 불가.
```

### 읽기 전용 배열
배열을 선언할 때 ReadonlyArry<number> 타입을 사용해 만들 수 있습니다.

```javascript
  let arr: ReadonlyArray<number> = [1,2,3];
  arr.splice(0,1); // error
  arr.push(4); // error
  arr[0] = 100; // error. 모든 종류의 변경이 불가능 해집니다.
```


---
## 참고
- [인터페이스](https://joshua1988.github.io/ts/guide/interfaces.html#%EC%9D%B8%ED%84%B0%ED%8E%98%EC%9D%B4%EC%8A%A4){: target="_blank"}


{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
