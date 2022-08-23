---
layout: post
title: "프론트엔드 웹 서비스에서 우아하게 비동기 처리하기"
subtitle: ""
comments: true
categories : JavaScript
date: 2022-08-22
background: '/img/posts/06.jpg'
---

# 소개
토스 유투브 채널인 `토스`에 올라온 프론트엔드의 비동기 처리에 관한 영상을 바탕으로 글을 작성합니다.
21:45초의 영상입니다.
목차는 아래와 같습니다.
```
```

## 1. 비동기 처리란?
`순서가 보장되지 않는 상황`이라고 설명할 수 있을 것 같습니다.
예를 들어 사용자 A가 요청 후 응답을 받지 않은 상황에서 사용자 B가 요청을 보낼 수 있는 것이 있습니다.
사용자 B에게 좋은 사용자 경험 제공하기 위해 필수적이라고 볼 수 있습니다.

## 2. 좋은 코드란 무엇일까?
비동기 처리에 대해서 본격적인 얘기를 하기 전에 좋은 코드란 무엇인지 생각해보는 시간을 가지면 좋을 것 같습니다.
영상의 제목인 `우아하게 비동기 처리하기`는 결국 좋은 비동기 처리 코드를 작성하는 것이니까요.

### 2-1. 코드 예시 A
```javascript
function getBazFromX(x){
  if( x == undefined ){
    return undefined;
  }
  
  if( x.foo == undefined ){
    return undefined;
  }
  
  if( x.foo.bar === undefined ){
    return undefined;
  }
  
  return x.foo.bar.baz;
}
```
x.foo.bar.baz에 안전하게 접근하기 위한 코드 입니다.
위 코드의 문제점을 생각해보겠습니다.
이 함수의 기능 자체는 아주 간단합니다.
특정 프로퍼티 값을 가져오는 것이죠.
하지만 기능에 비해 코드가 너무 길고 복잡합니다.
또한 프로퍼티를 가져온다는 핵심기능이 다른 코드에 가려져 한 눈에 파악하기가 어렵습니다.
위의 코드를 개선한 코드를 작성해보겠습니다.
```javascript
function getBazFromX(x){
  return x?.foo?.bar?.baz
}
```
최근 ECMAScript에 추가된 Optional Chaining 문법을 활용한 코드 입니다.
문제점을 개선하여 코드를 간결하게 만들고 핵심기능이 한 눈에 파악되도록 했습니다.

### 2-2. 코드 예시 B
```javascript
function fetchAccounts( callback ){
  fetchUserEntity((err, user) => {
    if( err != null ){
      callback( err, null );
      return;
    }
    
    fetchUserAccounts(user.no, (err, accounts) => {
      if( err != null ){
        callback( err, null );
        return;
      }
      
      callbakc( null, accounts );
    });
  });
}
```
위 코드는 Promise가 없던 시절 비동기 코드를 처리하기 위해 callback을 사용한 코드입니다.
조금 극단적인 예시일 수는 있겠지만 분명 위와 같은 형태로 짜여진 코드도 많았을 것 입니다.
이제 위의 코드의 문제점을 생각해 보겠습니다.
일단 가장 먼저 생각나는 것은 코드가 복잡하다는 점입니다. 
그럼 위의 코드는 왜 복잡해 보일까요?
사실 첫 번째 코드 예시와 크게 다르지 않은 이유입니다.
함수의 기능은 유저와 계좌 정보를 가져오는 단순한 기능이지만 한 눈에 파악하기 어렵습니다.
또 에러를 처리하는 기능이 중간 중간 들어가 있기 때문에 핵심기능을 파악하기 어렵습니다.
위의 코드를 개선해 보겠습니다.
```javascript
async function fetchAccounts(){
  const user = await fetchUserEntity();
  const accounts = await fetchUserAccounts(user.no);
  return accounts;
}
```
위 코드는 성공하는 경우만 다룰 수 있습니다. catch 절을 통해 실패를 처리하면 되니까요.
따라서 함수의 역할이 굉장히 명확해집니다.
에러처리 또한 외부에 위임할 수 있습니다.

### 2-3. 좋은 코드의 특징
1. 성공, 실패의 경우를 분리해 처리할 수 있다.
2. 비즈니스 로직을 한눈에 파악할 수 있다.

