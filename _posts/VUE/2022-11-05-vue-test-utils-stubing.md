---
layout: post
title: "vue test util stubs 사용하기"
subtitle: "Nuxt에서 NuxtLink를 stubing 시킨 load 테스트 작성"
comments: true
categories : VUE
date: 2022-11-05
background: '/img/posts/06.jpg'
---

# 소개
테스트 코드를 작성할 때 가장 먼저 작성하게 되는 것은 아마도 컴포넌트의 load가 정상적으로 되는지 일 것 같습니다.
하지만 생명주기 함수 내에 비동기 함수를 사용한다거나, 자식컴포넌트를 로드하는 등의 많은 변수를 가지고 있는 컴포넌트라면 테스트는 쉽지 않을 수 있습니다.
때로는 이런 변수들을 무시하고 싶을 수 있죠.
vue test util은 이를 위해 제공하는 옵션 중 하나가 `stubs` 입니다.
컴포넌트의 load 여부를 판단할 수 있는 아주 아주 편리하고 강력한 옵션인 만큼 알아두면 아주 유용할 것 같습니다.
우선 stubs에 대해서 알아보고 Nuxt에서 NuxtLink를 무시하는 테스트 코드에 대해서 알아보겠습니다.
다만, 뭔가를 무시한다는 것은 전체적인 관점에서 잘못된 테스트를 하게 될 가능성도 있습니다.
적재적소에 잘 사용해야 한다는 점을 잊지 마세요.

## stubs?
```
Vue Test Utils provides some advanced features for stubbing components and directives.
A stub is where you replace an existing implementation of a custom component or 
directive with a dummy one that doesn't do anything at all, 
which can simplify an otherwise complex test. 
```

vue test util 공식 문서에 설명된 내용입니다.
간단히 말씀드리면 특정 컴포넌트를 아무것도 하지 않는 더미로 바꿔준다고 합니다.
예를 들면 다음과 같은 코드에서 ParentComp 안에 있는 ChildComp를 더미로 바꿔준다는 의미입니다.

```javascript
<ParentComp>
  <ChildComp />
</ParentComp>
```

위와 같은 테스트 코드 작성이 가능한 것은 아주 강력하고 편리한 기능 입니다.
그럼 이제 예시 코드와 함께 더 자세히 알아보도록 하겠습니다.

## stubs 사용하기
```javascript
const FetchDataFromApi = {
  name: 'FetchDataFromApi',
  template: `
    <div>{{ result }}</div>
  `,
  async mounted() {
    const res = await axios.get('/api/info')
    this.result = res.data
  },
  data() {
    return {
      result: ''
    }
  }
}

const App = {
  components: {
    FetchDataFromApi
  },
  template: `
    <h1>Welcome to Vue.js 3</h1>
    <fetch-data-from-api />
  `
}
```

위와 같은 두개의 컴포넌트가 있다고 가정해보겠습니다.
`App`이라는 컴포넌트가 `FetchDataFromApi`를 사용하고 있네요.
`FetchDataFromApi`는 생명주기 메서드 안에 비동기 통신을 통해 데이터를 조회하도록 되어 있습니다.
하지만 제 관심은 `App`을 로드 하고 싶을 뿐입니다.
데이터가 조회되건 말건 신경쓰고 싶지 않을 뿐만 아니라 `App`은 데이터가 조회되는 것과는 전혀 상관 없습니다.
이럴 때 `stubs`를 이용한 테스트 코드를 작성하는 것은 매우 효과 적입니다.

```javascript
test('stubs component with custom template', () => {
  const wrapper = mount(App, {
    global: {
      stubs: {
        FetchDataFromApi: {
          template: '<span />'
        }
      }
    }
  })

  console.log(wrapper.html())
  // <h1>Welcome to Vue.js 3</h1><span></span>

  expect(wrapper.html()).toContain('Welcome to Vue.js 3')
})
```

