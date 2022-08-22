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




---
## 참고
- [SLASH 21 - 프론트엔드 웹서비스에서 우아하게 비동기 처리하기](https://m.youtube.com/watch?v=FvRtoViujGg){: target="_blank"}


{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
