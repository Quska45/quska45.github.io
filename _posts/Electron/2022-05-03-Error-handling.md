---
layout: post
title: "Electron에서 Error Handling"
subtitle: ""
comments: true
categories : Electron
date: 2022-05-03
background: '/img/posts/06.jpg'
---

## 소개
일렉트론에서 에러를 처리하는 방법에 대해서 정리하려고 합니다. electron-unhandled와 같은 패키지를 사용하는 글도 봤는데 저는 따로 사용하지 않고 처리하려고 합니다. 새로운 패키지의 사용법을 익히는 것보단 에러를 처리하는 방법에 대해서 스스로 고민 해보려고 합니다.

## process.on("uncaughtException", (err) => {});
노드에서 다음과 같이 핸들링 되지 않은 에러를 처리합니다. 저도 에러가 발생되면 'uncaughtException' 리스너로 모든 에러를 일단 받아놓고 에러처리를 위한 클래스를 통해서 에러를 해결해 보려고 합니다.


{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
