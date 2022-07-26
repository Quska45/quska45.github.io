---
layout: post
title: "뷰 테스트 코드 시작하기"
subtitle: "VUE-CLI 테스트 코드 작성 환경 적용 #3"
comments: true
categories : VUE
date: 2022-07-26
background: '/img/posts/06.jpg'
---

## 소개
이 글은 제가 회사 프로젝트에 테스트 코드를 작성하기 위한 환경세팅과 관련된 내용을 공유하기 위해 작성합니다.
테스트 코드를 도입하려는 분들에게 도움이 됐으면 좋겠습니다.
테스트 코드를 적용할 때 단순히 윗사람이 시켜서, 요즘 많이들 하니 나도 해볼까? 라는 생각으로 테스트 코드를 소스에 적용하는 것은 매우 안타까운 일입니다.
테스트 코드가 주는 이점이 무엇인지 스스로 생각해보고 테스트 코드를 사용하는 이유를 공감하는 것이 훨씬 더 중요한 일입니다.
이 글을 보시는 분들이 단순히 환경세팅과 관련된 내용을 얻어 가시는 것도 좋겠지만 
테스트 코드를 왜 사용해야 하고 TDD 기반의 개발이 왜 사용되는지 스스로 깊게 고민하는 계기가 됐으면 좋겠습니다.
참고로 해당 글은 [캡틴판교](https://joshua1988.github.io/vue-camp/testing/getting-started.html#%E1%84%87%E1%85%B2-
%E1%84%8F%E1%85%A5%E1%86%B7%E1%84%91%E1%85%A9%E1%84%82%E1%85%A5%E1%86%AB%E1%84%90%E1%85%B3-
%E1%84%90%E1%85%A6%E1%84%89%E1%85%B3%E1%84%90%E1%85%B3-%E1%84%8F%E1%85%A9%E1%84%83%E1%85%B3-
%E1%84%8B%E1%85%A8%E1%84%89%E1%85%B5){: target="_blank"}님의 글을 기반으로 작성합니다.

## 뷰 컴포넌트 테스트 코드 예시
```javascript
<!-- HelloWorld.vue -->
<template>
  <div>Hello {{ message }}</div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Vue!'
    }
  }
}
</script>
```

```javascript
// helloworld.test.js
import Vue from 'vue';
import HelloWorld from './HelloWorld.vue';

test('HelloWorld Component', () => {
  const cmp = new Vue(HelloWorld).$mount();
  expect(cmp.message).toBe('Vue!');
});
```
위의 코드는 컴포넌트를 가지고 실제 Vue 인스턴스를 만들어 message의 값을 확인했습니다.
테스트는 정상적으로 통과 했지만 이것은 @vue/test-utils를 사용한 방식이라고 보기 어렵습니다.

## @vue/test-utils를 이용한 컴포넌트 테스트
이번엔 @vue/test-utils를 이용해서 테스트 코드를 작성해 보겠습니다.
```javascript
// helloworld.test.js
import { shallowMount } from '@vue/test-utils';
import HelloWorld from './HelloWorld.vue';

test('HelloWorld Component', () => {
  const wrapper = shallowMount(HelloWorld);
  expect(wrapper.vm.message).toBe('Vue!');
});
```
위의 코드를 실행하면 `window is undefined~`와 같은 에러가 발생하시는 분도 있을 것 같습니다. 해당 에러에 대해서는 아래에서 설명드리겠습니다. 일단은 성공했다고 가정하겠습니다.
shallowMount라는 메서드를 통해 테스트가 정상 종료된 것을 확인 할 수 있습니다.
실제 vue 인스턴스를 생성해 마운트 하는 것과 shallowMount()를 사용하는 것은 차이가 있지만 지금은 크게 고민하지 않으셔도 될 것 같습니다.
shoallowMount()에 대해 간단히 설명 드리면 지정된 컴포넌트의 내용만을 테스트하는 용도입니다. 하지만 이것도 지금은 크게 중요하지 않습니다.
일단은 @vue/test-utils를 이용해 테스트 코드를 완성했고 실제로 정상작동한 것을 확인한 것만으로 충분합니다.

## @vue/test-utils 에러
```sh
[vue-test-utils] window is undefined vue-test-utils needs to be run in a browser environment ~
```
위와 같은 에러가 발생하신 분이 분명 있을 것 같습니다.
위 에러는 jest가 실행되는 환경이 node 환경이기 때문입니다.
@vue/test-utils는 브라우저 환경에서만 실행되도록 만들어져 있는 도구라고 생각됩니다.
해당 내용은 [이 글](https://jestjs.io/docs/configuration#testenvironment-string){:target="_blank"}을 참고하시기 바랍니다.


---
- [뷰 테스트 코드 시작하기](https://joshua1988.github.io/vue-camp/testing/getting-started.html#%E1%84%87%E1%85%B2-%E1%84%8F%E1%85%A5%E1%86%B7%E1%84%91%E1%85%A9%E1%84%82%E1%85%A5%E1%86%AB%E1%84%90%E1%85%B3-%E1%84%90%E1%85%A6%E1%84%89%E1%85%B3%E1%84%90%E1%85%B3-%E1%84%8F%E1%85%A9%E1%84%83%E1%85%B3-%E1%84%8B%E1%85%A8%E1%84%89%E1%85%B5){:target="_blank"}
- [vue 테스트 코드 작성 방법](https://pinokio0702.tistory.com/407){:target="_blank"}
- [Jest와 Vue Test Utils(VTU)로 Vue 컴포넌트 단위(Unit) 테스트](https://heropy.blog/2020/05/20/vue-test-with-jest/){:target="_blank"}

{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
