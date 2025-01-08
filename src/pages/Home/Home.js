// Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import Carousel from '../../components/Carousel';
import MockExamDetail from '../MockExamDetail/MockExamDetail'; // 상세 페이지 컴포넌트
import { Link } from 'react-router-dom';  // Link import 추가



const Home = () => {
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [textbooks, setTextbooks] = useState([]);
  const [uniqueMockExamDates, setUniqueMockExamDates] = useState([]); // 고유한 날짜 목록 상태
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
  };
  const formatDate_link = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');  // 두 자리 포맷
    const day = date.getDate().toString().padStart(2, '0');  // 두 자리 포맷
    return `${year}-${month}-${day}`; // 'YYYY-MM-DD' 포맷
  };
  const monthdata = (dataString) => {
    const date = new Date(dataString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return `${year}년 ${month}월`;
  };

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
    // axios.get(`${process.env.REACT_APP_BACKEND_URL}/textbooks`)
    //   .then(response => setTextbooks(response.data))
    //   .catch(error => {
    //     console.error('교재 데이터 요청 실패:', error);
    //     // 예시 데이터 설정 (오류 시)
    //     const exampleTextbooks = [
    //       {
    //         id: 1,
    //         title: '프로그래밍 입문',
    //         author: '홍길동',
    //         image: 'https://via.placeholder.com/220x130.png?text=프로그래밍+입문',
    //       },
    //       {
    //         id: 2,
    //         title: '데이터베이스 설계',
    //         author: '이순신',
    //         image: 'https://via.placeholder.com/220x130.png?text=데이터베이스+설계',
    //       },
    //       {
    //         id: 3,
    //         title: '모던 웹 개발',
    //         author: '박지성',
    //         image: 'https://via.placeholder.com/220x130.png?text=모던+웹+개발',
    //       },
    //       {
    //         id: 4,
    //         title: '안드로이드 앱 개발',
    //         author: '최민지',
    //         image: 'https://via.placeholder.com/220x130.png?text=안드로이드+앱+개발',
    //       },
    //       // 추가적인 교재 데이터...
    //     ];
    //     setTextbooks(exampleTextbooks);
    //   });

    // 모의고사 일정 및 등급컷 요청
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/mockexam`)
        .then(response => {
          if (response.data.length > 0) {
            const uniqueDates = [...new Set(response.data.map(item => item.exam_date))]
              .sort((a, b) => new Date(a) - new Date(b));
            setUniqueMockExamDates(uniqueDates);
          }
        })
        .catch(error => {
            console.error('모의고사 날짜 데이터 요청 실패:', error);
            // 오류 발생 시 예제 데이터 사용
            setUniqueMockExamDates(['2025-03-15', '2025-04-20', '2025-05-25']);
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

      {/* 교재 목록
      <Carousel
        items={textbooks}
        type="textbook"
        title="교재 목록"
      /> */}

      {/* 모의고사 일정 및 등급컷 */}
      <div className="main-container">
        <div className="mock-exam-section">
          <h2 className="section-title">모의고사 일정</h2>
          <div className="mock-exam-cards">
            
          {uniqueMockExamDates.map((date, index) => {
            const examDate = new Date(date);
            const today = new Date();
            today.setHours(0, 0, 0, 0); // 시간을 자정으로 설정해서 날짜만 비교
            const isPast = examDate < today;
            return (
              <Link
                to={`/mockexam/${encodeURIComponent(formatDate_link(date))}`} 
                key={index}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className={`mock-exam-card ${isPast ? 'past' : ''}`}>
                  <h3>{`${monthdata(date)} 모의고사`}</h3>
                  <p>{formatDate(date)}</p>
                </div>
              </Link>
            );
          })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
