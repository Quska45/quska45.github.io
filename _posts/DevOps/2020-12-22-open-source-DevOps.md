---
layout: post
title: "[번역, 요약]open source 사용 DevOps 구축서"
subtitle: ""
comments: true
categories : DevOps
date: 2020-12-22
background: '/img/posts/06.jpg'
---

### Intro

|Company           |Deployment Frequency|
|------            |---|
|Amazon            |23000 per day|
|google            |5500 per day|
|netflix           |500 per day|
|facebook          |1 per day|
|typical enterprise|1 every 9 months|

아마존과 같은 기업은 완벽한 devops 파이프라인을 만드는 방법을 알아냈기 때문에 저런 것이 가능하다.


### DevOps 및 CI / CD 파이프 라인에 대한 간략한 소개
 - 소프트웨어 개발 관행 또는 SDLC(Software Development Lifecycle)이며 개발자와 비 개발자는 모두 자동화된 환경을 가진다.
 - 핵심은 지속적인 통합 및 지속적인 배포(CI-continuous interfration/CD-continuous delivery(deployment))이다. 이 파이프라인은 환경이 서로 다른 단계(예: DEV,INT,TST,QA 등)를 가지고 있고 자동화로 인해 개발자는 고품질 코드, 많은 배포등의 이점이 있습니다.
 - 아래와 같은 환경을 구축하는 5단계를 제시해보겠다.
 <img src="https://t1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/3hD/image/hnJ-TFUztMymzpoEkjR7Z6Df4zY.jpg"  width="700" height="370">


## 1단계 : CI / CD 프레임 워크
 - 가장 먼저 필요한 것이 ci/cd도구 이다.
 - jenkins는 devops를 대중화하고 사실상 표준이 된 기술이다.
 - ci/cd 도구를 사용한 devOps는 다음과 같은 상태이다. 사실상 할 수 있는 것은 없는 상태이다.
 <img src="https://t1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/3hD/image/EkwugWHMm_t_-KlLPlD1ObZ_EP0.jpg"  width="700" height="370">


## 2단계 : 소스 제어 관리
 - git과 같은 SCM을 사용한다.
 - SCM 까지 사용한 devops는 다음과 같다.
 <img src="https://t1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/3hD/image/abymQfCAH5KMl-yf0Nr5Q-AaEtw.jpg"  width="700" height="370">
 
 
## 3단계 : 자동화 도구 구축
 - Javascript 같은 언어는 컴파일이 필요 없기는 하다.
 - 빌드 자동화 도구를 통해 CI/CD 도구가 빌드할 수 있도록 하라.
 <img src="https://t1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/3hD/image/-e8czOMxjNaig3SThMi-yw_SHTw.jpg"  width="700" height="370">


## 4단계 : 웹 애플리케이션 서버
 - 모든 응용 프로그램이 실제로 유용하려면 어떤 종류의 서비스 또는 인터페이스를 제공해야만 하고 이것을 위해서는 선박이 필요하다.
 - 웹 응용 프로그램의 경우 이 선박은 서버이다.
 - 서버는 배치 가능한 패키지 내부의 프로그래밍 로직을 감지하고 인터페이스를 렌더링 하며 외부 세계에 소켓을 열어 웹서비스를 제공할 수 있는 환경을 제공한다.
 - tomcat, nodejs 등 많은 응용 프로그램 서버가 있다.
 <img src="https://t1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/3hD/image/bbzkc3OGbZpGfV3SeM3ivVy5SPs.jpg"  width="700" height="370">


## 5단계 : 코드 테스트 범위
 - 코드 테스트 및 품질 개선을 위한 많은 도구가 있고 CI/CD 도구와 연결을 통해 프로세스를 자동화 할 수 있다.


## 선택적 단계
 - 컨테이너를 사용하는 것이다.
 - docker와 쿠버네티스가 가장 많이 사용된다.
 - VM은 응용 프로그램 크기보다 이상의 풋프린트가 필요한데 컨테이너는 응용 프로그램을 실행하기 위한 몇 개의 라이브러리 구성만 있으면 된다.
 - 컨테이너는 응용 프로그램을 호스팅하기 위한 간단한 솔루션이라고 보면 되겠다.

## 미들웨어 자동화도구
 - devops 파이르라인은 응용 프로그램 구축 / 배포에 중점이 갔지만 다른 것도 할 수 있다.
 - IAC(Infrastructure as Code)도구(미들웨어 자동화 도구)가 그 중 하나 이다.

###### 참고 : https://medium.com/@bryantjiminson/devops-has-become-the-default-answer-to-fixing-software-development-processes-that-are-slow-70ea6df015fc
######      : https://brunch.co.kr/@jowlee/120
###### 젠킨스 시작해보기 : https://kutar37.tistory.com/entry/Jenkins-%EC%B6%94%EA%B0%80%EC%84%A4%EC%A0%95-Maven-JDK-Git-Plugin-2
