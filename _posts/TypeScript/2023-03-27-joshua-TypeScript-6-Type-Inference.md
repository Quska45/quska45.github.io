---
layout: post
title: "캡틴판교 HandBook Type Inference"
subtitle: ""
comments: true
categories : TypeScript
date: 2023-03-27
background: '/img/posts/06.jpg'
---

### 타입 추론(Type Inference)
타입 추론이란 타입스크립트가 코드를 해석해 나가는 동작을 의미합니다.

### 타입 추론의 기본
타입스크립트가 타입 추론을 해나가는 과정은 다음과 같습니다.

```javascript
let x = 3;
```

위와 같이 x에 대한 타입을 따로 지정하지 않더라도 x는 number로 간주됩니다.
이렇게 변수를 선언하거나 초기화 할 때 타입이 추론 됩니다.
이외에도 변수, 속성, 인자의 기본 값, 함수의 반환 값 등을 설정할 떄 타입 추론이 일어납니다.

### 가장 적절한 타입(Best Common Type)



---
## 참고
- [Type Inference](https://joshua1988.github.io/ts/guide/type-inference.html#%ED%83%80%EC%9E%85-%EC%B6%94%EB%A1%A0-type-inference){: target="_blank"}


{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
