# 24_2_Network_pratice_3Team

이 README.md는 여러분을 위한 나를 위한 사용 설명서입니다.

## 사용 설명서

우선, 파일 관리 방법

1. 우리 gir 브랜치 구조
main

└── develop

    ├── feature/초성1

    ├── feature/초성2

    └── feature/초성3

    └── feature/초성4

feature/초성 브랜치는 자신의 초성을 넣은 브랜치를 직접 만들어보기

2. 날짜별 작업 관리 흐름

예시-

작업하기 전:

새로 하는 경우: 1주차_0911_간단한내용

이어서 하는 경우: 전에 하던 내용 복사 후 붙여넣은 후, 날짜만 수정하여 작업

1주차 (2024-09-01 ~ 2024-09-07):

    커밋 메시지: feat: 1주차 로그인 기능 추가

    feature/김

    └── 1주차/로그인기능

2주차 (2024-09-08 ~ 2024-09-14):

    커밋 메시지: feat: 2주차 회원가입 기능 추가

    feature/김

    └── 1주차/로그인기능

    └── 2주차/회원가입기능

3주차 (2024-09-15 ~ 2024-09-21):

    커밋 메시지: feat: 3주차 프로필 페이지 구현

    feature/김

    └── 1주차/로그인기능

    └── 2주차/회원가입기능

    └── 3주차/프로필기능


주의해야할 점!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

절대! main(Master) 혹은 develop 브랜치에 push를 하지 맙시다.

---

1. 처음 초대를 받았을 때

자신이 이 폴더를 clone 할 저장소에 "24_2_Network_pratice_3Team"이라는

폴더를 생성 후  vsCode에서 폴더를 연다.

그 후 새 터미널 창을 켠다.

---

2. clone하기.

cd..를 입력하여 상위 폴더로 이동한다.

clone 명령어.

git clone https://github.com/seunghoo090004/24_2_Network_pratice_3Team.git

다음과 같이 입력하면 해당 사이트에 있는 파일들이 들어올 것이다.

---

3. 자신의 브랜치 생성

생성코드:

git branch feature/자신의 초성

브랜치가 제대로 생성이 됐는지 확인 코드:

  develop
  feature/kim
* main

---

현재 main에서 잡업 중이라 뜨니, 브랜치를 바꿔보자

브랜치 바꾸는 코드:

git checkout feature/kim

그렇게 치게 된다면 다음과 같이 

  develop
* feature/kim
  main

자 작업 환경이 자신의 브랜치로 옮겨졌다.

---

4. push하기

(push 하기 전 자신의 브랜치를 먼저 확인하는 습관을 들이자)

작업한 파일들을 git에 추가해야 한다. 먼저 변경된 파일들을 확인하자.

git status

변경된 파일이 있는지 확인한 후, add 명령어로 파일을 Staging 영역에 추가하자. 모든 파일을 추가하려면 아래 명령어를 사용해라:

git add .

또는 특정 파일만 추가하고 싶다면 해당 파일 경로를 지정하면 된다:

git add <파일명>

Staging된 파일을 커밋한다. 커밋 메시지는 작업 내용을 간단히 요약하는 것이 좋다.

git commit -m "feat: 회원가입 기능 구현"

feature/김 브랜치에 작업한 내용을 원격 저장소에 push하면 된다.

git push origin feature/kim

위의 코드를 입력하여 github 페이지에 branch가 생성된 것을 확인했다면,

추적 브랜치 설정:

git push --set-upstream origin feature/kim

위의 코드를 입력하면 앞으로 push를 할 때 git push를 하면 된다.


---

3. 특정 branch clone

다음으로는 작업을 자신의 개인 branch에다가 업로드 하여, 공유를 할텐데

branch 전체를 clone 하지 않고 특정 브랜치 하나만 clone 하는 것이 가능하다.

git clone -b {branch_name} --single-branch {저장소 URL}

이렇게 하면 자신이 원하고자 하는 branch를 자네가 작업하고자 하는 공간에 clone이 될 것이다.

---

4. 브랜치 병합 하기

이건 내가 주로 할텐데, develop으로 나중에 우리의 파일을 병합하려고 한다.

develop 브랜치로 이동:

git checkout develop

병합:

git merge feature/kim

병합 후 develop 브랜치를 원격 저장소에 push:

git push origin develop