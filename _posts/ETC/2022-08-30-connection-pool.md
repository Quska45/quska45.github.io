---
layout: post
title: "커넥션 풀(Connection pool)이란?"
subtitle: ""
comments: true
categories : ETC
date: 2022-08-30
background: '/img/posts/06.jpg'
---

# 소개
커넥션 풀에 대한 글입니다.
관련된 글을 찾아보면 스프링에서 사용하는 예시를 많이 볼 수 있는 것 같습니다.
이글에서는 스프링에서 커녁션풀을 어떻게 설정하고 만드는지 보다는 순수한 개념적인 내용을 정리하려고 합니다.
간단하고 짧은 글이니
목차는 아래와 같습니다.
```
1. 커넥션 풀(Connection Pool)이란?
2. 커넥션 풀 동작 과정
3. 커넥션 풀의 이점
```

## 1. 커넥션 풀(Connection Pool)이란?
웹 컨테이너(WAS)가 실행되면서 DB와 미리 connection(연결)을 해놓은 객체들을 pool에 저장해두었다가,
클라이언트 요청이 오면 connection을 빌려주고, 
처리가 끝나면 다시 connection을 반납받아 pool에 저장하는 방식을 말합니다.

## 2. 커넥션 풀 동작 과정
![connection pool 그림](https://linked2ev.github.io/assets/img/devlog/201908/cp-s1.png){: width="723"}

## 3. 커넥션 풀의 이점
외부 프로그램인 DB와 Connection을 맺는 과정은 부하가 많이 걸리는 과정입니다.
매 요청마다 이런 작업을 반복하는 것은 매우 비효율 적입니다.
따라서 Connection을 생성해 놓고 재활용하여 매우 효율적으로 DB접속을 사용할 수 있습니다.


---
## 참고
- [커넥션 풀(Connection pool)이란?](https://linked2ev.github.io/spring/2019/08/14/Spring-3-%EC%BB%A4%EB%84%A5%EC%85%98-%ED%92%80%EC%9D%B4%EB%9E%80/){: target="_blank"}

{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
