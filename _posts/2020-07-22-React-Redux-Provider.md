---
layout: post
title: "React Redux의 Provider는 무엇인가?"
subtitle: "공식홈페이지 번역"
comments: true
date: 2020-07-21 10:45:13 -0400
background: '/img/posts/06.jpg'
---

## Provider

<br>

### Overview
Provider는 connect() 메서드로 감싸진 어느 컴포넌트에서든 Redux의 store를 사용할 수 있게 해주는 컴포넌트 이다.

React Redux app이 연결된 리액트 컴포넌트의 탑레벨에 Provider 컴포넌트로 감싸주면 앱의 모든 컴포넌트가 트리안으로 들어오게 된다.

보통 Provider 없이는 컴포넌트가 연결 되지 않는다. 그냥 추가 하고 시작한다고 생각하면 될것 같다. 

<br>

### Props
<i class="font1">store</i> (Redux Store)너의 앱의 하나 있는 리덕스 store를 의미한다.
<br>
<i class="font1">children</i> (ReactElement) 컴포넌트 계층의 root를 의미한다.
<br>
<i class="font1">context</i> 너는 아마 context instance를 제공할 것이다. 만약 너가 그렇게 했다면 너는 연결된 모든 컴포넌트들에도 같은 context instance를 제공해줘야 한다. 만약 같은 상태 주는 것을 실패하면 다음과 같은 런타임에러가 뜨게 된다.
```
Invariant Violation

Could not find "store" in the context of "Connect(MyComponent)". Either wrap the root component in a <Provider>, or pass a custom React context provider to <Provider> and the corresponding React context consumer to Connect(Todo) in connect options
```

###  Exanple Usage
다음 예시에서 <App/>이 우리의 root-level 컴포넌트다. 이게 탑레벨이니까 이걸 Provider로 감싸줘야 한다.

##### Vanilla React Example
```
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { App } from './App'
import createStore from './createReduxStore'

const store = createStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

##### Usage with React Router
```
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router-dom'

import { App } from './App'
import { Foo } from './Foo'
import { Bar } from './Bar'
import createStore from './createReduxStore'

const store = createStore()

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route exact path="/" component={App} />
      <Route path="/foo" component={Foo} />
      <Route path="/bar" component={Bar} />
    </Router>
  </Provider>,
  document.getElementById('root')
)
```



<!--필기체 샘플 
    <blockquote class="blockquote">The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.</blockquote> -->

<!--타이틀 샘플 
    <h2 class="section-heading">Reaching for the Stars</h2> -->
<!--
    이미지와 이미지 아래 들어가는 텍스트 샘플 
<img class="img-fluid" src="https://source.unsplash.com/Mn9Fa_wQH-M/800x450" alt="Demo Image">
<span class="caption text-muted">To go places and do things that have never been done before – that’s what living is all about.</span> -->

{%- if site.disqus.shortname -%}
    {%- include disqus.html -%}
{%- endif -%}