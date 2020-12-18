---
layout: post
title: "스프링부트에서 mongodb merge문 사용하기"
subtitle: "공부 중"
comments: true
date: 2020-07-23 00:00:00 -0400
background: '/img/posts/06.jpg'
---


Jekyll 디렉터리 구조 파악하기
일부만 수정할 거라면 어떻게 디렉터리가 구성되어 있는지, 어떤 파일이 어떤 역할을 하는지 자세히 몰라도 상관 없다. 하지만 나의 경우 전반적으로 갈아엎어야 해서 Jekyll 디렉터리 구조를 알아야 했다. Jekyll의 기본 구조는 다음과 같다.

_config.yml
환경설정 정보를 담고 있다. head에 넣는 메타 정보3와 비슷한 정보를 담기도 하고 baseurl, url 등도 설정할 수 있다.
_drafts
아직 게시하지 않은, 날짜 정보가 없는 Post를 보관할 수 있는 디렉터리이다.
_includes
재사용할 수 있는 부분적으로 만들어진 html 파일을 보관할 수 있는 폴더이다. 예를 들면 header나 footer는 모든 곳에서 반복적으로 사용하기 때문에 include 폴더에 만들어놓고 가져다 쓰면 편하다. liquid 태그로 _include 안에 html을 소환할 수 있다.
_layouts
default.html 은 최상위 Jekyll Blog 구성을 담고 있는 파일이라고 볼 수 있다. _include 폴더 안에 부분적인 html 들이 소환되어 있다. post.html 은 Post의 형태를 정의해놓은 html 파일이다.
_posts
날짜별로 정렬되는 형태의 아이템이 모여있는 폴더이다. 파일명은 반드시 2018-01-28-title.md 형태를 띠어야 한다.
_data
블로그에 사용할 수 있는 데이터를 모아놓을 수 있는 폴더이다. 확장자가 .yml, .yaml, .json, .csv 일 경우 자동으로 읽어 들여서 site.data 변수를 써서 불러올 수 있다.
_site
Jekyll이 다른 디렉터리에 있는 모든 파일을 활용해서 Site로 자동 변환 작업을 마치면 그 파일들이 저장되는 폴더이다. _site 폴더 내 파일은 건드리면 안 된다.
index.html
블로그에 접속했을 때 제일 먼저 자동으로 보여주는 파일이다.


{%- if site.disqus.shortname -%}
    {%- include disqus.html -%}
{%- endif -%}