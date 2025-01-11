# Outline

---

<aside>
🧐

**STUDYMATE ?**

고등학생들을 위한 인터넷강의, 일정관리, 감정관리 등의 서비스를 제공하는 **올인원 교육 플랫폼**.

</aside>

# Service

---

# Page 구성 및 기능

<aside>

## 로그인/ 로그아웃

사용자 인증 기능 제공

</aside>

<aside>

## Home

home page에서는 사이트에 등록된 모든 강좌, 선생님을 확인할 수 있는 수강 신청 서비스를 제공

모의고사 일정 및 등급컷 제공

### 강좌

- 강의 신청/취소
- 강의 영상, 선생님 정보
- 강의 영상 페이지 연결


선택 강좌 정보 및 강의 페이지 연결

강의 목록

강의 영상 시청 및 댓글창

- 강의 **댓글** 입력 기능
    - **✅ 감정 분석 API**
        
        → 선생님은 학생들의 피드백을 바로 받을 수 있음
        
        → 학생들은 댓글로 소통하면서 공감과 위로의 메세지를 얻을 수 있음 
        
        → 혼자 공부하는 기분이 들지 않고 함께 공부하는 느낌
        
        댓글창 감정분석
        

### 선생님

- 선생님 이름/ 과목
- 강좌 목록
    
    → 강의 클릭시 강의 페이지로 이동


### 모의고사 일정 및 등급컷

- 날짜순으로 모의고사 일정 정리
    
    → 클릭시 모의고사 과목별 등급컷 표 페이지

</aside>

<aside>

## My page

my page에서는 하위 페이지의 정보를 정리하고 분석하여 한 화면에 나타냄

- 수강 중인 강의 리스트
- 강의 진행률
- 공부 시간 분석 ← 타임테이블 시간
- 피드백 ← 오늘의 감정일기를 분석하여 메세지 전달
    - 감정 분석 : 부정~긍정 ⇒ -1~1 수치로 나타냄
    - 오늘 쓴 감정 일기의 감정 수치 평균값
        
        → 긍정에 가까울수록 : 칭찬의 메세지
        
        → 부정에 가까울수록 : 응원, 위로의 메세지
        
- 타임테이블 ← 오늘의 타임테이블을 불러옴
  
---

강의, 일정 관리, 감정 관리, 노트 관리 서비스 제공

<aside>

## Lectures

- 수강 신청한 강의 영상 리스트

- 강의진행률 그래프
- 남은 강의 개수 알림

</aside>

<aside>

## Schedule

### **✅ 타임테이블 (Today’s Time Table, TTT)**

- 과목, 색 지정하여 공부 목록 생성
- 채우기/지우기 기능 - 클릭, 드래그 가능
- 수정/삭제 기능

### ✅ 감정일기

- 오늘의 감정 일기 작성
    - 감정 분석 **API**
        
        → 감정 분석 결과를 **이모티콘**으로 표시
        
    - 삭제 가능

</aside>

<aside>

## Notes

- PDF or image 파일 업로드
- 텍스트 변환 → 복사 가능
    - ✅ Google Vision API 사용
- ~~AI 노트 정리~~
</aside>

easter egg

</aside>

# DB

https://dbdiagram.io/d/madcampWeek2-6777725b5406798ef72a71f0

![madcampWeek2.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/4daec605-d03b-4140-abb9-1e2aec362958/madcampWeek2.png)

# Team

---

**김나혜**

- DGIST 컴퓨터공학 트랙 22
- https://github.com/nanahyeya
- knh8783@gmail.com
- knh2222@dgist.ac.kr

**이정규**

- 한양대학교 컴퓨터소프트웨어학부 21
- https://github.com/ljg02
- gyu021211@gmail.com

# Tech Stack

---

**Front-end** : React

**Back-end** : Node.js

**DB**: MySQL

**IDE** : VSCode

**배포**: GCP

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
