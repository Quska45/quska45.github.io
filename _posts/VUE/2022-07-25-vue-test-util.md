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

## [@vue/test-util](https://v1.test-utils.vuejs.org/){:target="_blank"}

vue core팀 멤버거 제작한 테스팅 보조 라이브러리 입니다. Jest 뿐만 아니라 다른 테스트 도구도 사용할 수 있습니다.
즉 Jest와는 별개로 Vue의 테스트를 위해 만들어진 도구 입니다.
따라서 테스트를 하기 위해 Jest도 설치하고 @vue/test-util도 설치해야 한다는 고정관념을 가지지 않도록 하셨으면 좋겠습니다.


## 설치


2. https://joshua1988.github.io/vue-camp/testing/vue-test-util.html#%E1%84%8E%E1%85%AC%E1%84%89%E1%85%B5%E1%86%AB-vue-cli-3-x-%E1%84%87%E1%85%A5%E1%84%8C%E1%85%A5%E1%86%AB-%E1%84%8B%E1%85%B5%E1%84%89%E1%85%A1%E1%86%BC-%E1%84%8B%E1%85%A6%E1%84%89%E1%85%A5-%E1%84%89%E1%85%A5%E1%86%AF%E1%84%8E%E1%85%B5-%E1%84%87%E1%85%A1%E1%86%BC%E1%84%87%E1%85%A5%E1%86%B8
  - vue/test-util을 적용시켜준다.
  - vue2버전에서는 vue/test-util 1버전을 써야하는 것을 꼭 기억해야한다.



---
- [@vue/test-util 소개]([https://joshua1988.github.io/vue-camp/testing/jest-testing.html#jest-%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2](https://joshua1988.github.io/vue-camp/testing/vue-test-util.html#%E1%84%8E%E1%85%AC%E1%84%89%E1%85%B5%E1%86%AB-vue-cli-3-x-%E1%84%87%E1%85%A5%E1%84%8C%E1%85%A5%E1%86%AB-%E1%84%8B%E1%85%B5%E1%84%89%E1%85%A1%E1%86%BC-%E1%84%8B%E1%85%A6%E1%84%89%E1%85%A5-%E1%84%89%E1%85%A5%E1%86%AF%E1%84%8E%E1%85%B5-%E1%84%87%E1%85%A1%E1%86%BC%E1%84%87%E1%85%A5%E1%86%B8)){:target="_blank"}


{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
