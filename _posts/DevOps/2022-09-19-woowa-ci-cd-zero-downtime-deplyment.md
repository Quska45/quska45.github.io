---
layout: post
title: "찬, 레넌의 CI/CD와 무중단 배포(10분 테코톡)"
subtitle: ""
comments: true
categories : DevOps
date: 2022-09-19
background: '/img/posts/06.jpg'
---

# 소개
우아한형제들의 유투브 채널인 `우아한Tech`에 올라온 CI/CD와 무중단 배포에 관한 영상을 바탕으로 글을 작성합니다.
15:43초의 영상입니다.
목차는 아래와 같습니다.
```
1. CI/CD
2. 무중단 배포
```

## 1. 용어 정리
1. 컴파일
  - 프로그래머가 작성한 소스코드를 기계어로 변환하는 과정입니다.

2. 빌드
  - 소스 코드 파일을 컴퓨터에서 실행할 수 있는 소프트웨어 산출물로 만드는 과정입니다.
  - 보통 컴파일의 과정을 포함합니다.

3. 배포
  - 빌드의 결과물을 사용자가 접근할 수 있는 환경에 배치하는 것입니다.

## 2, CI( Continuous Integration )
많이들 적용하고 계시는 TDD는 Kent Beck의 XP(Extreme Programming)이라는 개념의 실천방안 중 하나 입니다.
여기에는 Testing, Refactoring, Pair Programming 등 여러개념이 제시되는데 그 중에 하나가 CI 입니다.
CI는 혼자서 존재하는 개념이 아니라 프로그래밍을 잘하기 위한 여러가지 방법들 중 하나 입니다.
그럼 CI의 정의를 제시 드리겠습니다.
```
지속적 통합이라는 뜻으로 개발을 진행하면서도 품질을 관리할 수 있도록 
여러 명이 하나의 코드에 대해서 수정을 진행해도 지속적으로 통합하면서
관리할 수 있음을 의미 합니다.
```

### 2-1. CI의 필요성
만약 CI가 없다면 모든 개발자에게 소스를 통합 한다는 것은 끔찍한 일입니다.
여러명의 개발자가 개발한 소스가 문제없이 머지 될 수 있도록 일일이 코드를 복사 붙여넣기 해야 합니다.
이런 과정에서 문제가 생기지 않으면 오히려 그게 이상한 일이겠죠.
하지만 CI의 과정이 있다면 이런 소요 없이 그때 그떄 소스를 병합하여 관리할 수 있습니다.

### 2-2. CI의 과정
1. 개발자의 소스병합 요청
2. CI tool의 처리
  - Jenkins와 같은 CI tool이 개발자의 요청을 받습니다.
  - Build 및 test를 진행합니다.
  - 이때 이상이 없다면 코드가 병합됩니다.
  - 하지만 문제가 발생하면 이를 개발자에게 피드백합니다.

### 2-3. 마틴 파울러가 제시하는 CI의 4가지 규칙
위처럼 CI tool을 통한 CI과정을 거친다고 해서 CI가 제대로 이뤄지고 있다고 할 수 없습니다.
CI가 제대로 이루어지기 위한 4가지 규칙을 알아보겠습니다.
1. 모든 소스코드가 살아 있고 누구든 현재의 소스에 접근할 수 있는 단일 지점을 유지해야 합니다.
2. 빌드 프로세스를 자동화해서 누구든 소스로부터 시스템을 빌드할 수 있게 해야 합니다.
3. 테스팅을 자동화해서 언제든지 시스템에 대한 건전한 테스트 수트를 실행할 수 있게 해야 합니다.
4. 누구든 현재 실행 파일을 얻으면 지금까지 가장 완전한 실행 파일을 언었다는 확신을 할 수 있어야 합니다.

## 3. CD( Continuous Deployment )
CI를 통해 통합 및 배포를 잘할 수 있는 환경을 구성했다고 믿게 될지도 모릅니다.
하지만 만약 통합 하고 배포해야하는 시스템이 30개 정도만 된다고 가정 해보겠습니다.
30번의 통합과 30번의 배포를 수동으로 해야합니다.
이런 일을 하고 싶어하는 개발자는 없겠죠.
그래서 나오게 된 개념이 CD 입니다.
```
지속적 배포라는 뜻으로 
빌드의 결과물을 프로덕션으로 릴리스하는 작업을 자동화하는 것을 의미 합니다.
```

