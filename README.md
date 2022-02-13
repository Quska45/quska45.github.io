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
