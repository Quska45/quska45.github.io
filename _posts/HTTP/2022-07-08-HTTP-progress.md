---
layout: post
title: "http 심화"
subtitle: "http 메시지"
comments: true
categories : HTTP
date: 2022-07-10
background: '/img/posts/06.jpg'
---

# 소개
캡틴 판교님의 [http에 대한 기본에 관한 글](https://joshua1988.github.io/web-development/http-part1/)
 마지막에서 심화된 내용을 다룬다고 하셨습니다. 근데 바쁘셨는지 실제로 다음 글을 작성하신진 않은 것 같았습니다.
캡틴 판교님이 다루겠다고 하셨던 HTTP 메시지 포맷과 캐싱, 보안 인증에 관한 내용을 제가 직접 정리해 보려고 합니다.
이번 글에서는 http메시지에 대해서 다룹니다.

## HTTP 메시지
```
HTTP 메시지는 서버와 클라이언트 간에 데이터가 교환되는 방식입니다. 
```
MDM에 HTTP 메시지를 검색해보시면 위의 정의가 첫 줄에 있습니다.
개인적으로 잘 와닿지는 않는 말이었습니다.
이것보다는 다음의 그림을 보시져.
![http 메시지](https://mdn.mozillademos.org/files/13827/HTTPMsgStructure2.png){: width: 500; height: 500}
어떠세요? 그림을 보니 조금 더 와닿지 않나요?
http 메시지란 request와 response에 대한 정보일 뿐 입니다. 별로 대단할건 없습니다.
그저 명세를 따라가면서 어떤 정보가 적혀있는지 읽어보고 이런 '정보들이 있구나' 알면 그만입니다.
그럼 이제 하나씩 공부 해봅시다.

### HTTP 메시지는 어떻게 구성되어 있나요?
일단 HTTP 메시지에 대해 간단한 몇 가지 정보를 공유합니다.
일단 두가지 타입이 있습니다. request와 response입니다.
우리가 HTTP 메시지 라는 것에 대해 크게 신경 쓰지 않고 정보를 주고 받을 수 있는 이유는 
브라우저, 웹서버 등이 HTTP 메시지를 작성해주기 때문입니다.
개발자가 하는 일은 만들어진 메시지의 몇 가지를 수정하는 일이라고 볼 수 있습니다.
그럼 이제 부터는 진짜 구조에 대해서 알아보겠습니다. 다음과 같습니다.
<br>
![메시지 구조](https://velog.velcdn.com/images%2Fgparkkii%2Fpost%2Fa8c0793f-86bf-4744-8d83-56c457c00b2f%2Ftip_20070425_1.jpg){: width: 500; height: 500}
<br>
위에서 본 메시지와 크게 다르지 않습니다. 그저 좀 더 보기 쉽게 나눴을 뿐입니다.
request와 response의 메시지의 구조는 매우 닮아 있습니다.
실질적인 내용은 다르지만 구조 자체는 다르지 않습니다.
1. 시작줄 / 상태줄 : 실행되어야 할 요청, 또는 요청 수행에 대한 성공/실패가 기록되어 있습니다. 이 줄은 항상 한줄로 끝납니다.
2. 헤더 : 요청에 대한 설명, 혹은 메시지 본문에 대한 설명이 들어갑니다.
3. 빈 줄 : 요청에 대한 모든 메다 정보가 전송되었음을 알립니다.
4. body : 요청과 관련된 내용(HTML 폼 콘텐츠 등)이 옵션으로 들어가거나, 응답과 관련된 문서(document)가 들어갑니다. 본문의 존재 유무 및 크기는 첫 줄과 HTTP 헤더에 명시됩니다.
<br>
간단히 구조를 알아 봤으니 이제 좀 더 구체적으로 분석 해보겠습니다.

## request 메시지
request 메시지 부터 알아보겠습니다.
```
https://section.blog.naver.com/BlogHome.naver?directoryNo=0&currentPage=1&groupId=0
```
네이버 블로그 메인화면 입니다.
위 주소를 기반으로 분석해 보겠습니다.

### 시작줄
```
GET /BlogHome.naver?directoryNo=0&currentPage=1&groupId=0 HTTP 2.0
```
개발자 도구를 가지고 알아낸 정보를 바탕으로 시작줄을 구성해봤습니다.
개발자 도구 에서 확인 할 수 있는 정보는 다음과 같습니다.
<br>
![network tab](/img/HTTP/http network tab.png){: width: 500; height: 500}
<br>
위 정보는 다음과 같이 설명할 수 있습니다.
  - http method : GET Method를 사용하고 있습니다.
  - Request-target : 요청 대상
  - HTTP Version : 네이버는 http2 프로토콜을 사용합니다.

### HTTP Header
[HTPP Header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)의 기본 구조를 따릅니다.
대소문자 구분없는 문자열 다음에 콜론이 붙으며, 그 뒤에 오는 값은 헤더에 따라 달라집니다.
개발자 도구를 열어 현재 페이지의 request Header를 확인해보세요.
다음 이미지와 비슷한 구조일 겁니다.
<br>
![http header](/img/HTTP/http_header.png){: width: 500; height: 500}
<br>
이미지에는 나와 있지 않지만 한참이 더 남았습니다.
이렇게 헤더에는 많은 정보를 담을 수도 있습니다.
이 글은 http 헤더를 분석하는 글이 아니기 때문에 자세한 내용은 생략하도록 하겠습니다.
헤더에 대한 기본적인 내용만 제시하겠습니다.
<br>
![http 헤더](https://mdn.mozillademos.org/files/13821/HTTP_Request_Headers2.png){: width: 500; height: 500}
<br>
- General 헤더 : 메시지 전체에 적용됩니다.
- Request 헤더 : 요청의 내용을 좀 더 구체화 시키고, 컨텍스를 제공하기도 하며 조건에 따른 제약 사항을 가하기도 합니다.
- Entity 헤어 : 요청 본문에 적용됩니다. 당연히 요청에 본문이 없다면 entity 헤더는 전송되지 않습니다.

### 본문
요청의 마지막 부분에 들어갑니다. GET, HEAD, DELETE, OPTIONS 처럼 리소스를 가져오는 요청은 보통 본문이 필요겂습니다.
POST와 같은 요청이 본문에 데이터를 포함 합니다..
넓게 보면 본문은 두가지 종류로 나뉩니다.
- 단일-리소스 본문: 헤더 두 개(Content-Type와 Content-Length)로 정의된 단일 파일로 구성됩니다.
- 다중-리소스 본문(multiple-resource bodies): 멀티파트 본문으로 구성되는 다중 리소스 본문에서는 파트마다 다른 정보를 지니게 됩니다. 보통 HTML 폼과 관련이 있습니다.

## HTTP 응답
이번엔 response의 http 메시지에 대해서 알아보겠습니다.

### 상태줄
요청에서는 `시작 줄`이라고 했지만 응답은 상태줄 입니다. 다음과 같습니다.
```
HTTP/1.1 404 Not Found.
```
1. 프로토콜 버전
2. 상태코드 : 요청에 대한 서버의 상태코드 입니다.
3. 상태 텍스트 : 상태코드의 간단한 설명이라고 보시면 됩니다.

### HTTP 헤더
설명 자체는 request와 동일합니다.
<br>
![http 헤더](https://mdn.mozillademos.org/files/13823/HTTP_Response_Headers2.png)
<br>
- General 헤더: Via와 같은 헤더는 메시지 전체에 적용됩니다.
- Response 헤더: Vary와 Accept-Ranges와 같은 헤더는 상태 줄에 미처 들어가지 못했던 서버에 대한 추가 정보를 제공합니다.
- Entity 헤더: Content-Length와 같은 헤더는 요청 본문에 적용됩니다. 당연히 요청 내에 본문이 없는 경우 entity 헤더는 전송되지 않습니다.

### 본문
넓게 보면 본문은 세가지 종류로 나뉩니다.

- 이미 길이가 알려진 단일 파일로 구성된 단일-리소스 본문: 헤더 두개(Content-Type와 Content-Length)로 정의 합니다.
- 길이를 모르는 단일 파일로 구성된 단일-리소스 본문: Transfer-Encoding가 chunked로 설정되어 있으며, 파일은 청크로 나뉘어 인코딩 되어 있습니다.
- 서로 다른 정보를 담고 있는 멀티파트로 이루어진 다중 리소스 본문: 이 경우는 상대적으로 위의 두 경우에 비해 보기 힘듭니다.

## 마무리
HTTP 메시지는 HTTP에서 핵심적인 역할을 합니다. 
메시지 구조는 단순하게 이루어져 있으며, 확장성도 매우 좋습니다. 
HTTP/2 프레이밍 메커니즘 덕분에 HTTP/1.x 구문과 기저가 되는 전송 프로토콜 사이에 새로운 중간 단계가 추가 되었습니다. 
프로토콜을 자체적으로 수정하지 않고 이미 입증된 메커니즘을 바탕으로 이뤄낸 것입니다.
이 글에서 다룬 내용은 기본적인 내용입니다.
당장 개발자 도구를 열어서 network 탭을 확인해보면 이 글에서 다루지 않은 내용들도 다수 확인 할 수 있습니다.
앞으로 계속 공부하면서 하나 씩 알아가야 할 것 같습니다.


## 참고
- [MDM HTTP 메시지](https://developer.mozilla.org/ko/docs/Web/HTTP/Messages)
- [HTTP 메시지란?](https://velog.io/@gparkkii/HTTPMessage)
--- 

{% highlight ruby linenos %}
{% endhighlight %}

{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
