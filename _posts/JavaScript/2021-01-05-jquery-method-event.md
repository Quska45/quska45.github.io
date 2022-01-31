---
layout: post
title: "내가 보려고 정리하는 제이쿼리 메서드, 이벤트 등"
subtitle: ""
comments: true
categories : JavaScript
date: 2021-01-05
background: '/img/posts/06.jpg'
---

## Method
1. $.toggleClass( 'className' )
 - className에 해당하는 클래스가 있으면 삭제, 없으면 추가
 

## Event
1. $.on( 'mouseenter', callback )
 - 해당 객체의 마우스 호버 이벤트

2. $.on( 'mouseleave', callback )
 - 해당 객체의 마우스 아웃 이벤트

{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
