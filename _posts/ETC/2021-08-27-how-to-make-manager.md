---
layout: post
title: "mode, event에 대한 매니저 만들어서 사용해보기"
subtitle: ""
comments: true
categories : ETC
date: 2021-08-27
background: '/img/posts/06.jpg'
---
## 모드를 관리하는 코드 구조

```javascript
//1. 모드 객체
//onStart, onEnd - 모드의 시작과 끝에 해당하는 콜백
//뭔가 더 필요하다면 additionalCallback 같은걸 추가로 인자로 주는 식으로 활용할 수 있다.
var Mode = function( onStart, onEnd, additionalCallback ){
  This.onStart = onStart;
  This.onEnd = onEnd;
  This.additionalCallback = additionalCallback;
}

Mode.prototyp = {
  start: function(){
    // apply를 통해 onStart에 필요한 파라미터를 전달 할 수 있다.
    this.onStart.apply( this, arguments );
  },
  end: function(){
    // start와 동일하게 apply를 사용할 수도 있겠지만 필요 없다면 사용하지 않을 수도 있다.
    this.onEnd();
  }
}

// 2. 모드를 관리하는 매니저 객체
// 모드만을 관리하는 객체를 만들 수도 있지만 아래와 같이 활용하면 시스템에서 사용하는 모든 객ㅊㅔ들을 관리하는 매니저로 사용할 수 있다.
// 여기에ㅅㅓ는 여러 종류(mode, event)의 객체들을 관리하기 위한 매니저를 만들었다.
var Manager = {
  mode: (function(){
    return {
      now: null,
      getNowModeName: function(){
        for(var name in Manafer.mode.list ){
          if( Manafer.mode.list[ name ] == Manager.mode.now ){
            return name;
          }
        }
      },
      // 모드의 리스트를 관리할 때는 아래와 같이 2rkwl qkdtlrdl dlTdmf tn dlTek.
      // iife를 이용해 모드들에서 사용하려고 하는 변수 / 기능 / 로직을 넣을 수 있다.
      // 그런게 필요없다면 그냥 객체로 관리해도 되지만 iife를 사용하는 편이 좋아 보인다.
      list: (function(){
        return {
          "readonly": (function(){
            // 모드의 시작, 끝, 추가 기능에 대한 콜백을 인자로 mode 객체를 만들었다.
            var mode = new Mode(
              function onStart(){},
              function onEnd(){},
              function additionalCallback(){}
            );

            return;
          })(),
          // 아래와 같이 필요한 객체들을 계속 추가 해주면 된다.
          "basic": (function(){
            var mode = new Mode(
              function onStart(){},
              function onEnd(){},
              function additionalCallback(){}
            );

            return mode;
          })(),
        } 
      })(),
      list: {
      }
    }
  })(),

  event: (function(){
    var eventList = {
      /**
       * eventName: [ callbacks ]
       */
    }

    return {
      add: function( eventName, callback ){
        if( eventList[ eventName ] == null ){
          eventList[ eventName ] = [ callback ];
        }
      },

      remove: function(){
        var eventCallbacks = eventList[ eventName ];
        if( eventCallbacks != null ){
          eventCallbacks.splice( i, 1 );
          return;
        }
      }
      dispatch: function(){
        var ars = Array.prototype.slice.call( arguments );
        aguments.shift();

        var callbackList = eventList[ eventName ];
        if( callbackList == null ){
          return;
        }

        for( var i = 0; i < callbackList.length; ++i ){
          callbackList[ i ].apply( api, args );
        }
      }
    }
  })()
}

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
