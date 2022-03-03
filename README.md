주소 : https://quska45.github.io/

로컬 실행 : bundle exec jekyll serve

개발 환경 구성
 1. jekyll 공홈의 설정 가이드에 따라 구성 할 것.
 2. 루비 버전에 따라 현재 프로젝트의 Gempfile.lock에 의해 정상적인 실행이 불가 할 수 있음
  - Gemfile.lock을 삭제 후 진행
 3. 오류 발생 시 터미널을 통해 나오는 메시지에 따라 필요한 것들 설치 및 설정 해줘야함.

새로운 메뉴 추가
 1. _includes -> navbar.html에 새로운 메뉴명으로 li 추가
 2. posts에 새폴더 복붙하여 추가
 3. index.html title 변경
 4. posts 새폴더 출가
 5. 추가한 글에서 categories 변경

글 작성
 1. 제목에 날짜가 들어간다.
 2. 제목에 _는 사용하면 안되고 띄어쓰기나 -을 이용한다.

css 커스텀
 1. assets/vendor/startbootstrap-clean-blog/scss/_bootstrap-overrides.scss 경로로 이동
 2. 원하는 css추가

code hightlight 템플릿 변경
[참고](https://hard-carry.com/how-to-change-syntax-highlighter-in-jekyll/)
 1. _config.xml에 세팅은 해뒀음
 2. [테마 확인](https://spsarolkar.github.io/rouge-theme-preview/)에서 원하는 테마 선택
 3. `rougify style 테마명 > assets/vendor/codeHighlight/테마명.css`를 터미널에 입력
 4. _bootstrap-overrides.scss 파일에서 .highlight 쪽 css 교체

 codepen 포스트에 추가 하기
 [참고](https://0xd00d00.github.io/2021/07/06/embedCodepen.html)
 1. _include > codepen.html 추가 해놨음
 2. _config.yml에 내 codepen 아이디 추가 해놨음
 3. 이제 codepen에서 내가 원하는 프로그램 작성 후에 save 해주고 url에서 맨 마지막에 있는 hash값을 복사함
 4. `{% include codepen.html hash="bGYxXLd" title="hello" %}` 이걸 복사해서 포스트의 원하는 위치에 붙여넣고 hash에 값을 아까 save 후 복사한 값으로 넣어주면 완성
 5. 참고로 내 코드펜 아이디는 깃허브로 로그인 하면 됨(quska45)

마크다운에 이미지 삽입
```
    ![화면표시 텍스트](이미지 주소){: width="500" height="500"
```