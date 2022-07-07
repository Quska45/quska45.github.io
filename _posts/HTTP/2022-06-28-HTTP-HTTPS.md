---
layout: post
title: "http와 https"
subtitle: "tcp와 ssl"
comments: true
categories : HTTP
date: 2022-06-28
background: '/img/posts/06.jpg'
---

# 소개
최근에 구글 맵 api를 사용할 일이 있었는데 로컬에서 잘 작동되던 기능이 개발 반영시에 제대로 작동되지 않는 문제가 있었습니다. 
원인은 맵 api를 사용할 때 http는 기능의 제한이 있기 때문이었습니다.
관련된 내용을 찾아보니 구글에서는 https를 적극 권장하고 있습니다.
https 정도는 필수가 된 요즘이니 이참에 관련된 내용을 확실히 정리하도록 하겠습니다.
http와 https가 무엇인지 보다는 둘의 차이점인 보안과 관련된 내용을 중점적으로 다룹니다.
추가적으로 https에 대한 내용도 다루도록 하겠습니다.

## http
텍스트, 이미지, 영상, JSON 등 거의 모든 형태의 데이터를 정송할 수 있는 프로토콜입니다. 
하지만 별다른 보안 조치가 없기 때문에 개인정보나 비문들이 노출될 위험이 있습니다.
개념적으로 응용계층인 http는 전송 계층인 `tcp/ip` 계층 위에서 동작합니다. [http와 tcp/ip 관계](https://cordingdiary.tistory.com/m/entry/%EC%9B%B9-%EC%9B%B9-%EA%B8%B0%EC%B4%88-1-HTTP-TCPIP)

## https
http의 보안과 관련된 이슈를 해결하기 위해 나온 것이 https입니다.
https가 보안을 지키는 방식은 위에서 언급한 `tcp/ip`계층 위에 `ssl`이라는 보안 계층을 올리는 것입니다.
즉 http를 사용할 때 추가적으로 ssl을 같이 사용하는 것이 https입니다.
따라서 ssl != https이라는 것을 알 수 있고 https는 http에서 출발한다는 것도 알 수 있습니다.
참고로 FTP, Telnet 등도 ssl을 적용 시켜 사용할 수 있습니다.

## ssl(Secure Sockets Layer)
http와 https의 차이점에 알아본다는 것은 ssl이 뭔지 알아보는 것과 크게 관련이 있습니다.
https에서 잠깐 언급 했듯이 http + ssl = https가 성립하기 때문입니다.
ssl과 tls(Transport Layer Security)는 같은 뜻 입니다.
ssl을 계승한 것이 tls인데 ssl이 더 많이 사용되고 있을 뿐 입니다.
ssl이 보안을 위해 하는 일은 클라이언트와 서버가 아닌 제 3자가 통신을 보증 해줄 수 있도록 합니다.

### ssl이 포함된 통신
OSI 7계층 모델 : 응용계층 > 표현계층 > 세션계층 > 전송계층(tcp) > 네트워크계층 > 데이터링크계층 > 물리계층
위에서 간단하게 언급했듯이 ssl은 OSI 계층에 추가되어 동작합니다.
즉 기존에 `응용계층 > 전송계층`의 단계가 아니라 `응용계층 > ssl > 전송계층`과 같은 모습이 됩니다.
기존 방식과 ssl이 추가된 방식은 외부에서 보긴엔 똑같이 동작합니다.
왜냐면 응용,전송 계층은 똑같은 역할만 수행하고 있기 때문입니다.
응용, 전송 계층이 똑같은 역할만 수행해도 통신에 문제가 없고 보안을 지키기 위해 ssl은 몇 가지의 기능을 수행하고 있습니다.

### ssl의 구성
응용, 전송 계층이 똑같은 역할을 수행 할 수 있도록 ssl은 몇개의 프로토콜로 나뉘어 있습니다.
5개의 프로토콜인데 이들은 각자의 역할을 수행하여 통신이 원활히 이뤄질 수 있도록 합니다.
그 구성은 다음과 같습니다.
<br>
![ssl 프로토콜 계층 구조](https://mblogthumb-phinf.pstatic.net/20111101_242/xcripts_13200748983039vwuB_JPEG/%B0%E8%C3%FE.jpg?type=w2){: width="500" height="500"}
<br>
위 프로토콜이 어떤 역할을 수행하는지는 [이 글](https://m.blog.naver.com/xcripts/70122755291)을 참고하시면 도움이 될 것 같습니다.
저희가 생각하는 통신을 한다, 즉 메시지를 주고 받는 다는 것은 사실상 Handshake Protocol이 수행합니다.
따라서 Handshake Protocol 정도는 꼭 확인해보시는 것을 추천 드립니다.

### ssl(Handshake Protocol)이 메시지를 주고 받는 방식
구글링을 하다보면 `ssl 동작 방식 == Handshake Protocol 동작방식` 으로 설명하는 글 들이 있었습니다.
솔직히 어떻게 알고 있던 크게 상관은 없지만 그래도 다른건 다른 것이니 언급해 놓습니다.
<br>
![ssl 통신 과정](https://goodgid.github.io/assets/img/http/tls_ssl_2.png){: width="500" height="500"}
<br>
ssl은 위와 같은 과정을 거쳐 메시지를 암호화 하여 통신 합니다.

### ssl 인증서
제 3자가 클라이언트와 서버간의 통신을 보증 할 수 있도록 발급하는 문서 입니다.
클라이언트가 서버에 접속하면 서버는 클라이언트에게 인증서를 전달 합니다.
이 때 클라이언트는 이 인증서를 보고 신뢰할 수 있는 서버인지 확인 후 다음 행동을 결정할 수 있습니다.
인증서의 핵심적인 역할은 두가지 입니다. 
1. 클라이언트가 접속한 서버가 신뢰 할 수 있는 서버임을 보장합니다.
2. ssl 통신에 사용할 공개키를 클라이언트에게 제공합니다.

## 마무리
여러가지 레퍼런스를 참고 했었는데 그중에 내용이 가장 많고 알차다는 생각이 들었던건 [생활코딩](https://opentutorials.org/course/228/4894) 입니다.
만약 생활코딩에 글을 전부 이해하고 활용할 수 있다면 어디가서 https는 잘 알고 있다고 말 할 수 있지 않을까 싶네요.


## 참고
- [HTTP vs HTTPS의 차이점을 알아보자](https://devjem.tistory.com/3)
- [http와 tcp/ip 관계](https://cordingdiary.tistory.com/m/entry/%EC%9B%B9-%EC%9B%B9-%EA%B8%B0%EC%B4%88-1-HTTP-TCPIP)
- [SSL(TLS)에 대하여, 간단히 알아보는 대칭키](https://proni.tistory.com/m/entry/SSLTLS%EC%97%90-%EB%8C%80%ED%95%98%EC%97%AC-%EA%B0%84%EB%8B%A8%ED%9E%88-%EC%95%8C%EC%95%84%EB%B3%B4%EB%8A%94-%EB%8C%80%EC%B9%AD%ED%82%A4%EA%B3%B5%EA%B0%9C%ED%82%A4)
- [SSL(Secure Socket Layer)의 개념과 동작원리](https://m.blog.naver.com/xcripts/70122755291)
- [SSL(Secure Sockets Layer) 개념 및 동작 원리 알아보기](https://goodgid.github.io/TLS-SSL/)

--- 

{% highlight ruby linenos %}
{% endhighlight %}

{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
