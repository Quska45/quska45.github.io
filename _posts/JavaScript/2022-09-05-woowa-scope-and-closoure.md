---
layout: post
title: "엘라의 Scope & Closure(10분 테코톡)"
subtitle: ""
comments: true
categories : Node
date: 2022-09-05
background: '/img/posts/06.jpg'
---

# 소개
우아한형제들의 유투브 채널인 `우아한Tech`에 올라온 Scope & Closure에 관한 영상을 바탕으로 글을 작성합니다.
16:19초의 영상입니다.
목차는 아래와 같습니다.
```
1. 스코프
  - 1-1. 스코프란?
  - 1-2. 스코프 체인
  - 1-3. 스코프 종류
2. 클로져
```

## 1. 스코프
먼저 스코프가 무엇인지 관련된 내용들을 알아보겠습니다.

### 1-1. 스코프란?
스코프에 대해서 본격적으로 얘기 하기에 앞서 간단한 코드를 제시 드리겠습니다.
```javascript
function add( x, y ){
  console.log( x, y );
  return x + y;
}

add( 3, 6 );

console.log( x, y );
```








---
## 참고
- [엘라의 Scope & Closure](https://m.youtube.com/watch?v=PVYjfrgZhtU){: target="_blank"}


{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
