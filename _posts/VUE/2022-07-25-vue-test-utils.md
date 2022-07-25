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
추가적으로 vue2버전을 사용하신다면 @vue/test-utils는 1버전을 사용해야 한다는 것을 기억하세요.

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
// package.json
{
  // ...
  "babel": {
    "presets": ["@babel/preset-env"]
  }
}
```

```json
// babel.config.json
{
  "presets": ["@babel/preset-env"]
}
```

```javascript
// babel.config.js
module.exports = {
  presets: ["@babel/preset-env"] // 수동 설정
  presets: ["@vue/cli-plugin-babel/preset"] // vue cli로 설치한 경우 자동 설정됨
};
```

똑같은 결과를 만들지만 여러가지 방법이 있습니다.
가장 일관되고 관리가 쉬운 방법을 고민해보시고 적용하시면 좋을 것 같습니다.
개인적으로 저는 js 파일을 이용해 babel 설정을 package.json에서 분리함과 동시에 필요한 경우에 코드를 넣을 수도 있도록 하는 것을 선호합니다.
공감 하실지는 모르겠지만 주석을 사용할 수 있는 것도 포기 하기 어려운 장점 입니다.

## alias 사용
alias를 굳이 사용해야 하나? 라는 생각이 들 수도 있을 것 같습니다.
물론 사용하지 않으셔도 되지만 저는 사용하는 것을 추천 드리는 편입니다.
추가적으로 기존에 서비스되고 있는 시스템이라면 기존의 소스에 여러가지 alias가 쓰이고 있을 확률이 높습니다.
alias가 있는 것을 발견하고 경로 맵핑을 위해 다시 세팅을 하기위해 구글링을 하는 것보다는 미리 해놓고 사용만 할 수 있는 환경을 구성하는 것을 추천 드립니다.
```json
// package.json
{
  "jest": {
    "moduleNameMapper": {
      // 별칭 @(프로젝트/src) 사용하여 하위 경로의 파일을 맵핑합니다
      "^@/(.*)$": "<rootDir>/src/$1"
    }
  }
}
```

```javascript
// jest.config.js
module.exports = {
  moduleNameMapper: {
    // 별칭 @(프로젝트/src) 사용하여 하위 경로의 파일을 맵핑합니다
    '^@/(.*)$': '<rootDir>/src/$1'
  },
};
```
위 코드 처럼 `프로젝트 경로/src` 까지를 절대 경로로 잡아서 사용할 수도 있지만 원하는 대로 얼마든지 커스텀 하고 새로운 alias를 추가 할 수도 있습니다.
제 경우엔 기존에 프로젝트에서 사용되던 alias들이 있어 아래와 같은 식으로 여러가지 alias를 추가해서 사용합니다.
```javascript
// jest.config.js
module.exports = {
  moduleNameMapper: {
    // 별칭 @(프로젝트/src) 사용하여 하위 경로의 파일을 맵핑합니다
    '^@/(.*)$': '<rootDir>/src/$1',
    // 기존 코드에 ~common으로 설정되어 있는 alias 추가
    '^common/(.*)$': '<rootDir>/src/common/$1',
  },
};
```

## 코드 커버리지(Code Coverage)
테스트의 성공/실패에 대한 결과도 물론 중요하지만 그 과정을 아는 것도 큰 의미가 있을 수 있습니다.
코드를 개선하는 단서를 얻을 수 있으니까요.
jest는 이를 위해 Code Coverage에 대한 정보를 제공합니다.
아래와 같은 설정을 추가해 줍니다.
```json
// packages.json
{
  "jest": {
    "collectCoverage": true,
    "collectCoverageFrom": [
      "**/*.{js,vue}",
      "!**/node_modules/**"
    ]
  }
}
```

```javascript
// jest.config.js
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,vue}',
    '!**/node_modules/**'
  ]
};
```

테스트 실행 시 터미널에서 다음과 같은 결과를 얻을 수 있습니다.
```sh
 PASS  tests/unit/example.spec.js
  HelloWorld.vue
    √ renders props.msg when passed (14ms)

