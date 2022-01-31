---
layout: post
title: "localhost와 127.0.0.1의 차이점"
subtitle: ""
comments: true
categories : ETC
date: 2021-01-21
background: '/img/posts/06.jpg'
---

## 차이점
 - 127.0.0.1 : 내 pc를 서버로 만들어서 할당된 ip이다.
 - localhost : ip에 대한 alias라고 말할 수 있겠다.

```
# Copyright (c) 1993-2009 Microsoft Corp.
#
# This is a sample HOSTS file used by Microsoft TCP/IP for Windows.
#
# This file contains the mappings of IP addresses to host names. Each
# entry should be kept on an individual line. The IP address should
# be placed in the first column followed by the corresponding host name.
# The IP address and the host name should be separated by at least one
# space.
#
# Additionally, comments (such as these) may be inserted on individual
# lines or following the machine name denoted by a '#' symbol.
#
# For example:
#
#      102.54.94.97     rhino.acme.com          # source server
#       38.25.63.10     x.acme.com              # x client host

# localhost name resolution is handled within DNS itself.
#	127.0.0.1       localhost
#	::1             localhost

실제 운영체제의 hosts 파일을 까본 것이다.
마지막 쯤에 127.0.0.1이 localhost로 잡혀있는 것을 알 수 있다.
```



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
