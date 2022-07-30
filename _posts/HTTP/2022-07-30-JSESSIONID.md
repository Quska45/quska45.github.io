---
layout: post
title: "JSESSIONID는 어떻게 만들어 질까?"
subtitle: ""
comments: true
categories : HTTP
date: 2022-07-28
background: '/img/posts/06.jpg'
---

# 소개
회사 로그인에 문제가 있어 소스를 분석하게 됐습니다.
결과적으로 로그인을 처리해주는 중간 단계의 다른 시스템에 문제가 있었지만 쿠키, 세션, 로그인에 대해 공부를 하게 됐습니다.
그 과정에서 자연스럽게 JSESSION도 공부하게 되었는데 [좋은 글](https://semtax.tistory.com/92){:target="_blank"}이 있어 참고하여 작성합니다.

## 자바에서의 세션
key, value로 이뤄진 Map입니다.
실제 구현도 ConcurrentMap을 사용해서 세션을 구현합니다.
따라서 세션은 다음의 자료 구조를 가집니다.
```java
Map<SessionStorageKey, SessionStorage>
```
위 코드에서 SessionStorageKey의 역할을 하는 것이 `JSESSIONID`입니다.
실제 자료구조의 구성을 생각해보면 아래와 같습니다.
```java
Map<JSESSIONID, Map<AttributeKey, Value>>
```
세션과 JSESSIONID에 대해서 간략히 알아봤으니 톰캣이 어떻게 JSESSIONID를 만드는지 보겠습니다.

## 톰캣이 JSESSIONID를 만드는 방식
실제로 JSESSIONID를 만드는 패키지는 `org.apache.catalina.session입니다.`
ManagerBase 클래스의 `createSession`메서드에서 JSESSIONID를 아래와 같이 생성 합니다.
```java
package org.apache.catalina.session;

....


public abstract class ManagerBase extends LifecycleMBeanBase implements Manager {


    ......


        public Session createSession(String sessionId) {

        if ((maxActiveSessions >= 0) &&
                (getActiveSessions() >= maxActiveSessions)) {
            rejectedSessions++;
            throw new TooManyActiveSessionsException(
                    sm.getString("managerBase.createSession.ise"),
                    maxActiveSessions);
        }

        // Recycle or create a Session instance
        Session session = createEmptySession();

        // Initialize the properties of the new session and return it
        session.setNew(true);
        session.setValid(true);
        session.setCreationTime(System.currentTimeMillis());
        session.setMaxInactiveInterval(getContext().getSessionTimeout() * 60);
        String id = sessionId;
        if (id == null) {
            id = generateSessionId();
        }
        session.setId(id);
        sessionCounter++;

        SessionTiming timing = new SessionTiming(session.getCreationTime(), 0);
        synchronized (sessionCreationTiming) {
            sessionCreationTiming.add(timing);
            sessionCreationTiming.poll();
        }
        return session;
    }


    ......


}
```

createSession 메소드는 내부적으로 org.apache.catalina.util 패키지의 StandardSessionIdGenerator 클래스를 사용하여 JSESSIONID 를 생성 하게 됩니다.
id == null인 경우 generateSessionId() 메서드로 id를 만들어 주는데 이 부분입니다.
실제 코드는 아래와 같습니다.

```java
package org.apache.catalina.util;

public class StandardSessionIdGenerator extends SessionIdGeneratorBase {

    @Override
    public String generateSessionId(String route) {

        byte random[] = new byte[16];
        int sessionIdLength = getSessionIdLength();

        // Render the result as a String of hexadecimal digits
        // Start with enough space for sessionIdLength and medium route size
        StringBuilder buffer = new StringBuilder(2 * sessionIdLength + 20);

        int resultLenBytes = 0;

        while (resultLenBytes < sessionIdLength) {
            getRandomBytes(random);
            for (int j = 0;
            j < random.length && resultLenBytes < sessionIdLength;
            j++) {
                byte b1 = (byte) ((random[j] & 0xf0) >> 4);
                byte b2 = (byte) (random[j] & 0x0f);
                if (b1 < 10)
                    buffer.append((char) ('0' + b1));
                else
                    buffer.append((char) ('A' + (b1 - 10)));
                if (b2 < 10)
                    buffer.append((char) ('0' + b2));
                else
                    buffer.append((char) ('A' + (b2 - 10)));
                resultLenBytes++;
            }
        }

        if (route != null && route.length() > 0) {
            buffer.append('.').append(route);
        } else {
            String jvmRoute = getJvmRoute();
            if (jvmRoute != null && jvmRoute.length() > 0) {
                buffer.append('.').append(jvmRoute);
            }
        }

        return buffer.toString();
    }
}
```
제가 참고한 글에서는 위의 JSESSIONID가 생성되는 과정을 더 상세히 설명했지만 저는 이 정도로 정리하겠습니다.
저는 JSESSIONID가 생성되는 과정을 이해하는 것 만으로 충분하다고 생각했기 때문입니다.
상세한 과정은 위의 코드를 기반으로 언제든지 분석이 가능한 것 같습니다.

## 마무리
예전에 JSESSIONID의 존재를 처음 알게 됐을 때는 이게 뭔지에 대해 생각해볼 여유조차 없었던 것 같습니다.
웹 개발에 대한 아무런 이해도 없이 그저 스프링이 뭔가 하나 보다 싶었죠.
JSESSIONID에 대해 오기 까지 HTTP의 특징, 쿠키, 세션, 로그인, 톰캣 등 많은 것들을 공부했습니다.
이 글을 보시는 분들도 여기에 오기까지 얼마나 많은 기반 지식들을 공부했는지 점검해 보셨으면 좋겠습니다.


## 참고
- [톰캣 에서는 어떻게 JSESSIONID 를 만드는 것일까?](https://semtax.tistory.com/92){:target="_blank"}


--- 

{% highlight ruby linenos %}
{% endhighlight %}

{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
