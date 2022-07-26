---
layout: post
title: "babel-preset-env는 무엇이고 왜 필요한가?"
subtitle: "babel-preset-env를 중심으로 babel 이해하기"
comments: true
categories : Node
date: 2022-07-26
background: '/img/posts/06.jpg'
---

# 소개
테스트 도구를 프로젝트에 적용하면서 babel설정을 하면서 preset에 대해서 더 깊게 알고 싶다는 생각이 들었습니다.
구글링을 하던 중 pop8692.log님의 블로그에서 [좋은 글](){:target="_blank"}을 발견하여 공부를 목적으로 해당 글에 기반하여 글을 작성합니다.
제목은 `babel-preset-env는 무엇이고 왜 필요한가?` 이지만 babel에 대한 이해를 도와준다는 느낌도 많이 받았던 글입니다.

## .babelrc?
모던 javascript 프로젝트를 시작할 때 , babel을 설치하고 babel-preset-env plugin 설정을 .babelrc에서 했다고 가정해보겠습니다.
```json
{
  presets:['@babel/preset-env']
}
```
이렇게 하면 아마 잘 작동할 것입니다. 하지만 저희는 `.babelrc` 파일의 설정을 통해 무엇을 하고 어떻게 동작하는지 알고 싶습니다.

## babel from scratch
babel은 webpack과 같은 빌드 시스템과 함께 사용합니다.
babel을 이해하기 위해서는 webpack이 처리해주는 대로 babel을 사용하는 것보단 바벨만을 사용하는 프로젝트를 생성해서 연습해보면 좋습니다.
먼저 빈프로젝트를 생성해 보겠습니다. 추가로 babel도 설치해주겠습니다.

```sh
mkdir babel-test
cd babel-test
npm init -y
npm install -D @babel/core @babel/cli
```

이제 input.js라는 파일을 만들고 간단한 코드도 추가해보겠습니다.

```javascript
const hello = () => console.log("hello world")
```

위 코드는 arrow function을 사용했습니다.
babel은 이렇게 es6로 작성된 코드를 es5로 변환시켜줍니다.
그럼 babel을 사용해서 실제로 변환되는지 확인해 보겠습니다.

```sh
npx babel input.js --out-file output.js
```

이제 생성된 output.js 파일을 열어보면 완전히 동일한 코드가 있는 것을 확인 할 수 있습니다.
이를 통해 알 수 있는 것은 babel은 그 자체로는 아무것도 하지 않는 다는 것입니다.
preset, plugin이 없다면 우리가 바벨을 통해서 한다고 생각했던 일들을 할 수 없는 것이죠.

## 진짜 동작하는 것은 babel plugin 이다.
babel이 무엇을 하게 하려면 plugin을 설치해야 합니다.
babel의 많은 plugin은 npm 라리브러리를 가지고 있습니다.
그래서 설치하고 싶은 각각의 plgin을 위해 새로운 npm 라이브러리를 설치하거나 또는 preset을 쓸 수 있습니다.
지금부터 es6의 arrow function을 컴파일 할 babel plugin을 설치해 보겠습니다.

```sh
npm install -D @babel/plugin-transform-arrow-functions
```

이제 설치된 라이브러리를 babel이 사용할 수 있도록 해야 합니다.
`.babelrc` 파일에 내용을 추가해주면 됩니다.

```sh
{
  plugins: ['@babel/plugin-transform-arrow-functions']
}
```

이제 babel을 다시 실행하고 생성된 output.js 파일을 보겠습니다. 맨 처음 저희가 원했던 es5코드가 있는 것을 볼 수 있습니다.
```javascript
const hello = function () {
  return console.log("hello world!");
};
```

babel은 이렇게 자신이 원하는 기능만 다운받고 적용할 수 있도록 구성되어 있습니다.
이렇게 사용해도 문제는 없지만 babel의 아주 여러가지 기능을 사용하는데 이것을 일일이 다운 받고 적용하는 것은 매우 피곤한 일입니다.
이럴 때 사용할 수 있는 것은 preset입니다.

## babel plugins에서는 번들로 babel preset이 함께 온다.
babel foundation에서는 plugin들을 포함한 번들(plugin들을 모아놓은 파일이라고 생각하면 됩니다.)파일을 포함 하는 `preset`을 만들었습니다.
즉 `preset`을 사용하면 여러가지 plugin들이 자동적으로 설치된다는 뜻입니다.
babel에서 제공하는 공식 preset 몇 가지를 소개하겠습니다.
- @babel/preset-env
- @babel/preset-flow
- @babel/preset-react
- @babel/preset-typescript

각각의 preset은 우리가 설치 설정해야할 npm dependency를 가지고 있습니다.
이제는 babel-preset-env를 사용하기 위한 개념적인 준비를 마쳤습니다.

## @babel/preset-env를 실행해보자.
위의 예시에서 사용했던 @babel/plugin-transform-arrow-functions 대신 `babel-preset-env`를 사용해봅니다.
먼저 설치부터 해야 합니다.
```sh
npm install -D @babel/preset-env
```
.babelrc 파일에서 preset에 대해서 설정합니다.
```json
{
  presets:['@babel/preset-env']
}
```

---
## 참고
- [웹팩 공홈 dev-tool 페이지](https://webpack.kr/configuration/devtool/)


{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
