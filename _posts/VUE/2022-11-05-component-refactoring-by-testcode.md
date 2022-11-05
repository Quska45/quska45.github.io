---
layout: post
title: "테스트 코드로 리팩토링 하기"
subtitle: "테스트 코드 작성을 고려하지 않은 코드에 테스트 코드 적용하기"
comments: true
categories : VUE
date: 2022-11-05
background: '/img/posts/06.jpg'
---

# 소개
테스트 코드를 공부하면서 예전에 했던 사이드 프로젝트에 테스트 코드를 적용시키려고 했습니다.
당연히 제 코드는 테스트에 적합하지 않았습니다.
그렇게 테스트 코드를 작성하는데 또 하나 깨달은 것이 제 코드가 매우 지저분하다는 것이었습니다.
테스트가 가능한 코드가 클린한 코드라는 생각을 해본적은 없었는데 이 둘은 꽤나 관련 있게 느껴지네요.
테스트 코드를 적용했던 과정을 적어 보겠습니다.

## 기존 코드
모든 코드를 제시드릴 순 없으니 리팩토링이 가장 필요했던 메서드만 제시하겠습니다.
`MenuDropDown` 이라는 컴포넌트의 코드 일부분과 테스트  입니다.

```javascript
// MenuDropDown.js
methods: {
  ....,
  _initUserContents(){
    let paths = this.$route.path.split( '/' );
    let userContents = await this.getComponentNamesByUserName( users, this.name );
    this.userContents = userContents;

    let userName = decodeURIComponent( paths[ 2 ] );
    let userContentName = decodeURIComponent( paths[ 3 ] );
    userContentName = userContents.reduce(( acc, cur )=>{
      if( cur.componentName == userContentName ){
        acc = cur.name;
      };
      return acc
    }, '');

    if( this.name == userName ){
      this.activeUserContent = userContentName;
      this.addActiveClassToUserContentByName( userContentName );
      this.setActiveUserContent( userContentName );
      this.setActiveUserName( this.name );
    } else {
      this.activeUserContent = 'Select';
    };
    // this.setActiveUser( this.name );
}

// MenuDropDown.test.js
describe('MenuDropDown', () => {
  test('MenuDropDown load test', () => {
    const wrapper = mount(MenuDropDown);

    expect(wrapper.vm).toBeTruthy()
  });
});
```

위의 테스트는 당연히 실패 합니다.
하나 씩 해결하면서 리팩토링을 진행해 보겠습니다.

## paths 변수 개선하기(this.$route mocking 하기)







---

{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
