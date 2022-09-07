---
layout: post
title: "nextjs getInitailProps 사용법"
subtitle: "향로님 짱"
comments: true
categories : React
date: 2022-09-06
background: '/img/posts/06.jpg'
---

# 소개
유투브에서 개발관련된 영상을 보시는 분이라면 다 아실만한 향로님이 작성한 글을 바탕으로 개인적인 공부를 위해 글을 작성합니다.
대부분 카피 수준이겠지만 개인적인 경험이나 이해를 조금은 반영합니다.
nextjs에서 사용하는 것을 전제로 하여 작성합니다.
목차는 아래와 같습니다.
```
```

## 1. getInitialProps 소개
getInitialProps는 data fetching을 위해 사용합니다.
서버사이드 렌더링을 하는 nextjs는 각 페이지 마다 사전에 불러와야 하는 데이터가 있는데, 이때 getInitialProps를 통해 data fetching을 해주는 것입니다.
참고로 react, vue 처럼 client side Rendering은 useEffect, created 함수를 이용해서 data fetching을 하고 있으니,
nextjs에 익숙하지 않으신 분들은 getInitialProps의 역할을 이해하는데 참고하시기 바랍니다.
원래는 getInitialProps 하나만 사용했지만 next v9 이상에서는 getStaticProps, getStaticPaths, getServerSideProps를 사용하도록 가이드 합니다.
각 특성이 있지만 지금은 역할에 따라 기능이 더욱 세분화 되었다는 정도로 생각하셔도 좋을 것 같습니다.
순서대로 설명 드리겠습니다.

### 1-1. getInitialProps를 사용하지 않는 이유
결과적으론 성능의 문제 때문이라고 생각하시면 될 것 같습니다.
만약 모든 페이지에 공통적인 데이터 패칭이 필요하다면 getInitialProps를 통해 _app.js에서 전역적 데이터를 패칭 하는 식으로 사용할 것 입니다.
이 방식은 SSR 계산없이 페이지를 정적 HTML으로 사전 렌더링 해서 최적화를 하는 자동 정적 최적화(Automatic Static Optimization)을 비활성화 시킵니다.
따라서 모든 페이지가 SSR로 제공 됩니다.
SSG(Static Site Generation)으로 성능을 개선할 수 있는 화면들이 있어도 무조건 SSR을 사용하게 되는 것입니다.
따라서 각 용도에 맞는 세분화된 메서드가 만들어진 것 입니다.

### 1-2. getStaticProps
getStaticProps의 간단한 설명을 먼저 보겠습니다.
```
Fetch data at build time, pre-render for static generation 
getStaticProps only runs at build time on server-side

빌드시에 고정되는 값입니다.
빌드 후에는 변경이 불가능합니다.
```
<br/>

이제 getStaticProps를 사용하는 코드를 제시드리겠습니다.
getSaticProps를 사용하여 props에 data를 fetching 하는 코드 입니다.
```javascript
function Blog({ posts }){
  return (
    <ul>
      {posts.map(posts => {
        <li>{posts.title}</li>
      })}
    </ul>
  );
}

export async function getSaticProps(){
  const res = await fetch( 'https://.../posts );
  const posts = await res.json();
  
  // By returning { props: posts }, the Blog component
  // will receive 'posts' as a prop at build time
  return {
    props: {
      posts
    }
  }
}

export default Blog;
```
`getStaticProps`는 변하지 않는 내용의 페이지를 렌더링 할 때 사용합니다.
만약 유저가 요청을 할 때마다 변해야 하는 데이터라면 사용하지 않는 것이 좋습니다.
왜냐면 빌드시에만 데이터를 가져오기 때문입니다.
추가적으로 쿼리 매개변수 또는 HTTP 헤더와 같이 요청 시에만 사용할 수 있는 데이터를 사용할 수 없는 것도 이유입니다.

### 1-3. getStaticPath
getStaticPath의 간단한 설명을 먼저 보겠습니다.
```
빌드 타임 때, 정적으로 렌더링할 경로를 설정 합니다.
이곳에 정의하지 않은 하위 경로는 접근해도 페이지가 뜨지 않습니다.
동적라우팅에서는 라우팅 되는 경우의 수를 따져서 하위로 넣습니다.

동적라우팅 ex> .pages/dyna/[dynamic].js : /dyna/동적인 값
```
<br/>
이제 코드를 보겠습니다.
동적라우팅을 사용하는 페이지에서 경로를 설정하는 코드입니다.
```javascript
// This function gets called at build time
export async function getStaticPaths() {
  return {
    // 빌드 타임 때 아래 정의한 /dyna/1, /dyna/2, ... /dyna/동적인 값 경로만 pre렌더링
    paths: [
      { params: { dynamic: 1 } },
      { params: { dynamic: 2 } },
      ...
      { params: { dynamic: '동적인 값' } }
    ],
    // 만들어지지 않은 것도 추후 요청이 들어오면 만들어 줄 지 여부
    fallback: true,
  }
}
```
`getStaticPaths(Static Generation)`은 동적라우팅 + getStaticProps를 원할 때 사용합니다.
페이지가 동적 라우팅을 쓰고 있고, getStaticProps를 쓰는 경우, getStaticPaths를 통해 빌드 타임 때 정적으로 렌더링할 경로를 설정해야 합니다.
여기서 정의하지 않은 하위 경로는 접근해도 화면이 뜨지 않습니다.
동적라우팅을 위한 코드를 작성할 때는 라우팅 되는 경우의 수를 하나씩 집어넣어줘야 합니다.

