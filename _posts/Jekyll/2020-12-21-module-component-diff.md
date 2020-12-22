---
layout: post
title: "모듈과 컴포넌트의 차이"
subtitle: ""
comments: true
categories : Jekyll
date: 2020-12-20
background: '/img/posts/06.jpg'
---


두 용어의 목적은 전체 시스템을 구성하는 부분 부분으로 분해시키는 것이다.

모듈 - 가장 맨 앞에 위치하는 구현의 단위. 

컴포넌트 - 런타임 개체. 독립적으로 배포될 수 있고 써드 파티로부터의 결합 대상.

ex) 서버와 클라이언트
 -  서버와 10개의 클라이언트 정보를 제공할 때 모듈은 2개지만 컴포넌트는 11개가 된다.


참고 : https://imcreator.tistory.com/7
{%- if site.disqus.shortname -%}
    {%- include disqus.html -%}
{%- endif -%}
