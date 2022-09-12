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
1. 내가 만든 게 Web Server가 아니야?( Part 1 )
2. Web Server
  - 2-1. Web Server의 기능
3. Web Application Server( WAS )
  - 3-1. WAS의 기능
4. 내가 만든 게 Web Server가 아니야?( Part 2 )
5. Web Server는 왜 필요할까?
  - 5-1. Web Server를 같이 사용했을 때의 장점
6. 정리
```

## 1. 내가 만든 게 Web Server가 아니야?
영상을 올려주신 알리님은  AWS EC2 한대에 Spring, Nodejs, Django, DB를 모두 올려서 시스템을 구성하고,
이것을 웹서버라고 생각하셨다고 합니다.
그래서 면접 시 '따로 Web Server를 사용하셨나요?' 라는 질문에 사용해봤다고 대답하셨습니다.
알리님이 구성한 환경은 웹서버가 아닌가요?
일단 결론적으로 웹서버가 아닙니다.
EC2에 시스템을 구성하기 위한 프로그램을 올려서 실행했고 웹을 사용할 수 있는 상태가 됐는데 이게 왜 웹서버가 아닐까요?
여기서 알 수 있는 것은 웹 사이트가 돌아가게 환경을 구성했다고 해서 이를 웹서버라고 부르는 것이 아닌가 봅니다.
차근 차근 웹서버에 대해서 알아보겠습니다.

## 2. Web Server
웹 브라우저(클라이언트)로부터 HTTP 요청을 받아 HTML 문서와 같은 정적 컨텐츠를 제공하는 프로그램 입니다.
여기서 말하는 정적 컨텐츠는 요청인자 값에 상관없이 달라지지 않는 컨텐츠를 말합니다.
html 외에도 css, image 같은 것들이 있겠네요.
어떤 사용자의 요청이든 항상 동일한 컨텐츠를 말합니다.

### 2-1. Web Server의 기능
1. 클라이언트로부터 HTTP 요청을 받을 수 있습니다.
2. 정적컨텐츠 요청 시 응답할 수 있습니다.
3. 동적컨텐츠 요청 시 WAS로 전달하여 WAS가 처리한 결과를 클라이언트에 전달 할 수 있습니다.

## 3. Web Application Server( WAS )
DB 조회나 다양한 로직 처리를 요구하는 동적인 컨텐츠를 제공하기 위해 만들어진 프로그램 입니다.
여기서 말하는 동적 컨텐츠는 요청 인자에 따라 바뀔 수 있는 컨텐츠 입니다.

### 3-1. WAS의 기능
1. 클라이언트로 부터 HTTP 요청을 받을 수 있습니다.(대부분의 WAS는 Web Server를 내장 합니다.)
2. 요청에 맞는 정적 컨텐츠(html, jpeg, css ...)를 제공할 수 있습니다.
3. DB 조회나 다양한 로직 처리를 통해 동적 컨텐츠를 제공 할 수 있습니다.

## 4. 내가 만든 게 Web Server가 아니야?( Part 2 ) 
Web Server와 WAS를 간단하게 알아봤으니 알리님이 면접시 받았던 질문으로 돌아가 보겠습니다.
아마 면접 질문이었던 '따로 Web Server를 사용하셨나요?' 라는 질문의 의도는,
'WAS 앞 단에 따로 Web Server를 두지 않은 이유가 있나요?' 정도 일 것 입니다.
알리님이 구성한 환경에는 따로 Web Server를 두지 않고 WAS만 사용하고 있기 때문입니다.

## 5. Web Server는 왜 필요할까?
면접 질문의 진짜 의도를 알아봤지만 저는 아직도 의문이 드는 것이 있습니다.
Web Server는 왜 필요할까에 대한 것입니다.
WAS만 있으면 웹 시스템을 구성하고 돌아가게 하는데 큰 문제가 없습니다.
그럼에도 불구하고 웹 서버는 아직도 많이 사용되고 있고, 심지어 면접 시에 Web Server를 사용하지 않는 이유를 묻기도 합니다.

### 5-1. Web Server를 같이 사용했을 때의 장점
웹 서버를 쓰는 이유는 당연히 장점이 있기 때문입니다.

<br/>
<br/>

1. 책임 분할을 통한 서버 부하 방지
  - 정적 컨텐츠는 Web Server가 담당하고 동적 컨텐츠는 WAS가 담당해주기 때문입니다.

2. 로드밸런싱
  - Web Server에서 로드 밸런싱을 통해 여러 대의 WAS가 요청을 나눠서 처리할 수 있도록 합니다.
  
3. 여러 대의 WAS의 Health check
  - Health check란 서버에 주기적으로 HTTP 요청을 보내 서버의 상태를 확인하는 것을 말합니다.
  - 간단한 Nginx 설정을 통해 옵션도 소개 드리겠습니다.
  
```
location / {
  proxy_pass http://backend;
  health_check interval=10 fails=3 passes=2;
}
```
  
  - interval : health check를 통해 서버 상태를 확인하는 요청을 날리는 주기(default : 5초)
  - fails : 3회 연속 실패하면 서버가 비정상이라고 인지(default : 1회)
  - passes : 서버가 다시 복구되어 요청이 2번 연속 성공하면 서버가 정상으로 인지(default : 1회)

4. 보안
  - 리버스 프록시를 통해 실제 서버를 외부에 노출하지 않을 수 있습니다.

## 6. 정리
결론적으로 WAS만 있어도 서비스는 가능합니다.
하지만 서비스의 확장성, 안정성을 고려한다면 앞 단에 Web Server를 두는 것이 유리할 수 있습니다.

---
## 참고
- [알리의 Web Server vs WAS](https://www.youtube.com/watch?v=mcnJcjbfjrs&ab_channel=%EC%9A%B0%EC%95%84%ED%95%9CTech){: target="_blank"}


{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