### 1-4. getServerSideProps
getServerSideProps의 간단한 설명을 먼저 보겠습니다.
```
Fetch data on each request. pre-render for Server-side Rendering
요청이 있을 때만다 데이터를 fetch 합니다.
서버사이드 렌더링을 위한 프리렌더 입니다.
각 요청에 따라 서버로부터 데이터를 가져 옵니다.
```
<br/>
이제 코드를 보겠습니다.
```javascript
function Page({ data }) {
  // Render data...
}

// This gets called on every request
export async function getServerSideOrios() {
  // Fetch data from external API
  const res = await fetch(`https://.../data`);
  const data = await res.json();
  
  // pass data to the page via props
  return {
    props: {
      data
    }
  }
};

export default Page;
```
`getServerSideProps`는 빌드와 상관없이, 페이지가 요청받을 때마다 호출되어 pre-redering 합니다.
SSR(Server Side Rendering) 개념으로 pre-render가 꼭 필요한 동적 데이터가 있는 페이지에 사용합니다.
매 요청마다 호출되기 때문에 성능은 getStaticProps에 비해 떨어지지만, 내용은 언제든지 동적으로 수정이 가능합니다.
따라서 '내 정보 화면' 처럼 데이터가 언제든 바뀔 수 있는 화면에 사용하는 것이 좋습니다.
getServerSideProps는 서버사이드에서만 실행됩니다.
절대로 브라우저에서 실행되지 않습니다.

## 2. 클라이언트 측에서 데이터 가져오기
지금까지는 서버사이드에서 데이터를 가져올 수 있는 방법에 대해서 알아봤습니다.
이제는 클라이언트에서 요청을 통해 데이터를 가져오는 방법도 알아보겠습니다.
지금까지 경험하셨던 클라이언트에서 요청을 보내 응답을 받는 코드와 크게 다르지 않다는 것을 알아두시고 보시면 좋을 것 같습니다.
먼저 nextjs에서 클라이언트 측에서 데이터를 가져올 때 어떤 과정을 거치는지 간단하게 제시드리겠습니다.
- 데이터가 없는 페이지를 즉시 표시합니다.
- 페이지의 일부는 정적 생성을 사용하여 미리 렌더링 할 수 있습니다.
- 누락 된 데이터에 대한 로드 상태를 표시 할 수 있습니다.
- 위의 과정을 먼저 거ㅣ고 클라이언트 측에서 데이터를 가져와 준비가 되면 표시 합니다.

### 2-1. SWR
next팀이 만든 라이브러리 입니다.
많이들 익숙하신 axios와 비슷한 역할을 해준다고 생각하시면 편할 것 같습니다.
간단한 샘플코드 부터 제시 드리겠습니다.
```javascript
import useSWR from 'swr'

function Profile() {
  const { data, error } = useSWR( '/api/user', fetch );
  
  if( error ) return <div>failed to load</div>
  if( !data ) return <div>loading...</div>
  return <div>hello {data.name}</div>
}
```
seo가 필요한 페이지라면 이런 방식이 아니라 getServerSideProps를 사용하는 것이 좋겠습니다.
하지만 클라이언트에서 데이터를 조회해서 사용해야 하는 경우라면 위와 같은 방식으로 개발 해야 합니다.









---
## 참고
- [next.js getInitialProps 사용법](https://kyounghwan01.github.io/blog/React/next/getInitialProps/){: target="_blank"}
- [Next.js의 데이터패칭 방식: getStaticProps, getStaticPath, getServerSideProps은 언제 사용하는가?](https://velog.io/@te-ing/Next.js%EC%9D%98-%EB%8D%B0%EC%9D%B4%ED%84%B0%ED%8C%A8%EC%B9%AD-%EB%B0%A9%EC%8B%9D-getStaticProps-getStaticPath-getServerSideProps%EC%9D%80-%EC%96%B8%EC%A0%9C-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94%EA%B0%80){: target="_blank"}

{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
