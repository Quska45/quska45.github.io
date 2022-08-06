---
layout: post
title: "nextjs 공식문서 튜토리얼 번역 보고 공부하기"
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
데이터를 가져오는 법을 배우기 앞서, Next.js의 중요한 개념인 `pre-rendering`에 대해 먼저 얘기해 보겠습니다.
<br>
기본적으로 Next.js는 모든 페이지를 프리렌더링 합니다. 이 말은, 클라이언트 사이드의 자바스크립트로 페이지에 대한 전체 HTML을 생성하는 대신에 각 페이지에 대한 HTML을 사전에 생성한다는 의미 입니다.프리렌더링은 퍼포먼스과 SEO의 측면에 있어 더 나은 결과를 가집니다.
<br>
생성된 HTML은 해당 페이지에 필요한 최소한의 자바스크립트 코드로 되어 있습니다. 페이지가 브라우저에 의해 로드될 때 페이지의 자바스크립트 코드가 실행되고 페이지를 완벽히 인터렉티브하게 만듭니다. 이 과정을 `hydration(수화)`라고 합니다.

### Check That Pre-rendering is Happening
프리렌더링이 발생하는 것을 확인하기 위해서는 과정이 필요합니다.
우선 브라우저의 자바스크립트가 작동되지 않게 하고 나서 페이지로 접근해보면 됩니다.
dldbsms Next.js가 자바스크립트 없이도 앱의 UI를 볼 수 있도록 하면서 앱을 HTML로 프리렌더링 하기 때문입니다.
이제는 Summary : Pre-rendering vs No Pre-rendering

### Pre-rendering(using Next.js)
![Pre-rendering](https://velog.velcdn.com/images%2Fjaewoneee%2Fpost%2Fa86e0ea0-d242-472f-ad9b-a14794992d19%2Fpre-rendering.png){: width="723"}
- Initial Load : 프리렌더링 된 HTML이 보여줍니다.
- Hydration : 리액트 컴포넌트가 초기화되고 앱이 인터렉티브 상태가 됩니다.
- 만일 당신의 앱이 `<Link />`와 같은 인터렉티브한 컴포넌트를 가지고 있다면, 해당 요소는 JS가 로드된 후에 활성화 됩니다.

### No Pre-rendering(Plain React.js app)
![No Pre-rendring](https://velog.velcdn.com/images%2Fjaewoneee%2Fpost%2Fe8d51f8a-fcb9-44b2-9017-3b98d05a0363%2Fno-pre-rendering.png){: width="723"}
- Initial Load : 앱이 렌더링되지 않습니다.
- Hydration : 리액트 컴포넌트가 초기화되고 앱이 인터렉티브 상태가 됩니다.

이제 Next.js의 두 가지 프리렌더링 형태를 알아 보겠습니다.

## 2. Pre-rendering and Data Fetching
Next.js는 정적 생성과 서버 사이드 렌더링이라는 두 가지 형태의 프리렌더링을 제공합니다. 이 둘의 차이점은 `언제 HTML이 생성되느냐` 입니다.
- 정적 생성(Static Generation)은 HTML을 빌드 타임에 생성하는 프리렌더링 방식입니다. 프리렌더링된 hTML은 매 요청마다 재사용됩니다.
- 서버 사이드 렌더링(Server-Side Rendering)은 HTML이 요청시에 생성되는 프리렌더링 방식입니다.

### Static Generation
The html is generated at build-time and id reused for each request.
![Static Generation](https://velog.velcdn.com/images%2Fjaewoneee%2Fpost%2F6a1751f2-fb56-4751-bac6-04de30189f77%2Fstatic-generation.png){: width="723"}

### Server-side rendering
The HTML is generated on each request.
![Server-side Rendering](https://velog.velcdn.com/images%2Fjaewoneee%2Fpost%2Fc3c3138b-f876-458b-89ba-b704558b6dd2%2Fserver-side-rendering.png){: width="723"}

```
참고로 개발모드에선 모든 요청시에 프리렌더링 됩니다. 정적 생성을 사용하는 페이지도 마찬가지 입니다.
```

### Per-page Basis
중요한 
The HTML is generated on each request.ㅈㅓㅁ은,
The HTML is generated on each request.  




---
## 참고
- [Next.JS 공식문서 튜토리얼 번역하며 공부하기 (2)](https://velog.io/@jaewoneee/NextJS-Next.JS-%EA%B3%B5%EC%8B%9D%EB%AC%B8%EC%84%9C-%ED%8A%9C%ED%86%A0%EB%A6%AC%EC%96%BC-%EB%B2%88%EC%97%AD%ED%95%98%EB%A9%B0-%EA%B3%B5%EB%B6%80%ED%95%98%EA%B8%B0-2){: target="_blank"}


{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
