---
layout: post
title: "Mybatis Interceptor"
subtitle: ""
comments: true
categories : DB
date: 2022-04-27
background: '/img/posts/06.jpg'
---

## 정리하는 이유
 * 업무 중 VOC로 '이건 할 수 없습니다.' 라는 내용으로 알림창이 뜨면서 특정 기능을 사용불가 하다는게 올라왔습니다. 위 알림은 다국어 처리가 되어 있는 내용이었는데 해당하는 다국어가 Mybatis Interceptor 쪽에만 있어 뭐가 문제인지 확인하는데 어려웠습니다. 이건 알아놓으면 좋을 것 같아 정리 합니다.

## Mybatis Interceptor?
 * Interceptor 라는 단어가 붙는 것에서 알 수 있듯이 Mybatis를 사용하여 데이터를 조회 할 때 쿼리가 실행되는 시점의 전후에 개발자가 원하는 기능을 추가로 실행될 수 있게 한다.

## 사용방식
 * 구글에 검색 해보면 쿼리 로그를 다루는 걸 많이 사용하는 것 같습니다. 역시 Interceptor 예시로 가장 만만한건 로그 인거 같네요.
 * 1. Interceptor의 개발은 ibatis의 interceptor 인터페이스를 구현해주면 됩니다. 여기서 눈여겨 봐야 할 것은 iinterceptor메서드 입니다 실제로 기능이 실행되는 메서드기 때문에 여기에 로직을 작성해줘야 하기 때문이져.
 * 2. 이 inteerceptor 메서드에서도 주의깊게 봐야하는게 있는데 Invocation 파라미터 입니다. 여기엔 파라미터로 전달된 값과 호출된 xml태그(작성된 쿼리문)에 대한 메타데이터를 가지고 있는 객체 입니다. 여기에 들어있는 데이터를 기반으로 개발자가 원하는 로직을 작성해주면 되겠습니다.
 
  ```java
    // 이런식으로 작성해주면 간단하게 가능합니다!
    @Intercepts(@Signature(
			type=Executor.class, 
			method="query", 
			args= {MappedStatement.class, Object.class, RowBounds.class, ResultHandler.class}))

    public class LogInterceptor implements Interceptor{

      @Override
      public Object intercept(Invocation invocation) throws Throwable {

            //QueryId
        String queryID = ((MappedStatement)invocation.getArgs()[0]).getId();
        System.err.println("Query ID : \n" + queryID);

            //Query Parameter
        Object param = invocation.getArgs()[1];
        //Query String
            String queryString = ((MappedStatement)invocation.getArgs()[0]).getBoundSql(param).getSql();
        System.err.println("Query String : \n" + queryString);

        return invocation.proceed();
      }

      @Override
      public Object plugin(Object target) {
        return Plugin.wrap(target, this);
      }

      @Override
      public void setProperties(Properties properties) {
      }

    }
  ```



{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
