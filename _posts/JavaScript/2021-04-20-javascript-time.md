---
layout: post
title: "자바스크립트 Date 클래스 관련 내용"
subtitle: ""
comments: true
categories : JavaScript
date: 2021-04-20
background: '/img/posts/06.jpg'
---

```
// 계산할 두 시각을 정한다.
var test1 = new Date("2019-09-03 12:00:00")
var test2 = new Date("2019-09-03 14:23:32")

// 빼기 하면 밀리세컨드가 나온다.
var test3 = test2-test1; // 8612000

// 시분초 구하기
var 시 = Math.floor((간격 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
var 분 = Math.floor((간격 % (1000 * 60 * 60)) / (1000 * 60));
var 초 = Math.floor((간격 % (1000 * 60)) / 1000);
```
