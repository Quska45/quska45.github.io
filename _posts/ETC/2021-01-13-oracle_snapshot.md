---
layout: post
title: "오라클 스냅샷"
subtitle: ""
comments: true
categories : ETC
date: 2021-01-13
background: '/img/posts/06.jpg'
---

## 스냅샷?
 - 원격지 DB의 내용을 자신의 로컬 DB에 저장하려는 목적으로 사용된다.
 - DB의 복사본 이라고 생각하면 된다.
 - 생성시 옵션으로 주기적으로 refresh 할 수 있다.

## 스냅샷의 2가지 형태
 - simple, complex
 - simple snapshot
    - single remote table에 기반한다.
    - 혹은 제한 된 서브쿼리의 형태를 사용하여 많은 테이블에 정의 된다.
    - simple 스냅샷은 group by, joins 등 몇가지를 포함 할 수 없다.
 - complex snapshot
    - master database에 있는 많은 master tables에 기반할 수 있다.

{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}