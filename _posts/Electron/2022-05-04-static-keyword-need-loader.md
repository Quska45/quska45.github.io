---
layout: post
title: "webpack을 통해 컴파일 중 static 키워드가 컴파일 되지 않는 현상"
subtitle: ""
comments: true
categories : Electron
date: 2022-05-03
background: '/img/posts/06.jpg'
---

## 에러 메시지
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this
file.

## 소개
Vue CLI Plugin Electron Builder을 사용해서 개발 하던 중 클래스에서 사용한 'static'키워드 때문에 webpack빌드가 안되서 위와 같은 에러 메시지와 함께 에러가 나는 경우가 있었습니다. 해당 오류를 해결하기 위해 1시간 이상 시간을 버렸습니다. 똑같은 오류를 가지신 분이 이 글을 보고 소중한 1시간을 지키셨으면 좋겠습니다.

## [오류 수정](https://stackoverflow.com/questions/60414763/ecmascript-class-properties-not-possible-in-vue-electron-application)
힘든 시간을 거치셨을 것 같아 일단은 오류 수정부터 도와 드리겠습니다. 프로젝트의 vue.config.js를 다음과 같이 변경해주세요. 그대로 복붙하는 것을 추천 드립니다. babel-loader install도 해주세요. @vue/cli-plugin-babel/preset도 없다면 install 해주세요.
```javascript
module.exports = {
  pluginOptions: {
    electronBuilder: {
      chainWebpackMainProcess: config => {
        config.module
          .rule("compile")
          .test(/\.js$/)
          .exclude.add(/(node_modules|dist_electron)/)
          .end()
          .use("babel")
          .loader("babel-loader")
          .options({
            presets: ["@vue/cli-plugin-babel/preset"]
          });
      }
    }
  }
};
```

## [Vue CLI Plugin Electron Builder](https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/configuration.html#webpack-configuration)



{% if page.comments %}
<div id="post-disqus" class="container">
{% include disqus.html %}
</div>
{% endif %}
