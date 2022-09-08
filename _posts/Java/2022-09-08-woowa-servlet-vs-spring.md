---
layout: post
title: "코기의 Servlet vs Spring(10분 테코톡)"
subtitle: ""
comments: true
categories : Java
date: 2022-09-08
background: '/img/posts/06.jpg'
---

# 소개
우아한형제들의 유투브 채널인 `우아한Tech`에 올라온 Servlet과 spring에 관한 영상을 바탕으로 글을 작성합니다.
영상의 타이틀은 Servlet vs Spring 이지만 `코기`님은 `Spring으로 Servlet을 다룬다는 것`을 주제로 하여 영상을 준비했다고 합니다.
11:43초의 영상입니다.
목차는 아래와 같습니다.
```
1. 서블릿이란
2. 서블릿 컨테이너와 서블릿 동작 방식
3. 프론트 컨트롤러 패턴
4. Dispatcher Servlet의 요청 처리 과정
5. 스프링 컨테이너 맛보기
```

## 1. 서블릿이란?
동적인 페이지를 만들기 위해 웹 서버에 붙여서 사용하는 프로그램입니다.
최초의 웹서버는 정적인 페이지로만 응답할 수 있었습니다.
그래서 웹서버에 프로그램을 붙여서 동적인 페이지를 생성하기 시작했습니다.
이런 역할을 하는 프로그램들 중의 하나가 서블릿입니다.
그럼 이런 서블릿을 사용했을 때 어떤 이익이 있는지 살펴보겠습니다.

## 1-1. 서블릿을 사용했을 때 이점
개발자가 요청을 해석하고 이에 대한 응답을 만들어내는 수고를 훨씬 줄일 수 있습니다.
아래 요청과 응답을 보겠습니다.
```
// 요청
GET /api/products HTTP/1.1
Content-Type: application/json
User-Agent: PostmanRuntime/7.28.0
Accept: */*
Postman-Token: acfcbcf8
Host: localhost: 8080
Accept-Encoding: gzip, deflate, br
Connection: keep-alive

// 응답
Location: http://localhost:8080/api/products/6
Content-Length: 202
Content-Type: application/json
Date: Sun, 02 May 2021 14:56:41 GMT
Keep-Alive: timeout=60
```
스프링을 통해 개발을 해보셨더라도, 경험이 많이 없으신 분들은 위와 같은 요청, 응답에 대한 명세를 처음 보시는 분도 있으실 것 같습니다.
이것도 크게 복잡한 것은 아닙니다. 더 복잡한 경우가 많죠.
클라이언트에서 요청을 보내고 서버가 응답을 한다는 것은 위와 같은 명세가 오가고 해석하는 과정을 포함하는 것입니다.
만약 서블릿이 없다면 요청을 해석하고 응답을 만들어 내는 과정을 개발자가 직접해야 합니다.
이런 귀찮은 일을 직접하고 싶은 사람은 아무도 없겠죠.
<br/>
<br/>
서블릿이 요구하는 구현 규칙을 지키면서 서블릿을 정의해주면 http 요청 정보를 쉽게 사용할 수 있게 됩니다.
또 처리 결과도 쉽게 응답으로 변환할 수 있습니다.
이런 이점 뿐만 아니라 개발자들은 비지니스 로직에만 집중 할 수 있어 생산성도 훨씬 좋아집니다.
<br/>
<br/>