## 4. Continuous Delivery( 지속석 제공 )
CI의 연장선에 있는 개념 입니다.
빌드의 결과물을 프로덕션으로 지속적으로 배포하는 것을 의미 합니다.
지속적 제공 및 다른 개념을 간단히 도식화 하면 다음과 같습니다.
```
Code => Build => Test => Staging => Deploy
<------------------->
지속적 통합

<------------------------------->
지속적 제공

<---------------------------------------->
지속적 배포
```

## 5. CI/CD의 흐름
1. 개발자의 소스 병합 요청
2. CI tool의 처리
  - Jenkins와 같은 CI tool이 개발자의 요청을 받습니다.
  - Build 및 test를 진행합니다.
  - 이때 이상이 없다면 코드가 병합됩니다.
  - 하지만 문제가 발생하면 이를 개발자에게 피드백합니다.
3. CD의 과정을 거쳐 배포되어야 하는 서버에 배포 됩니다.

## 6. 무중단 배포
배포가 이루어지는 동안 서비스를 사용할 수 없는 시간이 발생하게 되는데 이를 down time이라고 합니다.
이런 down time이 생기지 않도록 배포 하는 것을 `무중단 배포`라고 합니다.

### 6-1. 무중단 배포 구현 방법
1. AWS에서 Blue-Green 무중단 배포
2. 도커를 이용한 무중단 배포
3. L4, L7 스위치를 이용한 무중단 배포
4. Nginx를 이용한 무중단 배포 - 쉽고 저렴해 많이 사용된다고 합니다.

### 6-2. 무중단 배포 관련 용어
1. 리버스 프록시
  - 인터넷과 서버 사이에 위치한 중계 서버
  - 클라이언트가 요청한 내용을 캐싱
  - 서버 정보를 클라이언트로부터 숨길 수 있어 보안에 용이

2. 로드 밸런싱
  - 서버에 가해지는 부하를 분산해주는 역할
  - 하나의 서버가 멈추더라도 서비스 중단 없이 다른 서버가 서비스를 계속 유지할 수 있는 무중단 배포가 가능

## 7. 무중단 배포 방식
아래 3가지 방식이 있습니다.
- Rolling 배포
- Canary 배포
- Blue / Green 배포

### 7-1. Rolling 배포
서버를 차례대로 업데이트 시키는 방식입니다. 무중단 배포의 가장 기본적인 방식입니다.
로드밸런싱을 통해 구성된 3개의 서버가 있다고 가정 해보겠습니다.
하나의 서버를 멈추고 요청이 전달되지 않도록 라우팅을 멈추고 배포를 진행하는 방식입니다.
3개 서버에 대해 동일한 작업을 수행합니다.
- 장점 : 인스턴스를 추가히지 않아도 돼서 관리가 간편합니다.
- 단점 : 사용중인 인스턴스에 트래픽이 몰릴 수 있고, 구버저과 신버전이 공존되어 호환성 문제가 있을 수 있습니다.

### 7-2. Canary 배포
옛날 광부들이 유독 가스에 민감한 카나리아 새를 이용해 위험을 감지했던 것에서 유래 했습니다.
신버전을 소수의 사용자들에게만 배포합니다.
문제가 없는 것이 확인되면 점진적으로 다른 서버에 신버전을 배포합니다.
처음은 롤링 배포와 마찬가지로 한개의 서버에만 배포를 진행합니다.
적당한 양의 트래픽이 배포된 서버로 갈 수 있도록 합니다.
어느정도 운영을 통해 안정성이 확인되면 나머지 서버에도 배포를 진행합니다.
- 장점 : 문제 상황을 빠르게 감지하고 테스트가 용이합니다.
- 단점 : 모니터링에 비용을 들여야하고 구버전과 신버전이 공존외어 호환성 문제가 있을 수 있습니다.

### 7-3. Blue / Green 배포
Blue를 구버전, Green을 신버전으로 지징합니다.
구버전과 동일하게 신버전의 인스턴스를 구성합니다.
신버전 배포 시 로드 밸런서를 통해 신버전으로만 트래픽이 라우팅 될 수 있도록 합니다.
배포가 이루어 질 때마다 구버전과 신버전을 가진 서버가 바뀌게 됩니다.
- 장점 : 배포하는 속도와 롤백이 용이합니다.
- 단점 : 시스템 자원이 2배로 필요합니다.

---
## 참고
- [찬, 레넌의 CI/CD와 무중단 배포](https://m.youtube.com/watch?v=sIPU_VkrguI){: target="_blank"}


{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}