// Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import Carousel from '../../components/Carousel';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [textbooks, setTextbooks] = useState([]);
  const [mockExams, setMockExams] = useState([]);

  useEffect(() => {
    // 신청 가능한 강좌 목록 요청
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/courses`)
      .then(response => setCourses(response.data))
      .catch(error => {
        console.error('강좌 데이터 요청 실패:', error);
        // 예시 데이터 설정 (오류 시)
        const exampleCourses = [
          {
            id: 1,
            title: '프로그래밍 기초',
            description: '초보자를 위한 프로그래밍 기초 강좌입니다.',
            image: 'https://via.placeholder.com/220x130.png?text=프로그래밍+기초',
          },
          {
            id: 2,
            title: '데이터베이스',
            description: '데이터베이스 설계와 관리에 대해 배웁니다.',
            image: 'https://via.placeholder.com/220x130.png?text=데이터베이스',
          },
          {
            id: 3,
            title: '웹 개발',
            description: '모던 웹 개발 기술을 익힐 수 있는 강좌입니다.',
            image: 'https://via.placeholder.com/220x130.png?text=웹+개발',
          },
          {
            id: 4,
            title: '모바일 앱 개발',
            description: '안드로이드와 iOS 앱 개발을 배웁니다.',
            image: 'https://via.placeholder.com/220x130.png?text=모바일+앱+개발',
          },
          {
            id: 5,
            title: '데이터 사이언스',
            description: '데이터 분석과 머신러닝을 배우는 강좌입니다.',
            image: 'https://via.placeholder.com/220x130.png?text=데이터+사이언스',
          },
          {
            id: 6,
            title: '인공지능',
            description: '인공지능의 기초와 응용을 배우는 강좌입니다.',
            image: 'https://via.placeholder.com/220x130.png?text=인공지능',
          },
          {
            id: 7,
            title: '모바일 앱 개발',
            description: '안드로이드와 iOS 앱 개발을 배웁니다.',
            image: 'https://via.placeholder.com/220x130.png?text=모바일+앱+개발',
          },
          // 추가적인 강좌 데이터...
        ];
        setCourses(exampleCourses);
      });

    // 강사 목록 요청
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/instructors`)
      .then(response => setInstructors(response.data))
      .catch(error => {
        console.error('강사 데이터 요청 실패:', error);
        // 예시 데이터 설정 (오류 시)
        const exampleInstructors = [
          {
            id: 1,
            name: '김철수',
            subject: '수학',
            image: 'https://via.placeholder.com/220x130.png?text=김철수',
          },
          {
            id: 2,
            name: '이영희',
            subject: '영어',
            image: 'https://via.placeholder.com/220x130.png?text=이영희',
          },
          {
            id: 3,
            name: '박지훈',
            subject: '프로그래밍',
            image: 'https://via.placeholder.com/220x130.png?text=박지훈',
          },
          {
            id: 4,
            name: '최민지',
            subject: '웹 개발',
            image: 'https://via.placeholder.com/220x130.png?text=최민지',
          },
          // 추가적인 강사 데이터...
        ];
        setInstructors(exampleInstructors);
      });

    // 교재 목록 요청
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/textbooks`)
      .then(response => setTextbooks(response.data))
      .catch(error => {
        console.error('교재 데이터 요청 실패:', error);
        // 예시 데이터 설정 (오류 시)
        const exampleTextbooks = [
          {
            id: 1,
            title: '프로그래밍 입문',
            author: '홍길동',
            image: 'https://via.placeholder.com/220x130.png?text=프로그래밍+입문',
          },
          {
            id: 2,
            title: '데이터베이스 설계',
            author: '이순신',
            image: 'https://via.placeholder.com/220x130.png?text=데이터베이스+설계',
          },
          {
            id: 3,
            title: '모던 웹 개발',
            author: '박지성',
            image: 'https://via.placeholder.com/220x130.png?text=모던+웹+개발',
          },
          {
            id: 4,
            title: '안드로이드 앱 개발',
            author: '최민지',
            image: 'https://via.placeholder.com/220x130.png?text=안드로이드+앱+개발',
          },
          // 추가적인 교재 데이터...
        ];
        setTextbooks(exampleTextbooks);
      });

    // 모의고사 일정 및 등급컷 요청
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/mockExams`)
      .then(response => setMockExams(response.data))
      .catch(error => {
        console.error('모의고사 데이터 요청 실패:', error);
        // 예시 데이터 설정 (오류 시)
        const exampleMockExams = [
          {
            id: 1,
            title: '1차 모의고사',
            schedule: '2025-03-15',
            cutoff: 'A: 90, B: 80, C: 70',
          },
          {
            id: 2,
            title: '2차 모의고사',
            schedule: '2025-04-20',
            cutoff: 'A: 85, B: 75, C: 65',
          },
          {
            id: 3,
            title: '3차 모의고사',
            schedule: '2025-05-25',
            cutoff: 'A: 88, B: 78, C: 68',
          },
          // 추가적인 모의고사 데이터...
        ];
        setMockExams(exampleMockExams);
      });
  }, []);

  return (
    <div className="main-container">
      {/* 신청 가능한 강좌 목록 */}
      <Carousel
        items={courses}
        type="course"
        title="신청 가능한 강좌"
      />

      {/* 강사 목록 */}
      <Carousel
        items={instructors}
        type="instructor"
        title="선생님 목록"
      />

      {/* 교재 목록 */}
      <Carousel
        items={textbooks}
        type="textbook"
        title="교재 목록"
      />

      {/* 모의고사 일정 및 등급컷 */}
      <div className="mock-exam-section">
        <h2 className="section-title">모의고사 일정 및 등급컷</h2>
        <div className="mock-exam-cards">
          {mockExams.map(exam => (
            <div key={exam.id} className="mock-exam-card">
              <h3>{exam.title}</h3>
              <p>일정: {exam.schedule}</p>
              <p>등급컷: {exam.cutoff}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