### 1-2. 서블릿을 이용한 요청 
실제 간단한 서블릿 코드를 보겠습니다.
```java
public class MyServlet extends HttpServlet {
  public void init( Servlet config ) throws ServletException {
    super.init();
  }
  
  public void destroy() {
    super.destory();
  }
  
  protexted void service( HttpServletRequest request, HttpServletResponse response ){
    super.service( request, response );
  }
}
```
서블릿이 생성 되면 init 메서드가 호출이 됩니다.
소멸할 때는 destroy 메서드가 호출됩니다.
사실 중요한 것은 service 메서드 입니다.
실제로 요청을 처리하는 부분입니다.
이제 이 service를 좀 더 분석 해보겠습니다.
<br/>
```java
public abstract class HttpServlet extends GenericServlet {
  
  protected void service( HttpServletRequest req, HttpServletResponse resp ) throws IOException{
    String method =req.getMethod();
    
    if( method.equals( "GET" ) ){
      doGet( req, resp );
    } else if(method.equals( "HEAD" )){
      doHead( req, resp );
    } else if(method.equals( "POST" )){
      doPost( req, resp );
    } else if(method.equals( "PUT" )){
      doPut( req, resp );
    } else if(method.equals( "DELETE" )){
      doDelete( req, resp );
    } else if(method.equals( "OPTIONS" )){
      doOptions( req, resp );
    } else if(method.equals( "TRACE" )){
      doTrace( req, resp );
    } else {
      String errMsg = "http.method_not_implemented";
      resp.sendError( HttpServletResponse.SC_NOT_IMPLEMENTE, errMsg );
    }
  }
}
```
위 코드를 통해 알 수 있는 것은, 개발자가 요청에 따라서 비지니스 로직에만 집중 할 수 있다는 것입니다.
doGet, doHead 등 실제 요청을 처리하는 비지니스 로직만 개발하면 요청, 응답에 대한 명세는 서블릿이 알아서 해주는 것이죠.
그럼 doGet 메서드만 코드를 보도록 하겠습니다.
<br/>
```java
public class MyServlet extends HttpServlet {
  
  @Override
  protected void doGet( HttpServletRequest req, HttpServletResponse resp ) throws IOException {
    PrintWriter writer = resp.getWriter();
    writer.println( "Hello, This is Corgi" );
  }
}
```
위의 doGet 메서드에 URL만 매핑 해주면 요청이 처리됩니다.
위 코드를 마지막으로 서블릿이 요청을 어떻게 처리하는지 간단하게 알아본 것 같습니다.
서비스 메서드만 재정의 해서 처리 방법을 지정하면 되는 것입니다.

## 2. 서블릿 컨테이너와 서블릿 동작 방식
서블릿이 어떻게 호출되고 어떻게 관리되는지를 알아보겠습니다.
과정을 보실 때 서블릿 컨테이너는 서블릿을 담는 바구니라는 것을 생각하시면 보시면 좋을 것 같습니다.
추가적으로 아래의 과정을 실제로 하는 주체는 서블릿 컨테이너 입니다.
1. Servelt Request / Servlet Response 객체 생성
2. 설정 파일을 참고하여 매핑할 Servlet을 확인
  - 설정 파일 예시는 아래 쪽에 있는 xml 코드를 참고해주세요.
  - 설정을 간단히 설명드리면 /hello 라는 요청을 HelloServlet이 처리하는데 해당 서블릿은 servlet 패키지의 HelloServlet인 것을 나타냅니다.
3. 해당 서블릿 인스턴스 존재 유무를 확인하여 없으면 생성
  - 설정 파일을 통해 어떤 서블릿이 필요한지 파악한 상태 입니다.
  - 따라서 서블릿 컨테이너에 해당 서블릿 인스턴스가 있다면 그대로 사용하고 없다면 init 메서드를 통해 생성합니다.
  - 여기서 알 수 있는 것은 서블릿들은 싱글톤으로 관리된다는 점입니다. 따라서 소멸 시키지 않습니다.
  - 추가로 서블릿 컨테이너의 역할 중 하나가 서블릿의 생명주기를 관리하는 객체라는 점입니다.
4. servlet Container에 스레드를 생성하고 res/req를 인자로 service를 실행
  - 1-2.에서 봤던 코드의 doGet과 같이 미리 정의했던 서비스 로직이 실제로 실행되는 것을 의미합니다.
5. 응답을 처리하고 생성했던 req/res 객체를 소멸 시키고 끝이 납니다.

```xml
<servlet>
  <servlet-name>HelloServlet</servlet-name>
  <servlet-class>servlet.HelloServlet</servlet-class>
</servlet>

<servlet-mapping>
  <servlet-name>HelloServlet</servlet-name>
  <url-pattern>/hello</url-pattern>
</servlet-mappin>
```

만약 위의 과정 중 요청이 처리 중인데 또 다른 요청이 들어오면 어떻게 될까요?
스레드가 추가로 생성됩니다.
따라서 실제 웹어플이 동작되는 것을 생각해보면 요청마다 서블릿 인스턴스가 생성되고 스레드가 계속 생성되겠네요.
멀티스레딩 환경이 구성된다는 의미입니다.
이는 매우 비효율적입니다.
일단 스레드를 생성하는 것 자체가 부담이 되는 일이고 멀티스레딩 환경에서 일어나는 데드락은 경험해보신 분들은 아실만한 괴로움을 수반합니다.
개발적인 측면에서도 공통적으로 처리해야하는 로직에 대해서 모든 서비스에 동일하게 작성해야 하는 점도 참 비효율적입니다.

