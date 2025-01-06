// src/pages/InstructorDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './InstructorDetail.css'; // 스타일링 파일 (필요 시 생성)

const InstructorDetail = () => {
  const { id } = useParams();
  const [instructor, setInstructor] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInstructorDetail = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/instructors/${id}`);
        setInstructor(response.data.instructor);
        setCourses(response.data.courses); // API 응답에 강사가 담당하는 과목들 포함
        setLoading(false);
      } catch (err) {
        console.error('강사 상세 정보 요청 실패:', err);
        setError('강사 정보를 불러오는 데 실패했습니다.');
        setLoading(false);
      }
    };

    fetchInstructorDetail();
  }, [id]);

  if (loading) {
    return <div className="loading">로딩 중...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!instructor) {
    return <div className="no-data">강사 정보가 없습니다.</div>;
  }

  return (
    <div className="instructor-detail-container">
      {/* 상단 섹션: 강사 사진 및 기본 정보 */}
      <div className="instructor-header">
        <img src={instructor.image} alt={instructor.name} className="instructor-image" />
        <div className="instructor-info">
          <h1 className="instructor-name">{instructor.name}</h1>
          <p className="instructor-subject">담당 과목: {instructor.subject}</p>
        </div>
      </div>

      {/* 중간 섹션: 강사가 담당하는 과목들 */}
      <div className="instructor-courses">
        <h2>강좌 목록</h2>
        <div className="courses-grid">
          {courses.map(course => (
            <div key={course.id} className="course-card">
              <img src={course.image} alt={course.title} className="course-image" />
              <div className="course-content">
                <h3 className="course-title">{course.title}</h3>
                <p className="course-description">{course.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstructorDetail;
