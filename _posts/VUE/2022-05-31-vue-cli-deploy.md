---
layout: post
title: "vue-cli 프로젝트 배포"
subtitle: ""
comments: true
categories : VUE
date: 2022-05-31
background: '/img/posts/06.jpg'
---

## 개요
회사에서 운영 업무를 진행하면서 배포환경에 대한 궁금증이 생겼습니다. 기존 개발사에게 물어보니 죽어도 안알려주겠다는 마인드 더군요. 그래서 직접 공부하고 공유합니다.
vue-cli로 생성된 script(package.json)를 기준으로 분석 했습니다. 회사 개발환경을 기반으로 분석한 내용이라 비합리적인 부분이 있을 수 있음을 감안하고 봐주시기 바랍니다.

## 1. npm run dev
용도 : 현재 가지고 있는 프로젝트의 소스를 기반으로 서버를 실행 시키는 스크립트


{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
