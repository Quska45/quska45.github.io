---
layout: post
title: "캡틴판교 HandBook Class"
subtitle: ""
comments: true
categories : TypeScript
date: 2023-03-27
background: '/img/posts/06.jpg'
---

### readonly
readonly 키워드를 사용하면 아래와 같이 접근만 가능합니다.
```javascript
class Developer {
    readonly name: string;
    constructor(theName: string) {
        this.name = theName;
    }
}
let john = new Developer("John");
john.name = "John"; // error! name is readonly.

// 위 코드와 동일한 기능이지만 코드를 줄일 수 있습니다.
class Developer {
  readonly name: string;
  constructor(readonly name: string) {
  }
}
```

### Accessor
타입스크립트는 객체의 특정 속성의 접근과 할당에 대해 제어할 수 있습니다.
이를 위해선 해당 객체가 클래스로 생성한 객체여야 합니다.

```javascript
class Developer {
  private name: string;
  
  get name(): string {
    return this.name;
  }

  set name(newValue: string) {
    if (newValue && newValue.length > 5) {
      throw new Error('이름이 너무 깁니다');
    }
    this.name = newValue;
  }
}
const josh = new Developer();
josh.name = 'Josh Bolton'; // Error
josh.name = 'Josh';
```

참고로 get만 선언하고 set을 선언하지 않는 경우에는 자동으로 readonly로 인식 됩니다.

### Abstract Class
인터페이스와 비슷한 역할을 하지만 조금 다른 특징을 가지고 있습니다.
추상 클래스는 특정 클래스의 상속 대상이 되는 클래스이며 좀 더 상위 레벨에서 속성, 메서드의 모양을 정의합니다.

```javascript
abstract class Developer {
  abstract coding(): void; // 'abstract'가 붙으면 상속 받은 클래스에서 무조건 구현해야 함
  drink(): void {
    console.log('drink sth');
  }
}

class FrontEndDeveloper extends Developer {
  coding(): void {
    // Developer 클래스를 상속 받은 클래스에서 무조건 정의해야 하는 메서드
    console.log('develop web');
  }
  design(): void {
    console.log('design web');
  }
}
const dev = new Developer(); // error: cannot create an instance of an abstract class
const josh = new FrontEndDeveloper();
josh.coding(); // develop web
josh.drink(); // drink sth
josh.design(); // design web
```




---
## 참고
- [Class](https://joshua1988.github.io/ts/guide/operator.html#union-type%EC%9D%98-%EC%9E%A5%EC%A0%90){: target="_blank"}


{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
