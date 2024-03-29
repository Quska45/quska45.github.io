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
  - 1-1. 바닐라 스크립트 데이터 바인딩 vs React 데이터 바인딩 예시
  - 1-2. 데이터 바인딩
  - 1-3. state
  - 1-4. props와 state의 차이
2. 클래스형 컴포넌트의 setSatate
  - 2-1. setState 심화
  - 2-2. setState가 비동기적으로 작동하는 이유
3. 함수형 컴포넌트
  - 함수형 컴포넌트의 useState
4. 마무리
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
만약 handleSomething을 한번 더 실행 시키면 현재 this.state.count의 값은 `1`이기 때문에 `2`로 업데이트 됩니다.
그럼 이제 3이 화면에 표시되도록 하는 코드를 보겠습니다.

```javascript
incrementCount(){
  this.setState((state) => {
    return {count: state.count + 1}
  })
}

handleSomething(){
  this.incrementCount();
  this.incrementCount();
  this.incrementCount();
}
```
기존에 객체를 넘겨주던 코드에서 함수를 넘겨주도록 변경된 것을 알 수 있습니다.
함수의 리턴 값이 count 값인 것도 보이네요.
하나 주의 하실 점은 리턴 값이 동일한 것 처럼 보이지만 그렇지 않습니다.
콜백으로 넘겨주는 함수에 state라는 인자가 있고 이것을 사용하고 있습니다.
이런식으로 setState함수에서 사용되는 콜백을 `업데이트 함수(updator)`라고 부릅니다.
업데이트 함수를 사용하면 state를 업데이트 할 때마다 업데이트 되는 것이 보장 됩니다.
이유는 위에서 잠깐 언급 드렸던 콜백의 `state 인자` 덕분입니다.
이는 최신의 state임을 보장해 줍니다.

### 2-2. setState가 비동기적으로 작동하는 이유
연속적으로 state를 변경하고 변경 횟수만큼 re-render를 진행한다면 이는 성능저하를 가져오는 비효율적인 방식입니다.
위의 코드 예시만 보더라도 handleSomething이라는 함수에서 state가 3번 변경되는데,
이 때 마다 렌더링을 다시 하는 것 보단 일단 state만 3번 변경하고 렌더링을 한번만 하는 것이 효과적입니다.
만약 setState가 동기적으로 작동한다고 가정하고, 부모 컴포넌트와 자식 컴포넌트로 예시를 확장하면 비효율은 더욱 커지게 됩니다.
1. 자식 컴포넌트가 re-render
2. 부모 컴포넌트 re-render
3. 부모 컴포넌트가 re-render 됐기 때문에 자식 컴포넌트 다시 re-render

위와 같은 경우가 생기게 됩니다.
비동기 동작의 결론을 말씀 드리면 성능향상을 위해 setState의 실행을 지연시키고 여러 컴포넌트를 한번에 갱신한다고 할 수 있습니다.
따라서 리액트는 setState가 연속적으로 호출되면 setState를 모아서 배치처리하고 갱신을 진행합니다.
이런 setState의 특성 때문에 state를 변경하고 값에 바로 접근하는 것은 좋은 방식이 아닙니다.
만약 예시에서 활용된 업데이트 함수를 사용하고 싶지 않다면 생명주기 함수인 componentDidUpdate를 활용하는 방법도 있습니다.

## 3. 함수형 컴포넌트의 useSatate
useState를 알아보기 전에 함수형 컴포넌트에 대해서 간단히 정리하겠습니다.
리액트는 클래스형 컴포넌트와 함수형 컴포넌트 2가지를 가지고 있습니다.
함수형 컴포넌트는 stateless 컴포넌트라고 부르기도 합니다.
state가 없다는 의미 인데, state가 없다면 상태관리는 어떻게 할까라는 의문이 들 수 있습니다.
먼저 state가 없는 이유는 함수형 컴포넌트가 말 그대로 함수 이기 때문입니다.
함수가 종료되고 다시 실행된다면 함수가 가지고 있던 값들은 당연히 초기화 되게 됩니다.
따라서 state를 가질 수 없게 됩니다.
따라서 함수형 컴포넌트는 Hook의 useState를 사용합니다.

### 3-1. useState
useState는 다음 re-render 시에 배열의 첫 번째 요소로 갱신된 최신 state를 반환합니다.
```javascript
const [state, setState] = useState(initialState);
```
위 코드에서 state는 갱신된 최신의 state입니다.
위 코드에서 눈여겨볼 점은 계속 변경되는 값인 state를 const로 선언한다는 점입니다.
이렇게 하는 이유는 useState가 실제 state 값을 변경하는 것이 아니라 render 후에 state에 값을 새롭게 할당하는 것이기 때문입니다.
이런점을 봤을 때 stateless라는 의미를 이해하실 수 있을 것 같습니다.

## 마무리
수고하신 무비님에게 조금 죄송한 얘기인 것 같지만 지금까지 봤던 5개정도의 테코톡 중에서 이해하기가 가장 난해했던 영상이었던 것 같습니다.
제가 봤던 테코톡들이 DI/IOS, OSI 7계층 처럼 모든 개발자가 봐도 괜찮은 포괄적인 내용이었던 반면에,
이번 영상은 리액트 사용자 중에서도 state가 중점적으로 다뤄졌던 영상이었기 때문인 것 같습니다.
어디서 봤는지 기억은 안나지만 글을 작성할 때는 아무것도 모르는 일반인에게 설명한다고 생각하고 작성하라는 얘기를 본적이 있습니다.
이번 영상을 보면서 이해가 되지 않았던 부분들을 찾아보는 재미는 있었지만 설명을 들으면 이해가 되지 않는 부분들은 아쉬웠던 것 같습니다.
아쉬웠던 부분들도 있었지만 글을 작성하신 무비님은 이런 내용들을 완전히 이해하고 있기 때문에 이렇게 발표를 하셨다는 것을 생각해보면 배울게 많이 남아있다는 생각도 듭니다.


---
## 참고
- [무비의 React의 state](https://m.youtube.com/watch?v=NpTizz_qgtA){: target="_blank"}
- [비동기로 동작하는 react의 setState에 대하여](https://velog.io/@kym123123/%EB%B9%84%EB%8F%99%EA%B8%B0%EB%A1%9C-%EB%8F%99%EC%9E%91%ED%95%98%EB%8A%94-react%EC%9D%98-setState%EC%97%90-%EB%8C%80%ED%95%98%EC%97%AC){: target="_blank"}


{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
