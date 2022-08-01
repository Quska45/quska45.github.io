---
layout: post
title: "돔하디의 Vitual DOM"
subtitle: "React가 Vitual DOM을 활용하는 방식"
comments: true
categories : ETS
date: 2022-07-25
background: '/img/posts/06.jpg'
---

# 소개
우아한형제들의 유투브 채널인 `우아한Tech`에 올라온 Virtual DOM에 관한 영상을 바탕으로 글을 작성합니다.
10:18초의 영상이고 Virtual DOM에 관한 내용 뿐만 아니라 React와 연결하여 설명드립니다.
목차는 아래와 같습니다.
```
1. Virtual DOM 이전
  - 브라우저 렌더링 과정
  - DOM 조작의 비효율성(Virtual DOM의 필요성)
2. Virtual DOM의 동작
  - Virtual DOM 이란?
  - Virtual DOM의 동작
3. React의 Virtual DOM
  - 재조정
  - 재조정을 가능하게 하는 Diffing 알고리즘
  - ey prop이 필요한 이유
  - key prop
  - 더 알아보기
```

## 1.Virtual DOM 이전
### 브라우저렌더링 과정
실제로는 더 복잡한 과정이지만 요약하자면 아래와 같습니다.
1. DOM tree 생성 : 개발자가 작성한 HTML을 브라우저 엔진이 파싱하여 DOM tree 생성
2. Render tree 생성 : css와 같은 스타일 정보들을 파싱하여 Render tree 생성
3. Layout : 각 노드들은 어디에 위치해야 하는지에 대한 정보들을 가지게 됨
4. Painting : 앞서 얻어진 정보들을 가지고 노드들이 그려지게 됨

### DOM 조작의 비효율성(Virtual DOM의 필요성)
HTML, css 파싱 및 실제 페인팅 까지 너무 많은 비용을 지불하게 됩니다.
이는 성능의 저하로 연결됩니다.
참고로 이런 과정에서 가장 많은 비용이 낭비되는 곳은 실제 rendering입니다.
이는 기존에 많이 사용되던  SSR(Server Side Rendering)환경에서는 크게 문제가 되지 않았습니다.
생각해보면 화면을 계속해서 새로 불러오기 때문에 항상 비효율적이었다고 말할 수도 있겠네요.
하지만 리액트나 뷰의 등작으로 많이 쓰이게된
CSR(Client Side Rendering)에서는 문제가 될 수 있습니다.
복잡한 형태의 DOM Update가 자주 발생하게 되는 CSR에서 너무 많은 비용을 지불해야 하는
기존의 방식은 적합하지 않습니다.
따라서 이런 한계를 극복하려고 `Virtual DOM`이 등장하게 됐습니다.

## 2.Virtual DOM의 동작
### Virtual DOM 이란?
DOM의 가벼운 버전이라고 할 수 있습니다.
실제 DOM tree를 복제한 자바스크립트 객체 입니다.
실제 형태에 대해서 간단히 생각해보면 `var virtualDom = { ... }`와 같은 형태일 것 입니다.
그냥 하나의 객체일 뿐이라는 의미 입니다.
Virtual DOM이 가벼운 버전일 수 있는 이유는 class, style 등의 속성은 가지지만
실제 DOM을 제어하는 API 메서드는 가지고 있지 않기 때문입니다.

