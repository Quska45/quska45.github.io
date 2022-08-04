---
layout: post
title: "nextjs 공식문서 튜토리얼 공부하기"
subtitle: "Pre-rendering and Data Fetching의 개념"
comments: true
categories : React
date: 2022-08-05
background: '/img/posts/06.jpg'
---

# 소개
nextjs를 공부해보신 분들이라면 아시겠지만 문서의 버전별로 다양한 번역본 들이 존재합니다.
안그래도 정말 잘 정리되어 있는 공식 튜토리얼을 더 보기 쉽게 번역해주신 분들 덕분에 공부하기가 훨씬 편했습니다.
번역을 올려주신 분들에게 정말 감사하다는 얘기를 드리고 싶습니다.
이 글은 튜토리얼의 내용 중 `Pre-rendering and Data Fetching` 내용 중 개념적인 내용을 다룹니다.

## 배우게 될 내용
- Next.js의 프리렌더링 기능
- 프리렌더링의 두 가지 형태 : 정적 생성 및 서버 사이드 렌더링
- 데이터가 있는 정적 생성, 데이터 없는 정적 생성
- getStaticProps를 사용하여 외부 블로그 데이터를 페이지로 import 해 오는 방법
- getStaticProps에 관한 유용한 정보

## 1. Pre-redering


---
## 참고
- [Next.JS 공식문서 튜토리얼 번역하며 공부하기 (2)](https://velog.io/@jaewoneee/NextJS-Next.JS-%EA%B3%B5%EC%8B%9D%EB%AC%B8%EC%84%9C-%ED%8A%9C%ED%86%A0%EB%A6%AC%EC%96%BC-%EB%B2%88%EC%97%AD%ED%95%98%EB%A9%B0-%EA%B3%B5%EB%B6%80%ED%95%98%EA%B8%B0-2){: target="_blank"}


{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
