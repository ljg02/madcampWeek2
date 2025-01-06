// src/pages/TextbookDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './TextbookDetail.css'; // 스타일링 파일 (필요 시 생성)

const TextbookDetail = () => {
  const { id } = useParams(); // URL 파라미터에서 textbook ID 가져오기
  const [textbook, setTextbook] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // 과목 상세 정보 요청
    const fetchTextbookDetail = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/textbooks/${id}`);
        setTextbook(response.data.textbook);
        setTeacher(response.data.teacher); // API 응답에 teacher 정보 포함
        setLoading(false);
      } catch (err) {
        console.error('교재 상세 정보 요청 실패:', err);
        setError('교재 정보를 불러오는 데 실패했습니다.');
        setLoading(false);
      }
    };

    fetchTextbookDetail();
  }, [id]);

  if (loading) {
    return <div className="loading">로딩 중...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!textbook) {
    return <div className="no-data">교재재 정보가 없습니다.</div>;
  }

  return (
    <div className="textbook-detail-container">
      <h1 className="textbook-title">{textbook.title}</h1>
      <img src={textbook.image} alt={textbook.title} className="textbook-image" />

      {teacher && (
        <div className="teacher-info">
          <h2>담당 선생님</h2>
          <img src={teacher.image} alt={teacher.name} className="teacher-image" />
          <div className="info-container">
            <p className="teacher-name">{teacher.name}</p>
            <p className="teacher-subject">담당 과목: {teacher.subject}</p>
          </div>
        </div>
      )}

      {/* 추가적인 세부 정보 표시 가능 */}
    </div>
  );
};

export default TextbookDetail;
