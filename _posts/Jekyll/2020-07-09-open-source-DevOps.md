---
layout: post
title: "[번역, 요약]open source 사용 DevOps 구축서"
subtitle: ""
comments: true
categories : Jekyll
date: 2020-12-22
---

### Intro
|Company|Deployment Frequency|
|------|---|
|Amazon|23000 per day|
|google|5500 per day|
|netflix|500 per day|
|facebook|1 per day|
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
  

참고 : https://medium.com/@bryantjiminson/devops-has-become-the-default-answer-to-fixing-software-development-processes-that-are-slow-70ea6df015fc
     : https://brunch.co.kr/@jowlee/120
