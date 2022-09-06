---
layout: post
title: "nextjs getInitailProps 사용법"
subtitle: "향로님 짱"
comments: true
categories : Node
date: 2022-09-06
background: '/img/posts/06.jpg'
---

# 소개
유투브에서 개발관련된 영상을 보시는 분이라면 다 아실만한 향로님이 작성한 글을 바탕으로 글을 작성합니다.
대부분 카피 수준이겠지만 개인적인 경험이나 이해를 조금은 반영합니다.
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

### 1-1. getStaticProps
```
Fetch data at build time, pre-render for static generation 
getStaticProps only runs at build time on server-side

빌드시에 고정되는 값입니다.
빌드 후에는 변경이 불가능합니다.
```
정의를 살펴봤습니다.
이제 getStaticProps를 사용하는 코드를 제시드리겠습니다.

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

getSaticProps를 사용하여 props에 data를 fetching 했습니다.

### 1-2. getStaticPath
```
빌드 타임 때, 정적으로 렌더링할 경로를 설정 합니다.
이곳에 정의하지 않은 하위 경로는 접근해도 페이지가 뜨지 않습니다.
동적라우팅에서는 라우팅 되는 경우의 수를 따져서 하위로 넣습니다.
```











---
## 참고
- [next.js getInitialProps 사용법](https://kyounghwan01.github.io/blog/React/next/getInitialProps/){: target="_blank"}


{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
