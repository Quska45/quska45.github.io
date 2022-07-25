---
layout: post
title: "@vue/test-util 알아보기"
subtitle: "VUE-CLI 테스트 코드 작성 환경 적용 #2"
comments: true
categories : VUE
date: 2022-07-21
background: '/img/posts/06.jpg'
---

## 소개
이 글은 제가 회사 프로젝트에 테스트 코드를 작성하기 위한 환경세팅과 관련된 내용을 공유하기 위해 작성합니다.
테스트 코드를 도입하려는 분들에게 도움이 됐으면 좋겠습니다.
테스트 코드를 적용할 때 단순히 윗사람이 시켜서, 요즘 많이들 하니 나도 해볼까? 라는 생각으로 테스트 코드를 소스에 적용하는 것은 매우 안타까운 일입니다.
테스트 코드가 주는 이점이 무엇인지 스스로 생각해보고 테스트 코드를 사용하는 이유를 공감하는 것이 훨씬 더 중요한 일입니다.
이 글을 보시는 분들이 단순히 환경세팅과 관련된 내용을 얻어 가시는 것도 좋겠지만 
테스트 코드를 왜 사용해야 하고 TDD 기반의 개발이 왜 사용되는지 스스로 깊게 고민하는 계기가 됐으면 좋겠습니다.
참고로 해당 글은 [캡틴판교](https://joshua1988.github.io/vue-camp/testing/vue-test-util.html#%E1%84%8E%E1%85%AC%E1%84%89%E1%85%B5%E1%86%AB-
vue-cli-3-x-%E1%84%87%E1%85%A5%E1%84%8C%E1%85%A5%E1%86%AB-%E1%84%8B%E1%85%B5%E1%84%89%E1%85%A1%E1%86%BC-%E1%84%8B%E1%85%A6%E1%84%89%E1%85%A5-%E1%84%89%E1%85%A5%E1%86%AF%E1%84%8E%E1%85%B5
-%E1%84%87%E1%85%A1%E1%86%BC%E1%84%87%E1%85%A5%E1%86%B8){:target="_blank"}님의 글을 기반으로 작성합니다.

## [@vue/test-utils](https://v1.test-utils.vuejs.org/){:target="_blank"}

vue core팀 멤버거 제작한 테스팅 보조 라이브러리 입니다. Jest 뿐만 아니라 다른 테스트 도구도 사용할 수 있습니다.
즉 Jest와는 별개로 Vue의 테스트를 위해 만들어진 도구 입니다.
따라서 테스트를 하기 위해 Jest도 설치하고 @vue/test-util도 설치해야 한다는 고정관념을 가지지 않도록 하셨으면 좋겠습니다.


## 설치 
vue 2버전과 3버전의 설치는 조금 다를 수 있습니다.
버전 별로도 다른 방식으로 설치할 수도 있습니다. @vue/test-utils는 테스트를 위한 하나의 도구일 뿐이기 때문입니다.
저는 2버전을 사용했기 때문에 2버전을 기준으로 글을 작성하겠습니다.
3버전에 대한 예시는 캡틴판교님의 글을 참고하시기 바랍니다.

### 테스트 도구 설치
```sh
npm install jest @vue/test-utils vue-jest babel-jest --save-dev
```
jest와 @vue/test-utils는 당연히 설치해야 겠지만 `vue-jest`, `babel-jest`는 뭔지 의문이 드실 것 같습니다.
해당 라이브러리는 잠시 후에 설명 드리겠습니다. 일단은 이런게 필요하다는 것만 알아주시면 좋겠습니다.

### 바벨 설치
만약 바벨을 이미 사용하고 계시다면 설치가 불필요 할 수 있습니다.
프로젝트의 구성을 생각하시고 필요하다면 설치 하면 될 것 같습니다.
```javascript
npm install @babel/core @babel/preset-env babel-core@^7.0.0-bridge.0 --save-dev
```
참고로 @vue 하위, 혹은 다른 라이브러리에 바벨과 관련된 모듈이 있을 수 있습니다.
'이미 설치되어 있으니 이걸 사용하면 되겠다!' 라고 생각하실 수 있지만 절대 권장드리지 않습니다.
프로젝트가 커지면서 버전을 관리하기도 어렵고 개발자간의 혼란을 초래 합니다.
잘 확인하시고 바벨과 관련된 라이브러리가 프로젝트 최상위에 포함되어 있지 않다면 설치해주세요.

### 바벨 설정 추가
바벨에 대해 작성된 내용에 대한 설명은 생략하겠습니다. 요즘 FE 개발에 거의 필수적으로 사용되는 만큼 왜 이런 설정이 필요한지에 대해서 함꼐 공부하시면 좋을 것 같습니다.
[이 글](https://velog.io/@pop8682/%EB%B2%88%EC%97%AD-%EC%99%9C-babel-preset%EC%9D%B4-%ED%95%84%EC%9A%94%ED%95%98%EA%B3%A0-%EC%99%9C-%ED%95%84%EC%9A%94%ED%95%9C%EA%B0%80-yhk03drm7q){:target="_blank"}을 참고 하시면 도움이 될 것 같습니다.
```json

```

```json
```

```javascript
```



2. https://joshua1988.github.io/vue-camp/testing/vue-test-util.html#%E1%84%8E%E1%85%AC%E1%84%89%E1%85%B5%E1%86%AB-vue-cli-3-x-%E1%84%87%E1%85%A5%E1%84%8C%E1%85%A5%E1%86%AB-%E1%84%8B%E1%85%B5%E1%84%89%E1%85%A1%E1%86%BC-%E1%84%8B%E1%85%A6%E1%84%89%E1%85%A5-%E1%84%89%E1%85%A5%E1%86%AF%E1%84%8E%E1%85%B5-%E1%84%87%E1%85%A1%E1%86%BC%E1%84%87%E1%85%A5%E1%86%B8
  - vue/test-util을 적용시켜준다.
  - vue2버전에서는 vue/test-util 1버전을 써야하는 것을 꼭 기억해야한다.



---
- [@vue/test-util 소개]([https://joshua1988.github.io/vue-camp/testing/jest-testing.html#jest-%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2](https://joshua1988.github.io/vue-camp/testing/vue-test-util.html#%E1%84%8E%E1%85%AC%E1%84%89%E1%85%B5%E1%86%AB-vue-cli-3-x-%E1%84%87%E1%85%A5%E1%84%8C%E1%85%A5%E1%86%AB-%E1%84%8B%E1%85%B5%E1%84%89%E1%85%A1%E1%86%BC-%E1%84%8B%E1%85%A6%E1%84%89%E1%85%A5-%E1%84%89%E1%85%A5%E1%86%AF%E1%84%8E%E1%85%B5-%E1%84%87%E1%85%A1%E1%86%BC%E1%84%87%E1%85%A5%E1%86%B8)){:target="_blank"}
- [Vue Test Utils] Vue 테스트 코드 작성 방법](https://pinokio0702.tistory.com/402){:target="_blank"}

{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
