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
  - 1-1. 클래스형 컴포넌트의 문제점
  - 1-2. 함수가 상태를 가지지 못하는 이유
  - 1-3. Hooks를 사용하면 함수가 상태를 가질 수 있는 이유
2. Hooks 종류
  - 2-1. useState
  - 2-2. useEffect
  - 2-3. useEffect 심화
3. Hooks 규칙
4. Custom Hook
  - 4-1. useInput
  - 4-2. useFectch
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
Hooks에는 여러 가지 종류가 있는데 여기서는 2가지만(useState, useEffect) 알아보겠습니다.

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

```javascript
const Example = () => {
  const [name, setName] = useState("");
  
  useEffect(() => {
    console.log("mount"); // 클래스형 컴포넌트의 componentDidMount
    
    return () => {
      console.log("unmount"); // 클래스형 컴포넌트의 componentWillUnmout
    };
  }, []);
  
  useEffect(() => {
    console.log(`update ${name}`); // 클래스형 컴포넌트의 componentDidUpdate
  }, []);
  
  return <div>{name}</div>
}
```
위의 코드와 같이 클래스형 컴포넌트의 라이프 사이클이 함수형 컴포넌트의  useEffect로 대체 될 수 있습니다.
다만 useEffect 안에서 사용하는 state나 props가 있다면 useEffect의 dependency array에 넣어줘야 합니다.
그렇지 않으면 useEffect에 등록한 함수가 실행될 때 최신 state/props를 사용하지 않습니다.
만약 dependency array 파라미터를 생략한다면 컴포넌트가 리렌더링 될 때마다 호출 됩니다.

### 2-3. useEffect 심화
그렇다면 useEffect는 클래스형 컴포넌트의 모든 라이프사이클을 표현하는 하는 것이 가능 할까요?
정답은 가능하지 않다 입니다.
에러 처리를 위해 사용하는 ErrorBoundary에서 많이 사용되는 getDerivedStateFromError, componentDidCatch 등은 useEffect로는 나타낼 수 없습니다.
라이브러리를 사용하거나 개발자가 직접 이를 처리하기 위한 구현을 할 수는 있지만 어쨌든 Hooks의 useEffect만으로는 불가한 것들이 존재 합니다.

## 3. Hooks 규칙
1. 최상위에서만 Hook을 호출
  - React 컴포넌트의 최상위에서만 Hook을 호출해야 합니다.
  - 위의 규칙을 따라야만 컴포넌틑 렌더링 시에 동일한 순서로 Hook이 호출되는 것을 보장할 수 있습니다.

2. React 함수에서만 Hook을 호출
  - Custom Hook에서는 호출 가능
  - 일반적인 Javascript 함수에서는 호출 x
  - 이 규칙을 지키면 컴포넌트의 모든 상태 관련 로직을 소스코드에서 명확하게 보이도록 할 수 있다.

3. Hook을 만들 때 앞에 use 붙이기
  - 한눈에 봐도 Hook 규칙이 적용되는지 파악할 수 있기 때문입니다.
  - 이 규칙을 지키지 않으면 특정한 함수가 그 안에서 Hook을 호출하는지를 알 수 없기 때문에 Hook 규칙의 위반 여부를 체크하기 어렵습니다.

## 4. Custom Hook
이는 특별한 리액트의 기능이라기 보단 Hook의 디자인을 따르는 관습입니다.
Custom Hook은 중복된 로직을 재활용하기 위해 사용합니다.
리액트 공식문서에서는 복잡한 로직을 단순한 인터페이스 속에 숨길 수 있도록 하거나 복잡하게 뒤엉킨 컴포넌트를 풀어내도록 도울 때 Custom Hook 사용을 권장합니다.

### 4-1. useInput
Custom Hook의 하나인 useInput에 대한 코드 예시를 보겠습니다.
```javascript
const useInput = ( initialValue ) => {
  const [ value, setValue ] = useState( initialValue );
  const onChange = ( event ) => {
    const{
      target: { value }
    } = event;
    setValue( value );
  };
  
  return { value, onChange }
}

const App = () =>{
  const name = useInput( "" );
  
  return (
    <input
      placeholder = {"Write here..."}
      value = { name.value }
      onChange = { name.onChange };
    />
  )
}
```


```javascript
const useInput = ( initialValue, validator ) => {
  const [ value, setValue ] = useState( initialValue );
  const onChange = ( event ) => {
    const{
      target: { value }
    } = event;
    
    let updateFlag = true;
    
    if( typeof validator === "function" ){
      updateFlag = validator( value );
    }
    
    updateFlag ? setValue(value) : alert( "Can't enter!" );
  };
  
  return { value, onChange };
}

const App = () =>{
  const chkWork = ( value ) => value.length < 5 && !value.includes( "0" );
  const name = useInput( "", chkWord );
  
  return (
    <input
      placeholder = {"Write here..."}
      value = { name.value }
      onChange = { name.onChange }
    />
  )
}
```
useInput은 위와 같이 useInput으로 hook을 하나 만들고 모든 인풋이 사용할 수 있도록 할 수 있습니다.
chkWord라는 변수를 이용해 validator를 사용한 부분이 좋은 예시 입니다.
위의 예시는 input이 1개만 사용되는 간단한 예시지만 만약 여러개의 input이 사용되고 
, 이를 useState를 사용한다면 똑같은 체크로직을 여러번 작성해야만 합니다.

### 4-2. useFetch
```javascript
// useEffectSomthing.js
import { useState, useEffect } from "react";

function useFecth( url ){
  const [ data, setData ] = useState([]);
  const [ loading, setLoading ] = useState( trur );
  const [ error, setError ] = useState( null );
  
  useEffect(() => {
    const callApi = async () => {
      try {
        const res = await fetch(url, {
          method: "GET",
          headers:{ "Content-type": "application/json" },
        });
        const data = ( await res.json() ).data;
        setData( data );
      } catch( err ){
        setError( err );
      } finally {
        setLoading( false );
      }
    };
    
    callApi();
  }, [url]);
  
  return { data, loading, error };
}

export default useFetch;

// Example.js
const EXample = () => {
  const { name, loading, error } = useFetch( `${API_URL_NAME}` );
  
  return (
    <>
      {loading ? (
        <div>로딩 중 입니다...</div>
      ) : error ? (
        <div>에러 입니다.</div>
      ) : (
        <div>{name}</div>
      )}
    </>
  );
};
```
useFetch를 사용해 data, loading, error라는 state를 관리할 수 있도록 만들었습니다.
fetch 해 오는 resource의 로딩이 성공/실패의 경과를 가지고 있고 결과에 상관없이 로딩은 반드시 종료 됩니다.


---
## 참고
- [우연의 Hooks](https://m.youtube.com/watch?v=evJ_O-H-EJI){: target="_blank"}


{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