`stubs`를 사용해 `FetchDataFromApi`를 <span>이라는 더미로 바꿔버렸습니다.
태그 자체가 바꼈을 뿐만 아니라 생명주기 함수도 실행되지 않았네요.
테스트 코드를 작성함에 있어 관심사만 테스트할 수 있도록 해주는 강력한 기능을 경험할 수 있습니다.
  
## NuxtLink with stubs
`stubs`에 대해 기본적인 것을 경험해 봤으니 Nuxt에서 stubs가 어떻게 활용되는지도 확인해 보겠습니다.
제가 테스트에 사용한 컴포넌트와 테스트 코드는 다음과 같습니다.
```javascript
<MenuDropDown>
  <MenuDropDownItem /> // MenuDropDonwItem 내부적으로 nuxt-link를 사용하고 있습니다.
</MenuDropDown>
```

```javascript
describe('MenuDropDown', () => {
  test('MenuDropDown mount with no stubing ', () => {
    const mockRoute = {
      path: '/contents/testuser2/test2'
    };

    const wrapper = mount(MenuDropDown, {
      mocks: {
        $route: mockRoute
      },
      propsData: {
        name: '변광진'
      }
    });

    expect(wrapper.vm).toBeTruthy()
  })
})
```

저는 위의 테스트가 반드시 성공할 것이라는 확신이 있었습니다.
제가 사용한 컴포넌트는 어떤 의존성도 가지고 있지 않았기 때문입니다.
하지만 [Vue warn]이 발생했고 <nuxt-link>를 찾을 수 없다는 로그가 표시되었습니다.
이유는 Nuxt 환경에서 nuxt-link는 import 없이도 사용할 수 있지만 테스트 코드에서는 알 수 없는 컴포넌트 이기 때문입니다.
역시 개발에 절대는 쉽지 않은 것 같습니다.
그럼 이제 위의 코드에 stubs를 추가해보겠습니다.
  
```javascript
describe('MenuDropDown', () => {
  test('MenuDropDown mount with no stubing ', () => {
    const mockRoute = {
      path: '/contents/testuser2/test2'
    };

    const wrapper = mount(MenuDropDown, {
      mocks: {
        $route: mockRoute
      },
      propsData: {
        name: '변광진'
      },
      stubs: {
        NuxtLink: true
      }
    });

    expect(wrapper.vm).toBeTruthy()
  })
});
```
  
처음 제시 드렸던 예시에서는 특정 태그로 컴포넌트를 대체 시켰지만 여기선 그런 것 조차 하지 않았습니다.
저는 제가 만든 컴포넌트가 정상적으로 로드 된다는 결과를 빨리 얻고 싶으니까요.
이제 테스트 코드 작성이 끝난 것 같지만 한 가지 아쉬운 점이 있습니다.
바로 `mount`를 사용해 테스트 코드를 작성했다는 점입니다.

## shallowMount의 자동 stubing
단위 테스트 시에 shallowMount를 사용하는 것이 권장됩니다.
mount를 사용해야하는 경우도 분명있겠지만 shallowMount만으로 충분한 경우가 많기 때문입니다.
이글에서 다루지는 않겠지만 mount와 shallowMount의 차이점은 한 번쯤 공부해보시 바랍니다.
제가 최초에 warn 메시지를 얻었던 테스트도 shallowMount를 사용했다면 테스트를 통과 할 수 있었습니다.
shallowMount는 자동으로 stubing을 해주기 때문입니다.
결과적으로 shallowMount를 사용하면 되는 문제 였지만 테스트에 대해서 조금 더 이해할 수 있는 기회였던 것 같습니다.

  


---
- [컴포넌트 스터빙(한글번역)](https://lmiller1990.github.io/vue-testing-handbook/ko/stubbing-components.html#%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EC%8A%A4%ED%84%B0%EB%B9%99){:target="_blank"}
- [Stubs and Shallow Mount](https://test-utils.vuejs.org/guide/advanced/stubs-shallow-mount.html){:target="_blank"}

{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
