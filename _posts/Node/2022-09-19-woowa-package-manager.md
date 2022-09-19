---
layout: post
title: "비녀의 Package Manager(10분 테코톡)"
subtitle: ""
comments: true
categories : Node
date: 2022-09-19
background: '/img/posts/06.jpg'
---

# 소개
우아한형제들의 유투브 채널인 `우아한Tech`에 올라온 Package Manager에 관한 영상을 바탕으로 글을 작성합니다.
15:42초의 영상입니다.
목차는 아래와 같습니다.
```
1. JS의 모듈 import
1. Package Manager란?
2. Npm & Yarn
3. Pnpm & Yarn berry
4. 실제 사례
5. 결론
```

## 1. JS의 모듈 import
자바스크립트에서 `import`키워드는 지원된지 얼마 되지 않았습니다.
`모듈`이라는 개념은 `import` 이전에 존재하긴 했지만, 마찬가지로 얼마 되지 않았습니다.
이런 개념과 키워드는 자바스크립트의 역할이 커짐에 따라 필요해졌습니다.
이제는 수많은 모듈들이 생겨났고, 이것들을 효과적으로 다룰 필요가 생겼습니다.

## 2. Package 란?
위에서 본 모듈을 뭉쳐놓은 덩어리 하나를 말합니다.
Node.js에서는 require를 통해 가져올 수 있는 모듈로 정의하고 있습니다.
또는 package.json 파일을 가지고 있는 모듈 혹은 모듈의 뭉치를 package로 정의하기도 합니다.

## 3. NPM의 등장( Node Package Manager )
package들이 등장 하면서 이를 효과적으로 관리할 수 있는 도구가 필요해졌습니다.
그래서 나온 것이 npm입니다.
npm은 다음과 같은 목적을 가지고 만들어졌습니다.
1. 여러 버전의 통일한 패키지를 한 프로젝트에서 사용할 수 있게 합니다.
2. 설치 방식을 통일합니다.
3. 패키지 관련 정보가 들어 있는 메타 데이터를 간소화 합니다.
4. 누구나 배포할 수 있도록 합니다.

## 4. Yarn의 등장( yet another resource negotiator )
기본적으로 동일한 목적을 가지지만, npm에서 개선된 성능을 제공하고자 등장했습니다.
1. 병렬화를 통한 속도 개선
2. 자동화 된 lock 생성
  - 현재는 npm도 lock 파일을 제공하지만 원래는 제공하지 않았습니다.
3. 의존성 트리 알고리즘 변경
4. 캐시 사용







---
## 참고
- [](){: target="_blank"}


{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
