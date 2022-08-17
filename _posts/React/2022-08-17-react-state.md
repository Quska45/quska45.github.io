---
layout: post
title: "무비의 React의 state(10분 테코톡)"
subtitle: ""
comments: true
categories : React
date: 2022-08-17
background: '/img/posts/06.jpg'
---

# 소개
우아한형제들의 유투브 채널인 `우아한Tech`에 올라온 React의 state에 관한 영상을 바탕으로 글을 작성합니다.
9:13초의 영상입니다.
목차는 아래와 같습니다.
```
1. React에서 state란?
2. 클래스형 컴포넌트의 setSatate
3. 함수형 컴포넌트의 useSatate
```

## 1. React에서 state란?
일단 state의 정의는 `컴포넌트안에서 관리되는 일반 자바스크립 객체` 입니다.
즉, 그냥 객체라는 말입니다.
state는 객체일 뿐이지만 하는 역할은 정말 중요합니다.
차근차근 알아보도록 하겠습니다.

### 1-1. 바닐라 스크립트 데이터바인딩 vs React 데이터 바인딩 예시
먼저 바닐라 스크립트 데이터 바인딩 부터 보겠습니다.
```javascript
let count = 0;

function handleClick() {
  count = count + 1;
  rerender();
}

function rerender(){
  const countText = document.getElementById('count-text');
  countText.textContent = `현재 count ? ${count}`;
}
```
위의 코드를 통해 count가 변경되면 실제 화면에 보이는 값을 직접 변경 해줘야 한다는 것을 알 수 있습니다.
그럼 이제 리액트의 데이터 바인딩을 보겠습니다.
<br/>
```javascript
constructor(){
  ...
  this.state = {
    count: 0
  }
}

handleClick(){
  this.setState((state) => {
    count: state.count + 1
  })
}

render(){
  return(
    <>
    <button onClick={handleClick}>+ 1<button>
    <h1>현재 count ? {this.state.count}</h1>
    </>
  )
}
```
위의 코드를 통해 state가 변경되면 화면에 보이는 값이 바로 변경된다는 것을 알 수 있습니다.
이것과 관련된 개념은 `데이터 바인딩`입니다.
그럼 이제 `데이터 바인딩`에 대해서 알아 보겠습니다.

### 1-2. 데이터 바인딩
제공자와 소비자로부터 데이터 원본을 결합시켜 이것들을 동기화 시키는 기법 입니다.
바닐라 스크립트에서 우리가 직접 자바스크립트 객체와 화면의 데이터를 동기화 시켜야 했습니다.
하지만 리액트는 데이터 바인딩을 대신 해주기 때문에 우리의 수고를 덜 수 있습니다.
쉽게 얘기하면 데이터를 view에 넣어주는 것을 뜻 합니다.
리액트는 단방향 데이터 바인딩을 지원하는데, 이것을 통해 데이터와 템플릿을 결합하여 화면을 생성합니다.

### 1-3. state
리액트에서 단방향 데이터 바인딩을 가능하게 하는 것이 state입니다.
state를 사용하면 state가 변경 될 때 마다 화면이 자동으로 rerendering 됩니다.
리액트의 컴포넌트에서 데이터는 하향식으로 흐릅니다.
부모 컴포넌트의 state는 자식 컴포넌트의 props로 전달 됩니다.
이런 관계에서 props가 누구의 state 인지 알고 있을 필요가 없습니다.
따라서 state는 캡슐화의 한 형태로 불리기도 합니다.
state를 가진 컴포넌트 외에는 state에 접근할 수 없기 때문입니다.

### 1-4. props와 state의 차이
- props : 부모로부터 전달 받는 읽기 전용 데이터 입니다.
- state : 해당 컴포넌트에서만 관리됩니다.

## 2. 클래스형 컴포넌트의 setState
클래스형 컴포넌트에서 state를 변경하기 위해서 setState를 사용합니다.
여기서 의문이 드는 점은 state를 직접 변경해도 될 것 같은데 setState를 사용하는 이유입니다.
결론 부터 말씀드리면 state를 직접 변경하는 경우 rerendering이 일어나지 않기 때문입니다.
이런 이유는 react의 라이프 사이클 흐름과 관련되어 있습니다.
라이프 사이클 흐름에서 render 함수가 실행 되어야만 화면이 업데이트 됩니다.
setState는 컴포넌트 업데이트 프로세스를 trigger 해주기 때문에 프로세스가 진행되면서 render함수가 실행되고 rerendering이 일어나게 됩니다.

### 2-1. setState 심화
렌더링에 대한 과정을 간단하게 나타내면 다음과 같습니다.
- 1. setState를 통해 state를 변경합니다.
- 2. state가 변경됨을 감지
- 3. 화면을 re-render 합니다.

위 과정에서 하나 알아두어야 할 점은 setState가 비동기적으로 작동한다는 것입니다.
또 하나 알고 있어야 하는 점은 컴포넌트가 re-render될 때 까지 state는 갱신되지 않는 다는 점입니다.
이것을 이해 하기 위해서 코드 예시를 보겠습니다.
```javascript
incrementCount(){
  this.setState({
    count: this.state.count + 1
  });
}

handleSomething(){
  this.incrementCount();
  this.incrementCount();
  this.incrementCount();
}
```
위 코드를 통해 화면에 표시되는 결과를 예측해 봅시다.
아마 `3`이 나오지 않을까 하는 예상을 할 수도 있을 것 같습니다.
하지만 실제 표시되는 값은 `1` 입니다.
비동기적으로 작동하는 setState의 특성 때문입니다.
위 코드는 setState에 전달되는 인자가 객체기 때문에 전달되는 this.state.count의 값은 항상 0입니다.
따라서 아무리 여러번 incrementCount를 호출해도 count의 값은 `0 + 1`이 되고 화면은 한 번만 re-render 됩니다.
위에서 언급했던 것 처럼 re-render가 실행되야만 state가 갱신 되기 때문에 화면에 표시된 count의 값은 1입니다.
그럼 이제 3이 화면에 표시되도록 하는 코드를 보겠습니다.

```javascript
incrementCount(){
  this.setState((state) => {
    return {count: this.state.count + 1}
  })
}

handleSomething(){
  this.incrementCount();
  this.incrementCount();
  this.incrementCount();
}
```







---
## 참고
- [무비의 React의 state](https://m.youtube.com/watch?v=NpTizz_qgtA){: target="_blank"}
- [비동기로 동작하는 react의 setState에 대하여](https://velog.io/@kym123123/%EB%B9%84%EB%8F%99%EA%B8%B0%EB%A1%9C-%EB%8F%99%EC%9E%91%ED%95%98%EB%8A%94-react%EC%9D%98-setState%EC%97%90-%EB%8C%80%ED%95%98%EC%97%AC){: target="_blank"}


{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
