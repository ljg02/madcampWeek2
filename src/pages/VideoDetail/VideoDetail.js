// import React from "react";
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'; // toast import
import './VideoDetail.module.css'; // 스타일링 파일 (필요 시 생성)
import { AuthContext } from '../../components/AuthContext'; // AuthContext import
import ReactPlayer from 'react-player'; // ReactPlayer import (유튜브 비디오 재생용)

import styles from "./VideoDetail.module.css";

const VideoDetail = () => {
    const { id } = useParams(); // URL 파라미터에서 video ID 가져오기
    const navigate = useNavigate();
    const location = useLocation();

    const { auth } = useContext(AuthContext); // 로그인 정보 확인

    const [course, setCourse] = useState(null);
    const [teacher, setTeacher] = useState(null);
    const [video, setVideo] = useState([]); // 비디오 목록 상태 추가
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isEnrolled, setIsEnrolled] = useState(false); // 강의 신청 상태

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [sentiment, setSentiment] = useState({ positive: 70, negative: 30 });

    const handleCommentSubmit = () => {
        if (newComment.trim()) {
            setComments([...comments, newComment]);
            setNewComment('');
        }
    };

    useEffect(() => {
        const fetchVideoDetail = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/videos/${id}`);
                setCourse(response.data.course);
                setTeacher(response.data.teacher);
                setVideo(response.data.video); // 영상 설정
                setLoading(false);
            } catch (err) {
                console.error('비디오 상세 정보 요청 실패:', err);
                setError('비디오 정보를 불러오는 데 실패했습니다.');
                setLoading(false);
            }
        };

        const checkEnrollment = async () => {
            if (auth.isAuthenticated && auth.user) {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/enrolls/check/video`, {
                        params: {
                            userId: auth.user.id,
                            videoId: id,
                        },
                    });

                    if (response.data.success) {
                        setIsEnrolled(response.data.isEnrolled);
                    } else {
                        console.error('강의 신청 여부 확인 실패:', response.data.message);
                    }
                } catch (err) {
                    console.error('강의 신청 여부 확인 에러:', err);
                }
            }
        };

        fetchVideoDetail();
        checkEnrollment();
    }, [id, auth]);

    return (
        <div className={styles.container}>
            {/* 로딩 상태 */}
            {loading && <div className={styles.loading}>로딩 중...</div>}

            {/* 에러 상태 */}
            {error && <div className={styles.error}>{error}</div>}

            {/* 영상 및 상세 정보 */}
            {!loading && !error && course && (
                <>
                    {/* 영상 제목 */}
                    <div className={styles.videoTitle}>
                        <span className={styles.videoTitleText}>{'<'}{course.title}{'>'} 강의 영상</span>
                    </div>
                    {/* 영상 섹션 */}
                    <div className={styles.videoContainer}>
                        <ReactPlayer
                            url={video.youtube_id}
                            controls
                            width='1260px'
                            height='720px'
                            style
                            config={{
                                youtube: {
                                    playerVars: { showinfo: 1 }
                                }
                            }}
                        />
                    </div>

                    {/* 강사 섹션 */}
                    <div className={styles.instructorInfo}>
                        <img src={teacher.image} alt={teacher.name} className={styles.profileImage} />
                        <div>
                            <p className={styles.subject}> {teacher.name}</p>
                            <p className={styles.message}>과목 : {teacher.subject}</p>
                        </div>
                    </div>

                    {/* 감정 분석 섹션 */}
                    <div className={styles.sentimentAnalysis}>
                        <p className={styles.sentimentTitle}>민심</p>
                        <div className={styles.sentimentBar}>
                            <div className={styles.positive} style={{ width: `${sentiment.positive}%` }}></div>
                            <div className={styles.negative} style={{ width: `${sentiment.negative}%` }}></div>
                        </div>
                    </div>

                    {/* 댓글 섹션 */}
                    <div className={styles.commentSection}>
                        <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="댓글을 입력하세요"
                            className={styles.commentInput}
                        />
                        <button className={styles.submitButton} onClick={handleCommentSubmit}>등록</button>
                    </div>

                    {/* 댓글 목록 */}
                    <ul className={styles.commentList}>
                        {comments.map((comment, index) => (
                            <li key={index} className={styles.commentItem}>{comment}</li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default VideoDetail;
