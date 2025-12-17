# Outline

---

<aside>
🧐

**STUDYMATE ?**

고등학생들을 위한 인터넷강의, 일정관리, 감정관리 등의 서비스를 제공하는 **올인원 교육 플랫폼**.

</aside>

# DB

https://dbdiagram.io/d/madcampWeek2-6777725b5406798ef72a71f0
<img width="1302" height="686" alt="madcampWeek2" src="https://github.com/user-attachments/assets/1afa67a4-6b28-4544-88db-2a18106d7653" />


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

# Gif
-Login

![Image](https://github.com/user-attachments/assets/b1771968-147d-4f48-b9cf-e4f9a7e610ea)

-Main page / Course Enroll

![Image](https://github.com/user-attachments/assets/56d58cea-4f48-4696-b367-c78112671210)

-Course Drop

![Image](https://github.com/user-attachments/assets/3d295099-616b-47d7-bd4c-0e64b2bc22b1)

-Comment

![Image](https://github.com/user-attachments/assets/23b7b3f5-ced8-4261-ba96-a9e7a24c0d4c)

-Mypage
![Image](https://github.com/user-attachments/assets/7ff1d117-c464-4cb4-ace0-4d469b3d19cf)

-Schedule
![Image](https://github.com/user-attachments/assets/b9e60cbf-234c-43ff-8f8b-f71e3101589b)
![Image](https://github.com/user-attachments/assets/28a4c413-b992-4d19-855f-8f294b2d28db)

-Note
![Image](https://github.com/user-attachments/assets/5347b9ee-a955-4325-915b-551e6c77ab4a)

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
![Image](https://github.com/user-attachments/assets/ca709b63-48b9-4c6e-a79a-41805fa188e9)

강의 목록

![Image](https://github.com/user-attachments/assets/da01c4ab-e17c-4c1a-ba47-c7044bde88d9)

강의 영상 시청 및 댓글창
![Image](https://github.com/user-attachments/assets/0eca8d69-23da-4a51-8317-34f8a845372b)

- 강의 **댓글** 입력 기능
    - **✅ 감정 분석 API**
        
        → 선생님은 학생들의 피드백을 바로 받을 수 있음
        
        → 학생들은 댓글로 소통하면서 공감과 위로의 메세지를 얻을 수 있음 
        
        → 혼자 공부하는 기분이 들지 않고 함께 공부하는 느낌
        
        댓글창 감정분석
        ![Image](https://github.com/user-attachments/assets/b4c58b0a-4138-4f92-a19e-2c219883576e)
        

### 선생님

- 선생님 이름/ 과목
- 강좌 목록
    
    → 강의 클릭시 강의 페이지로 이동

![Image](https://github.com/user-attachments/assets/1377d3c8-0f33-4d48-91cc-bf3b5fa5582e)
![Image](https://github.com/user-attachments/assets/a2ffa7f8-260d-448d-a5e0-645f50ec0502)


### 모의고사 일정 및 등급컷

- 날짜순으로 모의고사 일정 정리
    
    → 클릭시 모의고사 과목별 등급컷 표 페이지

  ![Image](https://github.com/user-attachments/assets/e4b9c6e9-9f57-47ce-8a7c-8e156f6f6753)
  ![Image](https://github.com/user-attachments/assets/95b4e96e-50d1-4b96-a958-5c60e5822aeb)

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
![Image](https://github.com/user-attachments/assets/51d7f1c1-d83c-49d9-b351-83c5af660207)
  
---

강의, 일정 관리, 감정 관리, 노트 관리 서비스 제공

<aside>

## Lectures

- 수강 신청한 강의 영상 리스트
![Image](https://github.com/user-attachments/assets/63b337bd-7780-4b2c-982a-31a1de85c391)
![Image](https://github.com/user-attachments/assets/4af1e66b-d8f2-4f6f-9c6d-026b2483e155)

- 강의진행률 그래프
- 남은 강의 개수 알림
![Image](https://github.com/user-attachments/assets/8391b845-9c23-46f5-8bfc-54b1b67c4201)

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
  ![Image](https://github.com/user-attachments/assets/2d14cc48-35dd-4e10-9397-2aece02539ef)

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



