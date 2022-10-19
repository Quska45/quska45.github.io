---
layout: post
title: "Vue에서 axios를 활용한 테스트 코드 작성하기"
subtitle: "VUE-CLI 테스트 코드 작성 환경 적용 #4"
comments: true
categories : VUE
date: 2022-10-19
background: '/img/posts/06.jpg'
---

# 소개
vue test utils를 활용한 테스트 코드를 작성할 때 우리를 멈칫 하게 하는 것 중에 하나는 axios를 활용한 코드 입니다.
저도 이걸 어떻게 처리해야 하나 나름대로 고민이 많았고 이를 해결한 경험을 공유 드리도록 하겠습니다.
목차는 다음과 같습니다.
```
```

## 1. 공식 axios 테스트 코드
vue test utils 개발팀이 제공하는 [http requests 테스트 코드](https://test-utils.vuejs.org/guide/advanced/http-requests.html)가 있습니다.
2022/10/19 일자로 제시되고 있는 코드를 그대로 가져와 실행해 보도록 하겠습니다.
```javascript
// PostList.vue
<template>
  <button @click="getPosts">Get posts</button>
  <ul>
    <li v-for="post in posts" :key="post.id" data-test="post">
      {{ post.title }}
    </li>
  </ul>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      posts: null
    }
  },
  methods: {
    async getPosts() {
      this.posts = await axios.get('/api/posts')
    }
  }
}
</script>


// PostList.test.js
import { mount, flushPromises } from '@vue/test-utils'
import axios from 'axios'
import PostList from './PostList.vue'

const mockPostList = [
  { id: 1, title: 'title1' },
  { id: 2, title: 'title2' }
]

// Following lines tell Jest to mock any call to `axios.get`
// and to return `mockPostList` instead
jest.spyOn(axios, 'get').mockResolvedValue(mockPostList)

test('loads posts on button click', async () => {
  const wrapper = mount(PostList)

  await wrapper.get('button').trigger('click')

  // Let's assert that we've called axios.get the right amount of times and
  // with the right parameters.
  expect(axios.get).toHaveBeenCalledTimes(1)
  expect(axios.get).toHaveBeenCalledWith('/api/posts')

  // Wait until the DOM updates.
  await flushPromises()

  // Finally, we make sure we've rendered the content from the API.
  const posts = wrapper.findAll('[data-test="post"]')

  expect(posts).toHaveLength(2)
  expect(posts[0].text()).toContain('title1')
  expect(posts[1].text()).toContain('title2')
})
```

위 코드를 실행하면 간단히 성공을 얻을 줄 알았는데 그렇지 않았습니다.
환경에 따라 성공하신 분도 있겠지만, 저는 그렇지 않았으니 먼저 에러를 파악하고 수정해 보겠습니다.

### 1-1. http request(axios) 공식 코드 에러 수정
일단 제가 해당 테스트 코드를 실행한 환경에 대한 간단한 정보를 제공하겠습니다.
- os : window10
- node : 12.16.3
- jest : 28.1.3
- @vue/test-utils : 1.2.2

다음으로 제 환경에서 발생한 에러를 공유드리겠습니다.
- flushPromises 함수 undefined
- posts[0].text() 함수 undefined

먼저 `flushPromises`에 대해 발생한 에러를 보겠습니다.
이 함수는 vue test utils에서만 사용되는 함수는 아닙니다.
비동기 처리를 위해 많이 사용되는 함수이며 npm에 제공이 되기도 하지만 간단히 만들어 사용할 수 있는 함수 입니다.
[이 글](https://imch.dev/posts/why-does-flush-promises-work-the-way-that-it-does/)을 참고 하시거나 검색을 통해 확인하시면 될 것 같습니다.



---
- [뷰 테스트 코드 시작하기](http)
{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
