# Outline

---

<aside>
🧐

**STUDYMATE ?**

고등학생들을 위한 인터넷강의, 일정관리, 감정관리 등의 서비스를 제공하는 **올인원 교육 플랫폼**.

</aside>

![스크린샷 2025-01-08 오후 6.23.01.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/5b4cf5b5-7b35-4210-8068-4c316fdd6c57/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2025-01-08_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_6.23.01.png)

# Service

---

# Page 구성 및 기능

<aside>
<img src="/icons/sign-in_gray.svg" alt="/icons/sign-in_gray.svg" width="40px" />

## 로그인/ 로그아웃

사용자 인증 기능 제공

</aside>

<aside>
<img src="/icons/home_blue.svg" alt="/icons/home_blue.svg" width="40px" />

## Home

home page에서는 사이트에 등록된 모든 강좌, 선생님을 확인할 수 있는 수강 신청 서비스를 제공

모의고사 일정 및 등급컷 제공

### 강좌

- 강의 신청/취소
- 강의 영상, 선생님 정보
- 강의 영상 페이지 연결

![선택 강좌 정보 및 강의 페이지 연결](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/522437cc-ba83-4d36-b751-5b2bce6adf98/image.png)

선택 강좌 정보 및 강의 페이지 연결

![강의 목록](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/3e6ef202-59c8-40da-ba74-c2a82d71b900/image.png)

강의 목록

![강의 영상 시청 및 댓글창](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/a4669aa1-35ad-4342-8400-317ac5ffdf69/image.png)

강의 영상 시청 및 댓글창

- 강의 **댓글** 입력 기능
    - **✅ 감정 분석 API**
        
        → 선생님은 학생들의 피드백을 바로 받을 수 있음
        
        → 학생들은 댓글로 소통하면서 공감과 위로의 메세지를 얻을 수 있음 
        
        → 혼자 공부하는 기분이 들지 않고 함께 공부하는 느낌
        
        ![댓글창 감정분석](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/53040421-242a-4674-8cc0-9e0e61725842/4830e0d1-0919-4b3a-9f6f-28b43d3c68bd.png)
        
        댓글창 감정분석
        

### 선생님

- 선생님 이름/ 과목
- 강좌 목록
    
    → 강의 클릭시 강의 페이지로 이동
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/d5219ffc-6883-4b2a-95ef-f67207fb0250/image.png)
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/31028eac-01ad-493f-a091-5ea01fb15fd7/image.png)
    

### 모의고사 일정 및 등급컷

- 날짜순으로 모의고사 일정 정리
    
    → 클릭시 모의고사 과목별 등급컷 표 페이지
    

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/df8645c9-a867-4f1c-97dc-dbb34fcb89fd/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/f5aad950-bbaa-4477-b299-ccc142a39a7f/2a818472-d046-40a0-819b-6eb47d7324d4.png)

</aside>

<aside>
<img src="/icons/document_blue.svg" alt="/icons/document_blue.svg" width="40px" />

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

![스크린샷 2025-01-08 오후 7.40.47.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/4d518845-f1a0-4a0c-8b9e-911e6dda2a27/5e8fab02-988b-4ea1-b79a-c813a2cf0565.png)

---

강의, 일정 관리, 감정 관리, 노트 관리 서비스 제공

<aside>
<img src="/icons/headphones_blue.svg" alt="/icons/headphones_blue.svg" width="40px" />

## Lectures

- 수강 신청한 강의 영상 리스트

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/7fdf7953-ae8d-40d4-a51e-eb5b0f76e278/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/7893023d-82c6-4173-b420-6b8ea0afb51b/image.png)

- 강의진행률 그래프
- 남은 강의 개수 알림

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/19e1450d-2f91-464c-91e2-039e24268a59/image.png)

</aside>

<aside>
<img src="/icons/calendar-month_blue.svg" alt="/icons/calendar-month_blue.svg" width="40px" />

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

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/ae9a1f99-120c-4301-afd9-7b1de23b8868/image.png)

</aside>

<aside>
<img src="/icons/book-closed_blue.svg" alt="/icons/book-closed_blue.svg" width="40px" />

## Notes

- PDF or image 파일 업로드
- 텍스트 변환 → 복사 가능
    - ✅ Google Vision API 사용
- ~~AI 노트 정리~~
</aside>

![easter egg](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/53537654-e0b0-45b0-a911-5c410b3dadf5/image.png)

easter egg

</aside>

# 시연 영상

### 로그인

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
