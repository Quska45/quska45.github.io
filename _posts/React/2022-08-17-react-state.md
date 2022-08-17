---
layout: post
title: "무비의 React의 state(10분 테코톡)"
subtitle: ""
comments: true
categories : React
date: 2022-08-17
background: '/img/posts/06.jpg'
---

# 소개
우아한형제들의 유투브 채널인 `우아한Tech`에 올라온 React의 state에 관한 영상을 바탕으로 글을 작성합니다.
9:13초의 영상입니다.
목차는 아래와 같습니다.
```
1. React에서 state란?
2. 클래스형 컴포넌트의 setSatate
3. 함수형 컴포넌트의 useSatate
```

## React에서 state란?
일단 state의 정의는 `컴포넌트안에서 관리되는 일반 자바스크립 객체` 입니다.
즉, 그냥 객체라는 말입니다.
state는 객체일 뿐이지만 하는 역할은 정말 중요합니다.
차근차근 알아보도록 하겠습니다.

### 바닐라 스크립트 데이터바인딩 vs React 데이터 바인딩 예시
먼저 바닐라 스크립트 데이터 바인딩 부터 보겠습니다.
```javascript
let count = 0;

function handleClick() {
  count = count + 1;
  rerender();
}

function rerender(){
  const countText = document.getElementById('count-text');
  countText.textContent = `현재 count ? ${count}`;
}
```





---
## 참고
- [무비의 React의 state](https://m.youtube.com/watch?v=NpTizz_qgtA){: target="_blank"}


{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
