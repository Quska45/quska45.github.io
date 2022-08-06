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
중요한 점은, Next.js는 각 페이지에 대한 렌더링 방식을 성택할 수 있도록 한다는 것입니다. 여러분은 배부분의 페이지를 정적 생성 방식으로 렌더링하고 나머지 페이지는 서버 사이드 렌더링 방식으로 렌더링 하는 '하이브리드'한 Next.js 앱을 만들 수 있습니다.
![하이브리드 렌더링 예시](https://velog.velcdn.com/images%2Fjaewoneee%2Fpost%2F53360988-f9de-4b56-acca-bc8954f705cc%2Fper-page-basis.png){: width="723"}

### When to Use Static Generation vs Server-side Rendering
가능하면 정적 생성 방식을 사용하는 것을 추천합니다. 왜냐면 요청 때마다 서버랜더링을 하는 것보다 빠르기 때문입니다.
다양한 종류의 페이지에 정적 생성 방식을 사용할 수 있습니다. 예시는 다음과 같습니다.
- 마케팅 페이지
- 블로그 포스팅 페이지
- 이커머스 상품 목록 페이지
- 도움말과 문서 페이지
만약 위의 예시와 같이 프리렌더링 되어야 하는 페이지가 있다면 정적 생성 방식을 선택하는 것이 좋습니다.
하지만 유저의 요청보다 먼저 프리렌더링 할 수 없는 페이지에 정적 생성을 사용하는 것은 좋지 않습니다.
여러분의 페이지가 꾸준히 업데이트 되는 데이터를 보여준다면, 페이지 컨텐츠는 요청 떄마다 바뀌어야 합니다.
이런 경우에 Server-side Rendering을 사용합니다. 
속도가 느릴 수는 있지만 프리렌더링 된 페이지는 항상 최신의 상태입니다.
아니면 프리렌더링을 건너뛰고 자바스크립트를 이용한 클라이언트 사이드 렌더링을 사용해도 됩니다.
이제 부터의 내용은 정적 생성에 중점을 두겠습니다.
데이터 유무에 따른 정적 생성 방식에 대해 얘기해 보겠습니다.

## 3. Static Generation With and Without Data
정적 생성은 데이터가 있든 없든 잘 작동합니다.
튜토리얼을 통해 제시된 예시 프로젝트는 외부 데이터를 가져올 필요가 없었습니다.
이런 페이지들은 앱이 배포를 위해 빌드될 때, 자동적으로 정적 생성 방식을 따릅니다.
![Static Generation without Data](https://velog.velcdn.com/images%2Fjaewoneee%2Fpost%2Fe91cbe06-00bf-4fb0-a684-c0993a6ec69f%2Fstatic-generation-without-data.png){: width="723"}
하지만 어떤 페이지는 외부 데이터 없이는 HTML 렌더링이 불가능할 수도 있습니다.
빌드 타임에 파일 시스템에 접근해야 될 수도, 외부 API를 가져와야 할 수도, 데이터 베이스 쿼리를 실행해야 할 수도 있습니다.
Next.js는 정적 생성 방식으로 이런 경우를 처리할 수 있도록 지원합니다.
![Static Generation with Data](https://velog.velcdn.com/images%2Fjaewoneee%2Fpost%2F856aaf7a-d5f5-4842-8914-25bd060b7dda%2Fstatic-generation-with-data.png){: width="723"}

### static Generation with Data using 'getStaticProps'
어떻게 그게 가능할까요? Next.js에서 페이지 컴포넌트를 export 할 때, getStaticProps라는 async함수도 export 할 수 있습니다.








---
## 참고
- [Next.JS 공식문서 튜토리얼 번역하며 공부하기 (2)](https://velog.io/@jaewoneee/NextJS-Next.JS-%EA%B3%B5%EC%8B%9D%EB%AC%B8%EC%84%9C-%ED%8A%9C%ED%86%A0%EB%A6%AC%EC%96%BC-%EB%B2%88%EC%97%AD%ED%95%98%EB%A9%B0-%EA%B3%B5%EB%B6%80%ED%95%98%EA%B8%B0-2){: target="_blank"}


{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
