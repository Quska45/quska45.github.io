---
layout: post
title: "Content-Type. 그리고 MIME-Type"
subtitle: ""
comments: true
categories : HTTP
date: 2022-08-25
background: '/img/posts/06.jpg'
---

# 소개
웹 개발을 하시다보면 필연적으로 `content-type`, `application/json`과 같은 것들을 보신 적이 있으실 겁니다.
이는 Content-Type과 관련된 요소들로 한 번 쯤 정리해 놓으면 헷갈릴 일이 잘 없는 내용입니다.
관련된 내용들을 알아보도록 하겠습니다.
목차는 아래와 같습니다.
```
```

## 1. Content-Type
서버가 클라이언트로 어떤 자원을 보낼 때, 웹 서버는 일련의 HTTP 헤더/바디로 파일이나 자원을 포함하는 바이트의 stream을 보냅니다.
이런 정보는 클라이언트에게 웹 서버와 커뮤니케이션에대한 세부사항을 전달해줍니다.
HTTP 헤더를 통해 전송되는 정보 중에 하나가 Content-Type입니다.
Content-Type을 통해 주고 받는 실제 값은 표준 MIMIE-Type의 하나 입니다.
지금 주는 값이 어떤 종류의 파일인지를 나타내는 값입니다.

## 2. MIME-Type
HTTP헤더를 통해 표준 MIME-Type을 알려주기 위해 Content-Type을 사용한다는 것을 알게 됐습니다. 
그럼 MIME-Type이 뭔지도 알아봐야 겠습니다.
MIME은 Multipurpose Internet Mail Extensions의 약자입니다.
이름에서 알 수 있듯이 메일 전송시 파일을 전송하기 위해 개발 되었지만 지금은 웹에서 여러형태의 파일을 전달하기 위해 사용하고 있습니다.
웹이 아주 단순하던 시절에는 text만 주고 받으면 됐습니다.
하지만 웹이 점점 복잡해지고 많은 기능을 요구하게 되면서 바이너리 파일을 보내고 싶어졌습니다.
하지만 이런 바이너리 파일들은 텍스트로 변환 후에 보내야만 합니다.
이를 위해서 바이너리 파일을 텍스트로 변환하는데 이를 `인코딩`이라고 표현합니다.
그리고 텍스트 파일을 다시 바이너리 파일로 변환하는 과정을 `디코딩`이라고 표현합니다.






---
## 참고
- [MIME-Type,Content-Type이란?](https://juyoung-1008.tistory.com/m/4){: target="_blank"}
- [](){: target="_blank"}


{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
