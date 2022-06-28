---
layout: post
title: "http와 https"
subtitle: "tcp와 ssl"
comments: true
categories : ETC
date: 2022-06-28
background: '/img/posts/06.jpg'
---

# 소개
최근에 구글 맵 api를 사용할 일이 있었는데 로컬에서 잘 작동되던 기능이 개발 반영시에 제대로 작동되지 않는 문제가 있었습니다. 
원인은 맵 api를 사용할 때 http는 기능의 제한이 있기 때문이었습니다.
관련된 내용을 찾아보니 구글에서는 https를 적극 권장하고 있습니다. 검색 시 이점을 줍니다.
https 정도는 필수가 된 요즘이니 이참에 관련된 내용을 확실히 정리하도록 하겠습니다.
http와 https가 무엇인지 보다는 둘의 차이점인 보안과 관련된 내용을 중점적으로 다룹니다.

## http
텍스트, 이미지, 영상, JSON 등 거의 모든 형태의 데이터를 정송할 수 있는 프로토콜입니다. 
하지만 별다른 보안 조치가 없기 때문에 개인정보나 비문들이 노출될 위험이 있습니다.
응용계층인 http는 전송 계층인 `tcp/ip` 계층 위에서 동작합니다. [http와 tcp/ip](https://cordingdiary.tistory.com/m/entry/%EC%9B%B9-%EC%9B%B9-%EA%B8%B0%EC%B4%88-1-HTTP-TCPIP)

## https
http의 보안과 관련된 이슈를 해결하기 위해 나온 것이 https입니다. 

---

{% highlight ruby linenos %}
{% endhighlight %}

{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
