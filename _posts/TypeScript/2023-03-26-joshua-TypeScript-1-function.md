---
layout: post
title: "캡틴판교 HandBook Function"
subtitle: ""
comments: true
categories : TypeScript
date: 2023-03-26
background: '/img/posts/06.jpg'
---

### REST 문법이 적용된 매개변수
함수에 REST 문법을 적용시킨 타입스크립트를 다음과 같이 사용할 수 있습니다.

```javascript
function sum(a: number, ...nums: number[]): number {
  const totalOfNums = 0;
  for (let key in nums) {
    totalOfNums += nums[key];
  }
  return a + totalOfNums;
}
```

### this
타입스크립트에서 자바스크립트 함수에 this의 바인딩을 강제 하여 사용할 수 있습니다.
```javascript
interface Vue {
  el: string;
  count: number;
  init(this: Vue): () => {};
}

let vm: Vue = {
  el: '#app',
  count: 10,
  init: function(this: Vue) {
    return () => {
      return this.count;
    }
  }
}

let getCount = vm.init();
let count = getCount();
console.log(count); // 10
```

### 콜백에서의 this
콜백에서도 this를 강제하여 사용할 수 있습니다.

```javascript
interface UIElement {
  // 아래 함수의 `this: void` 코드는 함수에 `this` 타입을 선언할 필요가 없다는 의미입니다.
  addClickListener(onclick: (this: void, e: Event) => void): void;
}

class Handler {
    info: string;
    onClick(this: Handler, e: Event) {
        // 위의 `UIElement` 인터페이스의 스펙에 `this`가 필요없다고 했지만 사용했기 때문에 에러가 발생합니다.
        this.info = e.message;
    }
}
let handler = new Handler();
uiElement.addClickListener(handler.onClick); // error!
```



---
## 참고
- [타입스크립트에서의 함수](https://www.typescriptlang.org/ko/docs/handbook/2/functions.html){: target="_blank"}


{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