## 3. 프론트 컨트롤러 패턴
2장의 마지막에서 간단하게 언급한 비효율을 개선할 수 있는 패턴입니다.
핵심이자 정의는 `공통로직을 처리할 수 있는 매니저의 역할을 하는 객체를 만드는 패턴`이라는 것 입니다.
1 요청, 1서블릿이 아니라 N개의 요청을 처리하는 1개의 매니저를 만들어 공통로직을 작성하고 개별적인 로직은 따로 수행할 수 있도록 구성하는 방식입니다.
스프링의 MVC에서 매니저의 역할은 `Dispatcher Servlet`이 해줍니다.
모든 요청을 여기로 받고 나머지 개별적인 로직은 각 요청별 핸들러를 만들어 처리하는 식입니다.

## 4. Dispatcher Servlet이 web 요청을 처리하는 과정
3장에서 프론트 컨트롤러 패턴에 대해서 간단히 알아봤습니다.
모든 요청을 받고 처리하는 객체라고 설명드렸는데, 역할이 좀 과중하다는 생각이 드네요.
만약 너무 많은 요청이 들어온다면 Despatcher Servlet이 요청을 처리하는 것과 관련된 모든 역할을 하는 것은 힘들어 보입니다.
따라서 일반적으로 역할을 분리합니다.
![dispatcher servlet의 요청 처리과정](https://quska45.github.io/img/posts/Screenshot_20220908-140323_Free%20Adblocker%20Browser.jpg){: width="723"}
요청에 대한 처리와 어떤 뷰를 사용할지에 대한 기능을 분리했습니다.
Dispatcher Servlet이 정말 매니저 처럼 요청을 받아 일을 분배해주는 역할을 하고 있다는 것이 분명하게 보이네요.
하지만 위의 그림을 보면서 생각이 드는 것은 꽤나 복잡하다는 것 입니다.
개발자는 위의 구조를 직접 구성하고 필요한 객체들을 개발해야 하는 걸까요?

## 5. 스프링 컨테이너 맛보기
4장에서 봤던 내용과 같은 구조가 만들어지게 된 것은 이해가 된다지만 이런 구조를 개발자가 직접 구성해줘야 한다면 여간 힘든일이 아닐 것 같습니다.
다행히 개발자는 4장의 그림에서 맨마지막 과정인 핸들러 정도 말고는 크게 신경 쓸 것이 없습니다.
위와 같은 과정을 잘 모르는 저 같은 사람들이 스프링을 통해 어떻게든 개발을 할 수 있는 이유입니다.
스프링이 제공해주는 구조를 그대로 가져다 사용하고 핸들러만 작성하면 되기 때문입니다.
만약 추가적인 설정이 필요하다면, 설정 파일만 잘 작성해주면 스프링이 이걸 보고 스프링 컨테이너에 필요한 빈들을 넣어줍니다.
스프링 컨테이너는 3장에서 봤던 서블릿 컨테이너와 역할적인 내용이 아주 유사합니다.
바구니의 역할을 하는 것이고 그 안에 스프링을 사용하기 위해 필요한 빈들이 담기는 것이죠.
필요한 빈을 파악해 있으면 사용하고, 없으면 생성해서 집어 넣는 생명주기 관리 역할도 하구요.

## 6. 더 공부해보기
1. 웹 서버와 웹 어플리케이션 서버
2. WAS가 멀티 스레드를 관리하는 방식
3. 스프링 설정 파일과 서블릿 설정 파일
4. 스프링 컨테이너에 빈을 등록하는 방법 / 컨테이너가 주입 위치를 찾는 방법
5. 디폴트 서블릿
6. 스프링과 스프링 부트

추가로 위와 같은 부분을 공부하시면 스프링에 대한 큰 흐름을 확인할 수 있는 기회가 되셨으면 좋겠습니다.

---
## 참고
- [코기의 Servlet vs Spring](https://m.youtube.com/watch?v=calGCwG_B4Y){: target="_blank"}


{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
