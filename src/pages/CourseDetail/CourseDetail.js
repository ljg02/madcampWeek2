// src/pages/CourseDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CourseDetail.css'; // 스타일링 파일 (필요 시 생성)

const CourseDetail = () => {
  const { id } = useParams(); // URL 파라미터에서 course ID 가져오기
  const [course, setCourse] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // 과목 상세 정보 요청
    const fetchCourseDetail = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/courses/${id}`);
        setCourse(response.data.course);
        setTeacher(response.data.teacher); // API 응답에 teacher 정보 포함
        setLoading(false);
      } catch (err) {
        console.error('과목 상세 정보 요청 실패:', err);
        setError('과목 정보를 불러오는 데 실패했습니다.');
        setLoading(false);
      }
    };

    fetchCourseDetail();
  }, [id]);

  if (loading) {
    return <div className="loading">로딩 중...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!course) {
    return <div className="no-data">과목 정보가 없습니다.</div>;
  }

  return (
    <div className="course-detail-container">
      <h1 className="course-title">{course.title}</h1>
      <img src={course.image} alt={course.title} className="course-image" />
      <p className="course-description">{course.description}</p>

      {teacher && (
        <div className="teacher-info">
          <h2>담당 선생님</h2>
          <img src={teacher.photo} alt={teacher.name} className="teacher-photo" />
          <p className="teacher-name">{teacher.name}</p>
          <p className="teacher-subject">담당 과목: {teacher.subject}</p>
        </div>
      )}

      {/* 추가적인 세부 정보 표시 가능 */}
    </div>
  );
};

export default CourseDetail;
