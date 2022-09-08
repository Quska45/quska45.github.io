---
layout: post
title: "코기의 Servlet vs Spring(10분 테코톡)"
subtitle: ""
comments: true
categories : Node
date: 2022-08-02
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
서블릿 컨테이너를 바구니로 추상화해보겠습니다.
사용자 요청






---
## 참고
- [코기의 Servlet vs Spring](https://m.youtube.com/watch?v=calGCwG_B4Y){: target="_blank"}


{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
