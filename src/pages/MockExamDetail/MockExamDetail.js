import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './MockExamDetail.css';

// 날짜 포맷을 YYYY-MM-DD로 변환하는 함수
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};
const monthdata = (dataString) => {
    const date = new Date(dataString); // Convert the string into a Date object
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth() returns 0 for January, so add 1
    return `${year}년 ${month}월`;
};

const MockExamDetail = () => {
    const { examDate } = useParams();  
    const [cutoffs, setCutoffs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCutoffs = async () => {
            if (examDate) {
                const formattedDate = decodeURIComponent(examDate);
                try {
                    const response = await axios.get(
                        `${process.env.REACT_APP_BACKEND_URL}/api/mockexam/${formattedDate}`
                    );
                    setCutoffs(response.data);
                } catch (error) {
                    console.error('데이터 불러오기 오류:', error);
                }
                setLoading(false);
            }
        };
        fetchCutoffs();
    }, [examDate]);

    if (loading) {
        return <p>데이터를 불러오는 중입니다...</p>;
    }

    if (cutoffs.length === 0) {
        return <p>해당 날짜에 등급컷 데이터가 존재하지 않습니다.</p>;
    }

    // 과목별로 데이터 그룹화
    const groupedBySubject = cutoffs.reduce((acc, cutoff) => {
        const subject = cutoff.subject_name;
        if (!acc[subject]) {
            acc[subject] = [];
        }
        acc[subject].push(cutoff);
        return acc;
    }, {});

    return (
        <div className="table-container">
            <h1>{monthdata(examDate)} 모의고사 등급컷</h1>
            {/* subjects-grid 컨테이너로 과목별 섹션들을 감쌈 */}
            <div className="subjects-grid">
                {Object.entries(groupedBySubject).map(([subject, exams]) => (
                    <div key={subject} className="subject-section">
                        <h2>{subject}</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>등급</th>
                                    <th>구분 점수</th>
                                    <th>인원</th>
                                    <th>비율</th>
                                </tr>
                            </thead>
                            <tbody>
                                {exams.map((cutoff, index) => (
                                    <tr key={`${cutoff.grade}-${index}`}>
                                        <td>{cutoff.grade}</td>
                                        <td>{cutoff.cutoff_score}</td>
                                        <td>{cutoff.num_people}</td>
                                        <td>{cutoff.percentage}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MockExamDetail;