----------|----------|----------|----------|----------|-------------------|
File      |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
----------|----------|----------|----------|----------|-------------------|
All files |        0 |        0 |        0 |        0 |                   |
----------|----------|----------|----------|----------|-------------------|
Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.628s
Ran all test suites.
Done in 2.46s.
```
각 커버리지 항목의 설명
- Stmts: 최소 한 번 이상 실행된 명령문(변수에 값 저장, 함수 호출 등) 코드의 비율
- Branch: 최소 한 번 이상 if, switch와 같은 분기 조건이 충족된 비율
- Funcs: 최소 한 번 이상 호출된 함수의 비율
- Lines: 최소 한 번 이상 실행된 코드 라인의 비율
- Uncovered Line: 코드 커버리지에 측정되지 않은 코드 라인 수

## Jest 환경 설정
이제 까지 @vue/test-utils와 jest를 통해 기본적인 테스트 환경을 어떻게 구성할지 알아봤습니다.
아래 코드는 일반적으로 사용되는 세팅입니다.
```json
{
  // ...
  "jest": {
    // vue-cli 테스트 환경 설정을 사용합니다
    // 주의! preset 지정 후 아래와 같이 각각 다시 설정하는 경우, 새로 설정한 내용으로 적용됩니다
    "preset": "@vue/cli-plugin-unit-jest",
    "moduleFileExtensions": [
      "js",
      "json",
      // 모든 vue 파일(`*.vue`)을 처리하기 위해 Jest에게 알려줍니다
      "vue"
    ],
    "transform": {
      // `vue-jest`를 사용하여 모든 vue 파일(`*.vue`)을 처리합니다
      ".*\\.(vue)$": "vue-jest",
      // `babel-jest`를 사용하여 모든 js 파일(`*.js`)을 처리합니다
      ".*\\.(js)$": "babel-jest",
    },
    "moduleNameMapper": {
      // 별칭 @(프로젝트/src) 사용하여 하위 경로의 파일을 맵핑합니다
      "^@/(.*)$": "<rootDir>/src/$1"
    },
    "testMatch": [
      // __tests__ 경로 하위에 있는 모든 js/ts/jsx/tsx 파일을 테스트 대상으로 지정합니다
      "**/__tests__/**/*.[jt]s?(x)",
      // 파일 이름에 'xxx.spec' 또는 'xxx.test'라는 이름이 붙여인 모든 js/ts/jsx/tsx 파일을 테스트 대상으로 지정합니다
      "**/?(*.)+(spec|test).[jt]s?(x)"
    ],
    // node_modules 경로 하위에 있는 모든 테스트 파일을 대상에서 제외합니다
    "testPathIgnorePatterns": ["/node_modules/"],
    "collectCoverage": true,
    "collectCoverageFrom": [
      "**/*.{js,vue}",
      "!**/node_modules/**"
    ]
  }
}
```

```javascript
module.exports = {
  // (vue-cli로 설치 시 기본 세팅됨) vue-cli 테스트 환경 설정을 사용합니다
  // 주의! preset 지정 후 아래와 같이 각각 다시 설정하는 경우, 새로 설정한 내용으로 적용됩니다
  preset: "@vue/cli-plugin-unit-jest",
  moduleFileExtensions: [
    'js',
    'json',
    // 모든 vue 파일(`*.vue`)을 처리하기 위해 Jest에게 알려줍니다
    'vue',
  ],
  transform: {
    // `vue-jest`를 사용하여 모든 vue 파일(`*.vue`)을 처리합니다
    '.*\\.(vue)$': 'vue-jest',
    // `babel-jest`를 사용하여 모든 js 파일(`*.js`)을 처리합니다
    '.*\\.(js)$': 'babel-jest',
  },
  moduleNameMapper: {
    // 별칭 @(프로젝트/src) 사용하여 하위 경로의 파일을 맵핑합니다
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testMatch: [
    // __tests__ 경로 하위에 있는 모든 js/ts/jsx/tsx 파일을 테스트 대상으로 지정합니다
    '**/__tests__/**/*.[jt]s?(x)',
    // 'xxx.spec' 또는 'xxx.test'라는 이름의 모든 js/ts/jsx/tsx 파일을 테스트 대상으로 지정합니다
    '**/?(*.)+(spec|test).[jt]s?(x)'
  ],
  // node_modules 경로 하위에 있는 모든 테스트 파일을 대상에서 제외합니다
  testPathIgnorePatterns: ['/node_modules/'],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,vue}',
    '!**/node_modules/**'
  ],
};
```
글 내용에서 따로 설명하진 않았지만 주석을 보시면 대부분 이해가 될만한 내용인 것 같습니다.
다만 `vue-jest`와 `babel-jest`는 한 번 쯤 눈여겨 보시면 좋을 것 같습니다.
위에서 2가지의 라이브러리를 추가로 설치한 것은 트랜스파일을 위해서 입니다. `.vue`확장자 파일은 js로 변환되어야 하고 `.js`는 es5로 변환되어야 합니다.

## 마무리
기본적인 세팅과 테스트를 진행해 봤습니다.
하지만 아직 프로젝트에 적용시켜 사용하기에는 해결해야 할 것 들이 남았습니다.
다음 글을 통해 실제로 제가 운영되어 있는 시스템에서 문제들을 해결하면서 테스트 코드를 적용 시켰던 내용들을 공유하겠습니다.

---
- [@vue/test-util 소개]([https://joshua1988.github.io/vue-camp/testing/jest-testing.html#jest-%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2](https://joshua1988.github.io/vue-camp/testing/vue-test-util.html#%E1%84%8E%E1%85%AC%E1%84%89%E1%85%B5%E1%86%AB-vue-cli-3-x-%E1%84%87%E1%85%A5%E1%84%8C%E1%85%A5%E1%86%AB-%E1%84%8B%E1%85%B5%E1%84%89%E1%85%A1%E1%86%BC-%E1%84%8B%E1%85%A6%E1%84%89%E1%85%A5-%E1%84%89%E1%85%A5%E1%86%AF%E1%84%8E%E1%85%B5-%E1%84%87%E1%85%A1%E1%86%BC%E1%84%87%E1%85%A5%E1%86%B8)){:target="_blank"}
- [Vue Test Utils] Vue 테스트 코드 작성 방법](https://pinokio0702.tistory.com/402){:target="_blank"}

{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
