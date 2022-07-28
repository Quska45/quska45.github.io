---
layout: post
title: "세션이란?"
subtitle: "세션"
comments: true
categories : HTTP
date: 2022-07-28
background: '/img/posts/06.jpg'
---

# 소개
쿠키와 세션을 공부하려고 구글링을 해보시면 거의 비슷한 내용의 글들이 많습니다.
내용 자체도 그렇지만 구성 자체도 그렇습니다.
`HTTP의 특성 - 쿠키설명 - 세션설명 - 쿠키/세션 비교`와 같은 구성입니다.
HTTP의 특성에 따른 단점을 보완하기 위해 필요한 것이 쿠키와 세션이기 때문입니다.


## 세션?
클라이언트의 상태 정보 유지 기술로는 쿠키가 있습니다.
따라서 쿠키는 자바스크립트로도 제어가 가능합니다.(HttpOnly와 같은 헤더 옵션을 통해 불가능하게 만들 수도 있습니다.)
세션은 서버의 상태정보 유지 기술입니다. 즉 서버에서만 제어가 가능합니다.
이렇게 쿠키와 세션은 비슷하지만 분명히 다른 점이 존재 합니다.










## 참고
- [세션(Session)이란 무엇일까?](https://crossjin.tistory.com/entry/%EC%84%B8%EC%85%98Session%EC%9D%B4%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%BC%EA%B9%8C){:target="_blank"}
- [](https://chrisjune-13837.medium.com/web-%EC%BF%A0%ED%82%A4-%EC%84%B8%EC%85%98%EC%9D%B4%EB%9E%80-aa6bcb327582){:target="_blank"}

--- 

{% highlight ruby linenos %}
{% endhighlight %}

{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
