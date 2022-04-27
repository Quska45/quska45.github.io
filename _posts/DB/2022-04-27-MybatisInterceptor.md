---
layout: post
title: "Mybatis Interceptor"
subtitle: ""
comments: true
categories : DB
date: 2022-04-27
background: '/img/posts/06.jpg'
---

## 정리하는 이유
 * 업무 중 VOC로 '이건 할 수 없습니다.' 라는 내용으로 알림창이 뜨면서 특정 기능을 사용불가 하다는게 올라왔습니다. 위 알림은 다국어 처리가 되어 있는 내용이었는데 해당하는 다국어가 Mybatis Interceptor 쪽에만 있어 뭐가 문제인지 확인하는데 어려웠습니다. 이건 알아놓으면 좋을 것 같아 정리 합니다.

## Mybatis Interceptor?
 * Interceptor 라는 단어가 붙는 것에서 알 수 있듯이 Mybatis를 사용하여 데이터를 조회 할 때 쿼리가 실행되는 시점의 전후에 개발자가 원하는 기능을 추가로 실행될 수 있게 한다.

## 사용방식
 * 구글에 검색 해보면 쿼리 로그를 다루는 걸 많이 사용하는 것 같습니다. 역시 Interceptor 예시로 가장 만만한건 로그 인거 같네요.
 * 




{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}