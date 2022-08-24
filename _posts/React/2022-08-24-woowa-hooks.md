---
layout: post
title: "우연의 Hooks(10분 테코톡)"
subtitle: ""
comments: true
categories : React
date: 2022-08-24
background: '/img/posts/06.jpg'
---

# 소개
우아한형제들의 유투브 채널인 `우아한Tech`에 올라온 Hooks에 관한 영상을 바탕으로 글을 작성합니다.
08:41초의 영상입니다.
목차는 아래와 같습니다.
```
1. Hooks란?
2. Hooks 종류
3. Hooks 규칙
4. Custrom Hook
```

## 1. Hooks란?
React 16.8 버전에서 클래스형 컴포넌틑만을 사용할 때 부딪히는 수많은 문제들을 해결하기 위해서 나온 것입니다.

### 1-1. 클래스형 컴포넌트의 문제점
1. 컴포넌트의 상태 로직 재활용 어려움
  - Hooks가 없었을 때는 클래스 컴포넌트만이 state를 저장할 수 있었습니다.
  - 하지만 이로인해 관심사 분리가 제대로 이뤄지지 않아서 중복이 많고 크기가 너무 큰 컴포넌트 들이 만들어졌습니다.
  - 유지보수, 테스팅이 어려웠습니다.
  - HOC(Higher Order Component)를 사용하여 컴포넌트를 쪼개려 해봤지만 결국엔 Wrapper Hell을 만들어 코드는 여전히 복잡했습니다.

2. 클래스는 혼란을 줄 수 있다.
  - 클래스 컴포넌트의 방식이 너무 복잡하고 this를 잘못 관리하면 예상치 못한 오류를 발생시키기도 했습니다.

위와 같은 문제점 때문에 함수를 사용하고 싶었지만 함수는 상태를 가질 수 없기 때문에 사용되지 못했었습니다.

### 1-2. 함수가 상태를 가지지 못하는 이유
함수형 컴포넌트들은 기본적으로 리렌더링 될 때 함수 안에 작성된 모든 코드가 다시 실행됩니다.
이는 함수형 컴포넌트들이 기존에 가지고 있던 상태를 전혀 관리 할 수 없게 만듭니다.

### 1-3. Hooks를 사용하면 함수가 상태를 가질 수 있는 이유
리액트는 useState를 통해 생성한 상태에 접근하고 유지하기 위해서 Closure를 이용하여 함수형 컴포넌트 바깥에 state를 저장합니다.
따라서 상태가 업데이트 되었을 때, 이 상태들은 리액트 컴포넌트 바깥에 선언되어 있는 변수들이기 때문에 업데이트 한 후에도 이 변수들에 접근 할 수 있게 됩니다.

## 2. Hooks 종류
Hooks에는 몇 가지 종류가 있는데 이것에 대해서 알아보겠습니다.

## 2-1. useState
함수 컴포넌트 안에서 state를 사용할 수 있게 합니다
클래스형 컴포넌트의 this.state / this.setState와 동일한 기능 입니다.
함수형 / 클래스형 컴포넌트가 상태관리를 어떻게 하는지 코드를 통해 보도록 하겠습니다.

```javascript
// 클래스형 컴포넌트
class ClassExaple extends Component{
  constructor(){
    super();
    this.state = {
      count: 0,
    }
  }
  
  increase = () => {
    this.setState((prev) => ({ count: prev.count + 1 }));
  }
  
  decrease = () => {
    this.setState((prev) => ({ count: prev.count - 1 }));
  }
  
  render() {
    return {
      <>
        <div>{this.state.count}</div>
        <button onClick={this.increase}>+</button>
        <button onClick={this.decrease}>-</button>
      </>
    }
  }
}
```

```javascript
const Example = () => {
  const [count, setCount] = useState(0);
  
  const increase = () => {
    setCount((prev) => prev + 1);
  };
  
  const decrease = () => {
    setCount((prev) => prev - 1);
  }
  
  return (
    <>
      <div>{count}</div>
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>
    </>
  )
}
```
위 코드에서 봐야하는 부분은 상태의 선언과 increase, decrease 메서드의 코드 입니다.
유사하지만 조금 씩 다르니 확인해보시면 좋을 것 같습니다.

### 2-2. useEffect
함수 컴포넌트 안에서 side effect를 수행할 수 있게 합니다.
클래스형 컴포넌트에서 Lifecylcle과 유사한 기능입니다.
useEffect에 대한 예시 코드도 보겠습니다.

```javascript
// 클래스형 컴포넌트
class ClassExample extends Component {
  constructor(){
    super();
    this.state = {
      name: "",
    }
  }
  
  componentDidMount() {
    console.log("mount");
  }
  
  componentDidUpdate(prevProps, prevState){
    if(this.state.name != prevState.name){
      console.log(`update ${this.state.name}`);
    }
  }
  
  componentWillUnmount(){
    console.log("unmount");
  }
  
  render(){
    return <div>{this.state.name}</div>
  }
}
```

---
## 참고
- [](){: target="_blank"}


{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
