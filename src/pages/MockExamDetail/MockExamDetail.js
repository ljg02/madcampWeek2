import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';  // URL 파라미터를 사용하기 위해 import
import './MockExamDetail.css';


const formatDateToYYYYMMDD = (dateString) => {
  return dateString.split('T')[0];  // T 문자 기준으로 잘라서 날짜만 반환
};

const MockExamDetail = () => {
    const { examDate } = useParams();  // URL 파라미터에서 examDate 추출
    const [cutoffs, setCutoffs] = useState([]);

    useEffect(() => {
      if (examDate) {
          const formattedDate = formatDateToYYYYMMDD(examDate); // 시간 제거한 날짜 사용
          axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/mockexam/${formattedDate}`)
              .then(response => setCutoffs(response.data))
              .catch(error => console.error('데이터 불러오기 오류:', error));
      }
  }, [examDate]);

  if (!examDate) {
      return <p>올바른 모의고사 날짜가 제공되지 않았습니다.</p>;
  }


    return (
      <div>
        <h1>등급컷 정보 ({examDate})</h1>
        <table>
          <thead>
            <tr>
              <th>등급</th>
              <th>과목</th>
              <th>구분 점수</th>
              <th>인원</th>
              <th>비율</th>
            </tr>
          </thead>
          <tbody>
            {cutoffs.map(cutoff => (
              <tr key={`${cutoff.grade}-${cutoff.subject_name}`}>
                <td>{cutoff.grade}</td>
                <td>{cutoff.subject_name}</td>
                <td>{cutoff.cutoff_score}</td>
                <td>{cutoff.num_people}</td>
                <td>{cutoff.percentage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default MockExamDetail;