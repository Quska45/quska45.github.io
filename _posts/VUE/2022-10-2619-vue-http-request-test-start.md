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





---
- [뷰 테스트 코드 시작하기](http)
{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