## 기존의 프론트엔드 비동기 처리
기존의 비동기 처리는 비동기를 처리하는 부분을 정의 했습니다.
이를 위해 SWR, react-query와 같은 라이브러리를 많이 활용했습니다.
```javascript
const { data, error } = useAsyncValue(() => {
  return fetchSomething();
})
```
위의 코드는 프로미스를 훅에 넘겨주고 프로미스의 상태 변화에 따라 훅이 반환하는 데이터, 에러값을 적절히 채워줍니다.
위와 같은 비동기처리를 통해 실제 컴포넌트는 아래와 같은 방식으로 개발 했습니다.
```javascript
function Profile(){
  const foo = useAsyncValue(() => {
    return fetchFoo();
  });
  
  if( foo.error ) return <div>로딩에 실패했습니다.</div>
  if( foo.data ) return <div>로딩 중 입니다..</div>
  return <div>{foo.data.name}님 안녕하세요!</div>
}
```
위 코드를 보시면 아마 예시코드가 생각 나실 것 같습니다.
코드가 복잡하다고 하기엔 짧은 코드긴 하지만 어쨌든 성공/실패에 대한 코드가 섞여 있습니다.
이는 핵심 기능을 가리고, 실패에 대한 처리를 외부에 위임시키기 힘들게 만듭니다.
좋은 코드는 핵심기능이 한눈에 확인 가능하고 성공/실패를 분리하는 것이 좋다는 것을 다시 한번 생각해보게 됩니다.
위와 같은 코드를 기반으로 여러개의 비동기가 실행되어야 한다면 코드는 더욱 복잡해집니다.
예시를 보겠습니다.
```javascript
function Profile(){
  const foo = useAsyncValue(() => {
    return fetchFoo();
  });
  
  const bar = useAsyncValue(() => {
    if( foo.error || foo.data ){
      return undified;
    }
    
    return fetchBar( foo.data );
  });
  
  if( foo.error || bar.error ) return <div>로딩에 실패했습니다.</div>
  if( !foo.data || !bar.data ) return <div>로딩 중 입니다..</div>
  return /* foo, bar를 이용한 적합한  */
}
```
위 코드 처럼 비동기 코드가 늘어날 수록 코드는 더욱 어려워집니다.
그럼 이런 문제를 어떻게 해결해야 할까요?

## React Suspense for Data Fetching
리액트가 제안하는 비동기 처리 방식입니다.
이것은 지금 까지 저희가 봤던 좋은 코드가 가지고 있는 특성을 리액트 컴포넌트에서도 사용하도록 하겠다는 개념입니다.
위에서 봤던 Profile 컴포넌트의 코드를 동기 코드로 바꿔보겠습니다.
```javascript
function Profile(){
  const foo = useMemo(() => fetchFoo());
  const bar = useMemo(() => fetchBar(foo), [foo]);
  
  return <div>{foo}{bar}</div>
}
```
위의 코드에서 useMemo는 동기적으로 작동한다고 가정하겠습니다.
async/await 처리된 비동기 코드도 위와 같은 형태가 될 것 입니다.
하지만 위의 코드는 로딩, 에러와 같은 로직이 없습니다.
React Suspense for Data Fetching은 이것을 어떻게 처리할까요?
먼저 코드를 보겠습니다.
```javascript
<ErrorBoundary fallback={<MyErrorPage />}>
  <Suspense fallback={<Loader />}>
    <Profile />
  </Suspense>
</ErrorBoundary>
```
위 코드에서 Profile 컴포넌트가 사용되었습니다.
Profile을 감싸고 있는 컴포넌트 들이 로딩과 에러를 처리해 주게 됩니다.
위의 코드는 마치 try catch 처럼 에러 처리를 분리할 수 있도록 합니다.
Profile에서는 성공에 대한 코드만을 작성하고 실제 로딩이나 에러에 대한 처리는 Profile을 사용하는 것에서 해주고 있습니다.

### 어떻게 사용할 수 있는가?
1. Recoil에서 사용하기 : Async Selector
2. SWR, React Query : { suspense: true }

### React Hooks
지금까지는 Suspense를 이용한 비동기 처리를 알아봤습니다.
비동기처리를 도와주는 것이 Suspense만 있는 것 같지만 Hooks 또한 비슷한 역할을 할 수 있습니다.
실제 상태 관리, 메모리제이션 등의 작업은 컴포넌트를 감싸는 React 프레임워크가 수행하도록 합니다.
Hooks의 useState, useMemo, userCallback, useEffect를 통해 특정 기능을 선언만 해주면 React가 처리해주는 것입니다.

### Suspense와 Hooks의 공통점
두 기술 모두 실제 컴포넌트는 비동기적인 리소스를 선언하여 사용하고,
실제로 로딩, 에러를 처리하는 것은 외부에서 할 수 있도록 해줍니다.
이는 우리가 계속 같이 봤던 좋은 코드를 만드는 방법 입니다.

### Algebraic Effects(대수적 효과)
Algebraic Effects(대수적 효과)는 Suspense와 Hooks 처럼 어떤 코드 조각을 감싸는 맥락으로 책임을 분리하는 방식입니다.

## 마무리
사실 영상의 모든 내용을 글에 적지는 않았습니다.
공감이 안되는 부분도 있었고 리액트 유저가 아니라 이해가 되지 않는 부분들도 있었기 때문입니다.
더 자세한 내용은 아래 링크의 원본 영상을 참고하시면 좋을 것 같습니다.




---
## 참고
- [SLASH 21 - 프론트엔드 웹서비스에서 우아하게 비동기 처리하기](https://m.youtube.com/watch?v=FvRtoViujGg){: target="_blank"}


{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
