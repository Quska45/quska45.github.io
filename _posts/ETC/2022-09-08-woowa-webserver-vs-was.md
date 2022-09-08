---
layout: post
title: "알리의 Web Server vs WAS(10분 테코톡)"
subtitle: ""
comments: true
categories : ETC
date: 2022-09-08
background: '/img/posts/06.jpg'
---

# 소개
우아한형제들의 유투브 채널인 `우아한Tech`에 올라온 Web Server와 WAS에 관한 영상을 바탕으로 글을 작성합니다.
11:16초의 영상입니다.
목차는 아래와 같습니다.
```
1. 내가 만든 게 Web Server가 아니야?
2. Web Server
3. Web Application Server( WAS )
4. Web Server는 왜 필요할까?
5. 정리
```

## 1. 내가 만든 게 Web Server가 아니야?
영상을 올려주신 알리님은  AWS EC2 한대에 Spring, Nodejs, Django, DB를 모두 올려서 시스템을 구성하고,
이것은 웹서버라고 생각하셨다고 합니다.
이건 웹서버가 아닌가요?
일단 결론적으로 웹서버가 아닙니다.
EC2에 시스템을 구성하기 위한 프로그램을 올려서 실행했고 웹을 사용할 수 있는 상태가 됐는데 이게 왜 웹서버가 아닐까요?
여기서 알 수 있는 것은 웹 사이트가 돌아가게 환경을 구성했다고 해서 이를 웹서버라고 부르는 것이 아닌가 봅니다.
차근 차근 웹서버에 대해서 알아보겠습니다.

## 2. Web Server
웹 브라우저(클라이언트)로부터 HTTP 요청을 받아 HTML 문서와 같은 정적 컨텐츠를 제공하는 프로그램 입니다.
여기서 말하는 정적 컨텐츠는 요청인자 값에 강솬없이 달라지지 않는 컨텐츠를 말합니다.
html 외에도 css, image 같은 것들이 있겠네요.
어떤 사용자의 요청이든 항상 동일한 컨텐츠를 말합니다.

### 2-1. Web Server의 기능
1. 클라이언트로부터 HTTP 요청을 받을 수 있습니다.
2. 정적컨텐츠 요청 시 응답할 수 있습니다.
3. 동적컨텐츠 요청 시 WAS로 전달하여 WAS가 처리한 결과를 클라이언트에 전달 할 수 있습니다.









---
## 참고
- [](){: target="_blank"}


{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
