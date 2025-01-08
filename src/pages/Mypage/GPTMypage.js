// Home.js
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../components/AuthContext'; // AuthContext import
import { toast } from 'react-toastify';
import styles from "./GPTMypage.module.css";

function Mypage() {
  const { auth } = useContext(AuthContext);
  const userId = auth.user ? auth.user.id : null;

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [lectures, setLectures] = useState([
    { title: 'Lecture 1', video: 'lecture1.mp4', progress: 70 },
    { title: 'Lecture 2', video: 'lecture2.mp4', progress: 40 },
    { title: 'Lecture 3', video: 'lecture3.mp4', progress: 90 }
  ]);

  const [timeTable, setTimeTable] = useState(Array(24 * 6).fill(''));
  const [colorNotes, setColorNotes] = useState({});

  // 신청한 강좌 목록 요청
  const fetchCourseDetail = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/enrolls/user/${userId}`);
      setLectures(response.data);
    } catch (err) {
      console.error('신청 과목 정보 요청 실패:', err);
      toast.error('신청한 강의 정보를 불러오지 못했습니다.');
    }
  }, [userId]); // userId를 의존성으로 추가

  const fetchTimeTableFromDB = useCallback(async () => {
    try {
      const today = new Date(Date.now()).toLocaleDateString('ko-KR');
      console.log('today: ', today);

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/ttt/${userId}/${today}`
      );

      if (response.data.success && response.data.timeTables) {
        // 응답받은 데이터를 timeTable 배열로 변환
        const fetchedData = response.data.timeTables;
        // 데이터 구조에 따라 변환 로직 작성 (예: 색상만 추출)
        const newTimeTable = Array(24 * 6).fill('');

        // 임시 객체를 생성하여 색상 노트를 누적
        const updatedColorNotes = { ...colorNotes };

        fetchedData.forEach(({ hour, minute, color, note }) => {
          const minuteIndex = minute / 10;
          newTimeTable[hour * 6 + minuteIndex] = color;
          if (color !== '') {
            updatedColorNotes[color] = note; // 색상 노트를 누적
          }
        });
        // 상태를 한 번에 업데이트
        setColorNotes(updatedColorNotes);
        setTimeTable(newTimeTable);
        //console.log('fetchedData: ', fetchedData);
      }
    } catch (error) {
      console.error('시간표 불러오기 실패:', error);
    }
  }, [userId, colorNotes]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/testUsers`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('데이터 요청 실패:', error);
      });

    fetchCourseDetail();
    fetchTimeTableFromDB();
  }, [fetchCourseDetail, fetchTimeTableFromDB]);

  const handleCancelEnrollment = async (courseId) => {
    const isConfirmed = window.confirm('정말 수강 신청을 취소하시겠습니까?');
    if (!isConfirmed) return; // 사용자가 취소를 누르면 함수 종료

    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/enrolls/cancel`, {
        data: { userId: userId, courseId },
      });

      // 강의 목록에서 취소된 강의 제거
      setLectures(prevLectures => prevLectures.filter(lecture => lecture.course_id !== courseId));
      toast.success('강의 신청이 취소되었습니다.');
    } catch (err) {
      console.error('강의 신청 취소 실패:', err);
      toast.error('강의 신청을 취소하는 데 실패했습니다.');
    }
  };

  const handleLectureCardClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  const handleTeacherProfileClick = (teacherId) => {
    navigate(`/instructor/${teacherId}`);
  };

  // 진행도 평균 계산 함수
  const calculateAverage = (arr) => {
    if (arr.length === 0) return 0;
    const sum = arr.reduce((acc, element) => acc + element.progress, 0);
    return sum / arr.length;
  };

  const countColoredCells = () => {
    return timeTable.filter(cell => cell !== '').length;
  };

  return (
    <div className={styles.home_container}>
      <section className={styles.all_section}>
        <section className={styles.analytics_section1}>
          <section className={styles.courses_section}>
            <h2>수강 중인 강의</h2>
            <div className={styles.courses}>
              <section className={styles.all_section}>
                <div className={styles.lectureCardContainer}>
                  {lectures.map((lecture) => (
                    <div key={lecture.course_id} className={styles.enrolledLectureCard} onClick={() => handleLectureCardClick(lecture.course_id)}>
                      <img src={lecture.teacher_profile_image} alt={lecture.teacher_name} className={styles.teacherProfileImage}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTeacherProfileClick(lecture.teacher_id);
                        }} />
                      <div className={styles.lectureInfo}>
                        <p><strong>{lecture.course_title}</strong></p>
                        <p>{lecture.teacher_subject} - {lecture.teacher_name}</p>
                        <div className={styles.progressContainer}>
                          <div className={styles.progressBar}>
                            <div className={styles.progress} style={{ width: `${lecture.progress}%` }}></div>
                          </div>
                          <span>{lecture.progress}% 완료</span>
                        </div>
                        <button className={styles.cancelButton} onClick={(e) => {
                          e.stopPropagation(); // 이벤트 전파 중단
                          handleCancelEnrollment(lecture.course_id);
                        }}>
                          수강 취소
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </section>
          <section className={styles.analytics_section2}>
            <div className={styles.analytics_card}>
              <h3>강의 진행률</h3>
              <div className={styles.progress_bar}>
                <div className={styles.progress} style={{ width: `${calculateAverage(lectures)}%` }}></div>
              </div>
              <p>{calculateAverage(lectures)}% 완료</p>
            </div>
            <div className={styles.analytics_card}>
              <h3>공부 시간 분석</h3>
              <p>오늘 공부 시간은 {countColoredCells()}시간입니다.</p>
            </div>
            <div className={styles.analytics_card}>
              <h3>피드백</h3>
              <p>잘 하고 있어요! 조금 더 분발해봐요!</p>
            </div>
          </section>
        </section>

        <section className={styles.timetable_section}>
          <h2>오늘의 시간표 </h2>
          <div className={styles.tableGrid}>
            <div className={styles.timeRow}>
              <div className={styles.hourLabel}></div>
              {['10', '20', '30', '40', '50', '60'].map((minute, index) => (
                <div key={index} className={styles.timeCellLabel}>{minute}</div>
              ))}
            </div>
            {Array.from({ length: 24 }, (_, hour) => (
              <div key={hour} className={styles.timeRow}>
                <div className={styles.hourLabel}>{((hour + 8) % 24 || 24).toString().padStart(2, '0')}</div>
                {Array.from({ length: 6 }, (_, minuteIndex) => (
                  <div
                    key={minuteIndex}
                    className={styles.timeCell}
                    style={{ backgroundColor: timeTable[hour * 6 + minuteIndex] }}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className={styles.notesList}>
            {/* 할당된 note가 있는 color 리스트 출력 */}
            {Object.keys(colorNotes).map((color) => (
              <div key={color} className={styles.noteItem}>
                <input
                  type="color"
                  value={color}
                  style={{ width: '35px', height: '35px', border: 'none', padding: '0' }}
                  disabled={true}
                />
                <span
                  style={{ width: '300px', height: '35px', padding: '5px' }}
                >{colorNotes[color]}</span>
              </div>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}

export default Mypage;