### Virtual DOM의 동작
![렌더링 과정](https://velopert.com/wp-content/uploads/2017/03/wvbwscn7oadykroobdd3.png){: width="723"}
1. 최초에 브라우저는 실제 DOM tree를 생성합니다.
2. 이떄 생성된 DOM을 복사한 Virtual DOM도 생성됩니다. 이는 DOM tree를 복사한다는 의미로도 이해할 수 있습니다.
3. 이후에 DOM tree가 변경되면 Virtual DOM은 변경된 DOM tree 구조를 처음 다시 만듭니다.
4. Virtual DOM이 트리에서 변경점을 확인합니다.
5. DOM은 4번에서 확인된 변경된 부분만 업데이트 합니다.

Virtual DOM이 트리를 다시 구성하는 3번의 과정이 비효율적이라고 생각하실 수 있을 것 같습니다.
하지만 실제 화면을 표시하기 위한 여러가지 과정 중 가장 많은 리소르를 차지하는 것은 `rendering`입니다..
따라서 Virtual DOM이 돔을 다시 만들어 내는 과정은 아주 빠르게 이루어집니다.
실제 DOM을 변경하면 rendering이 일어나게 되고 많은 비용이 지불되기 때문에
이런 과정을 상대적으로 빠르게 처리 할 수 있는 Virtual DOM이 이를 대신하는 것입니다.
이런 과정을 이해하셨다면 Virtual DOM이 하는 역할은 버퍼링, 캐싱과 같은 역할을 한다고 생각할 수 있습니다.
DOM에 대한 조작이 이루어질 때 rendering의 횟수를 최소화 할 수 있도록 합니다.

## React의 Virtual DOM
실제 리액트 개발시 많이 사용되는 jsx 문법은 다음과 같습니다.
```javascript
// jsx 문법에 따른 코드입니다. jsx는 자바스크립트 확장문법으로 자바스크립트가 하닙니다.
const element = <h1 title="foo">Hello</h1>

// 위의 jsx는 babel에 의해 다음과 같이 바뀌게 됩니다.
const element = React.createElement(
  "h1",
  { title: "foo" },
  "Hello"
);

// 변환된 코드가 실행되어 실제 사용되는 다음의 인스턴스가 생성됩니다.
const element = {
  type: "h1", // 실제 DOM 노드의 이름입니다. 우리가 잘 알고 있는 h1태그 입니다.
  props: { // jsx에 포함된 모든 속성이들이 여기에 포함됩니다.
    title: "foo",
    children: "Hello" // children에는 하위 노드들이 전부 포함됩니다.
  }
};

// 일련의 과정을 통해 생성된 위의 인스턴스의 정보를 통해 실제 DOM 노드가 생성되게 됩니다.
const container = document.getElementById("root");
ReactDOM.render(element, container);
```

### 재조정
Virtual DOM은 UI의 이상적인 또는 가상적인 표현을 메모리에 저장하고
ReactDOM과 같은 라이브러리에 의해 실제 DOM과 동기화하는 프로그래밍 개념입니다.
위의 과정을 재조정이라고 합니다.
요약하자면 Virtual DOM과 실제 DOM을 비교하고 일치시키는 과정입니다.
이를 위해 사용되는 것이 Diffing 알고리즘입니다.

### 재조정을 가능하게 하는 Diffing 알고리즘
![Diffing 알고리즘](https://leehyungi0622.github.io/images/post_images/210316_virtual_dom_img.png){: width="723"}
위의 그림이 Diffing 알고리즘에 의해 실제 DOM이 생성되는 과정입니다.
너무 추상적인 그림이지만 Diffing 알고리즘의 역할을 이해하기에는 매우 좋은 그림입니다.
Virtual DOM과 DOM을 이어주는 중간다리 역할인 것은 알았으니 자세한 과정을 보겠습니다.
<br>
```javascript
// 위에서 봤던 코드 입니다.
const element = {
  type: "h1", // 실제 DOM 노드의 이름입니다. 우리가 잘 알고 있는 h1태그 입니다.
  props: { // jsx에 포함된 모든 속성이들이 여기에 포함됩니다.
    title: "foo",
    children: "Hello" // children에는 하위 노드들이 전부 포함됩니다.
  }
};
```
위의 코드 처럼 최초에 생성됐던 Virtual DOM을 기반으로 합니다.
만약 DOM의 변경이 일어 나야 한다면 위 Virtual DOM을 변경하는 과정이 우선됩니다.
먼저 `type`을 확인합니다.
1. 만약 같은 type에서 DOM의 변경이 일어나야 한다면 type을 제외한 속성들만 변경 내용을 적용합니다.
2. 만약 같은 type이 아니라면 이전 트리를 삭제하고 재생성하게 됩니다.

### key prop이 필요한 이유
위에서 알아본 재조정의 과정에서 `key prop`이 없다면 문제가 발생할 수 있습니다.
문제를 먼저 보시고 `key prop`에 대해 보시면 이해가 더욱 쉬울 것입니다.
기존에 생성된 트리와 새로 생성된 트리를 비교하는 과정의 문제입니다.
다음의 코드를 기준으로 설명드리겠습니다.
```html
// before
<ul>
  <li>first</li>
  <li>second</li>
</ul>
// after
<ul>
  <li>first</li>
  <li>second</li>
  <li>third</li>
</ul>
```
위 코드를 보면 `before`의 DOM에서 `third`에 해당하는 노드가 하나 추가되어 있습니다.
이는 기존 DOM에 하나의 노드가 추가된 정도의 변화로, 문제없이 실행되는 것을 알 수 있습니다.
하지만 아래의 코드는 상황이 좀 다릅니다.
```html
<ul>
  <li>first</li>
  <li>second</li>
</ul>
// after
<ul>
  <li>third</li>
  <li>first</li>
  <li>second</li>
</ul>
```
위 코드를 보면 새로운 노드가 첫 번째에 추가된 것을 알 수 있습니다.
`first, second`는 그대로 있지만 React는 이것을 알 수 없습니다.
따라서 첫 번째에 새로운 노드를 추가하면 되는 간단한 방법 대신 트리를 다시 그리게 됩니다.
트리를 다시 그린 다는 것은 결국 DOM에 대한 rendering이 일어나게 되고 성능문제를 초래 할 수 있습니다.
이런 문제를 해결하기 위해 `key prop`이 존재 합니다.

### key prop
`key prop`은 노드에 부여되는 유일한 값을 말합니다.
위와 같은 문제는 `key pop`이 유일하지 않은 값(ex : index)으로 되어 있기 떄문에 발생하는 문제 입니다.
위에 제시했던 코드의 문제를 key prop의 관점을 추가해서 보겠습니다.
```javascript
<ul>
  <li key="0">first</li>
  <li key="1">second</li>
</ul>
// after
<ul>
  <li key="0">third</li>
  <li key="1">first</li>
  <li key="2">second</li>
</ul>
```
위 코드를 보면 동일한 노드의 `key prop`이 변경된 것을 확인 할 수 있습니다.
React는 key를 기준으로 노드들을 인식하기 때문에 React에게 위 코드는 완전히 다른 DOM입니다.
따라서 모든 DOM이 다시 구성되어야 하는 불합리함이 생기게 됩니다.
이런 문제를 해결하기 위해 `key prop`을 유일한 값으로 정해 주어야 합니다.
```javascript
<ul>
  <li key="id0">first</li>
  <li key="id1">second</li>
</ul>
// after
<ul>
  <li key="id2">third</li>
  <li key="id0">first</li>
  <li key="id1">second</li>
</ul>
```
위와 같이 구성된 코드는 앞에서 계속해서 발생했던 문제를 해결합니다.
동일한 key 값을 가지는 노드는 그대로 두고 변경이 발생한 노드만 추가해주게 됩니다.

## 더 알아보기
요즘 많이 쓰이는 프론트엔트 라이브러리, 프레임워크 들이 DOM을 어떻게 관리하는지 알아보겠습니다.
- 리액트, VUE : Virtual DOM. 이 글을 통해 알아봤던 Virtual DOM을 사용합니다.
- Angular : Incremental DOM. 실제 DOM을 사용합니다.
- SVELTE : 컴파일러. 런타임시에 DOM을 제어하는 것이 아니라 컴파일 시에 모든 과정을 처리합니다. 따라서 브라우저에는 어떤 추가코드도 제공하지 않습니다.

## 마무리
10분 짜리 동영상을 정리하는데 2시간 정도의 시간이 걸렸습니다.
영상에 나오시는 `돔하디`님은 영상을 위해 위해 몇 시간이 걸렸을지 생각해보면 참 대단 한 것 같습니다.
이제 막 교육(우아한테크코스)을 끝낸 학생의 수준이 이 정도 퀄리티의 영상을 만들어 낼 수 있다는 것이 정말 놀랍고 스스로 반성하게 됩니다.
이 글을 보시는 분들이 React에서 사용되는 Virtual DOM에 대해 이해하는데 도움이 될 수 있길 바라고 
저 또한 이런 좋은 지식을 스스로 작성할 수 있는 공급자가 될 수 있도록 노력하겠습니다.

---
## 참고
- [돔하디의 Vitual DOM 유투브 영상](https://youtu.be/6rDBqVHSbgM){: target="_blank"}
- [리액트에 대해서 그 누구도 제대로 설명하기 어려운 것 – 왜 Virtual DOM 인가?](https://velopert.com/3236){: target="_blank"}
- [210213 React TIL](https://leehyungi0622.github.io/2021/02/13/202103/210316-React-review_study/){: target="_blank"}

{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
