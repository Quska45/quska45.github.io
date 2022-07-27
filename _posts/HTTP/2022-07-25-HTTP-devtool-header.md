---
layout: post
title: "크롬 개발자 도구로 보는 HTTP 헤더"
subtitle: ""
comments: true
categories : HTTP
date: 2022-07-25
background: '/img/posts/06.jpg'
---

# 소개
개발자 도구의 Network 탭을 활용해서 여러가지 정보들을 알 수 있습니다.
원래도 굉장히 유용하게 사용하고 있었는데 개발자 도구를 보면서 정리해 놓은 좋은 글을 발견했습니다.
개인적으로는 개발자 도구에 기반해서 작성된 글이라기 보다는 HTTP 헤더에 대해 여러가지를 언급해주시고 설명해주신 글이라는 느낌을 받았습니다.
어쨌든 어디선가 들어봤고 공부했었던 것들을 많이 언급해주신 글이라 도움이 많이 되었습니다.
[이 글](https://velog.io/@pixelstudio/%ED%81%AC%EB%A1%AC-%EA%B0%9C%EB%B0%9C%EC%9E%90-%EB%8F%84%EA%B5%AC%EB%A1%9C-%EB%B3%B4%EB%8A%94-HTTP-%ED%97%A4%EB%8D%94-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0)을 참고하여 공부를 위해 작성했습니다.

## HTTP 헤더란?
HTTP 메시지 중 클라이언트와 서버의 요청, 응답에 포함 된 정보라고 할 수 있습니다.
대소문자를 구분하지 않는 이름, 콜론, 값으로 이루어져 있습니다.
쿠키나 세션방식의 인증방식을 사용할 때 토큰을 헤더에 실어 전달합니다.

## 시작 줄(Start Line)
HTTP 메시지의 구성상 첫 번째에 있다는 점은 요청(request)과 응답(response)이 동일하지만 명칭 자체는 다르게 사용합니다.
요청은 `요청라인`이라고 하고 응답은 `상태라인`이라고 합니다.
`요청`은 다음의 3가지 정보로 구성됩니다.
- 1.HTTP 메서드(ex> GET, POST ...)
- 2.요청의 타겟 URL(ex> /search?id=hello)
- 3.HTTP 프로토콜의 버전(ex> HTTP/1.1)

`응답`은 다음의 3가지 3가지 정보로 구성쇱니다.
- 1.HTTP 프로토콜의 버전
- 2.요청의 성공 여부에 대한 상태코드(ex> 200, 404, 302)
- 3.상태 텍스트(ex> Not Found)

## 공통 헤더(General Header)
- Date : HTTP 메시지가 만들어진 시간
- Connection : HTTP/1.1을 사용한다면 기본적으로 Heep-alive로 적용되어 있습니다. 접속 유지 여부기 때문에 크게 의미를 두지 않으셔도 괜찮습니다.

### Cache-Control을 알기전에 브라우저의 캐시란 무엇인가?
간단히 얘기하면 정적 리소스(HTML, Image, css, js) 한 번만 내려받고 저장해서 사용하는 것을 말합니다.

### Cache-Control
HTTP/1.1 부터 도입된 헤더이며, 여러가지 옵션이 존재합니다.
옵션 끼리는 적용에 대한 선후관계가 있기 때문에 캐시를 사용해야 하는 상황이시라면 관련된 내용을 [다루는 글](https://quska45.github.io/http/2022/07/20/cache.html)을 읽어보시는 것을 추천 드립니다.
- no-cache : 브라우저가 캐시를 참조하지 않고, 서버에 대해 컨텐츠 유효성을 검사하도록 지시한다. 즉 서버에서 캐시 저장여부를 물어본다.
- no-store : 아무것도 캐싱하지 않겠다는 내용.
- must-revalidate : 만료된 캐시만 서버에 확인을 받도록 한다.
- public : 컨텐츠를 공개한다. 브라우저 외에 중개 서버에 저장 허용.
- private : 특정 사용자 환경(오직 브라우저)에만 캐시저장 허용
- 


## 참고
- [크롬 개발자 도구로 보는 HTTP 헤더 알아보기](https://velog.io/@pixelstudio/%ED%81%AC%EB%A1%AC-%EA%B0%9C%EB%B0%9C%EC%9E%90-%EB%8F%84%EA%B5%AC%EB%A1%9C-%EB%B3%B4%EB%8A%94-HTTP-%ED%97%A4%EB%8D%94-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0){: target="_blank"}

--- 

{% highlight ruby linenos %}
{% endhighlight %}

{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
