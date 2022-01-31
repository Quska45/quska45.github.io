---
layout: post
title: "Java transient"
subtitle: ""
comments: true
categories : Java
date: 2021-01-21
background: '/img/posts/06.jpg'
---

## Java transient?
 - Serialize하는 과정에 제외하고 싶은 경우 선언하는 키워드 이다.
 
## 왜 필요하지?
 - 패스워드와 같은 보안정보가 직렬화(Serialize)과정에서 제외하고 싶은 경우에 적용한다.
 - 다양한 이유로 데이터를 전송하고 싶지 않을 때 선언할 수 있다.

** 예시
```java

class Member implements Serializable {
  private transient String name;
  pricate String email;
  private int age;
}

Member{name='null', email='test@naver.com, age='25'}
//위와 같이 결과가 나오는 것을 알 수 있다.
```

## 주의해야할 점
 - 적용되는 데이터가 실제로 필요 없는지 고려
 - Data를 제외하였을 경우 서비스 장애가 없는지 고려



---
 <https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map>
 <https://velog.io/@lilyoh/js-array-%EC%9D%98-map-%EB%A9%94%EC%84%9C%EB%93%9C>

{% highlight ruby linenos %}
{% endhighlight %}

{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
