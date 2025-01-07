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
    const [commentsLoading, setCommentsLoading] = useState(true); // 댓글 로딩 상태

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

    // 댓글 불러오기
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/comments/video/${id}`);
                if (response.data.success) {
                    setComments(response.data.comments);
                } else {
                    console.error('댓글 불러오기 실패:', response.data.message);
                }
                setCommentsLoading(false);
            } catch (err) {
                console.error('댓글 불러오기 에러:', err);
                toast.error('댓글을 불러오는 데 실패했습니다.');
                setCommentsLoading(false);
            }
        };

        fetchComments();
    }, [id]);

    // 댓글 추가 핸들러
    const handleCommentSubmit = async () => {
        if (newComment.trim()) {
            if (!auth.isAuthenticated || !auth.user) {
                toast.error('댓글을 작성하려면 로그인이 필요합니다.');
                return;
            }

            if (!isEnrolled) {
                toast.error('댓글을 작성하려면 이 강의를 신청해야 합니다.');
                setNewComment('');
                return;
            }

            try {
                const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/comments`, {
                    video_id: id,
                    content: newComment,
                    user_id: auth.user.id
                });

                if (response.data.success) {
                    // 새로운 댓글을 상태에 추가
                    const newCommentData = {
                        id: response.data.comment.id,
                        content: newComment,
                        created_at: response.data.comment.created_at,
                        user_id: auth.user.id,
                        user_name: auth.user.name,
                    };
                    setComments([newCommentData, ...comments]);
                    setNewComment('');

                    // const total = positiveCount + negativeCount || 1; // 0으로 나누는 것을 방지
                    // setSentiment({
                    //     positive: Math.round((positiveCount / total) * 100),
                    //     negative: Math.round((negativeCount / total) * 100),
                    // });

                    toast.success('댓글이 성공적으로 작성되었습니다.');
                } else {
                    console.error('댓글 작성 실패:', response.data.message);
                    toast.error('댓글 작성에 실패했습니다.');
                }
            } catch (err) {
                console.error('댓글 작성 에러:', err);
                toast.error('댓글 작성에 실패했습니다. 다시 시도해주세요.');
            }
        }
    };

    const handleInstructorClick = (teacherId) => {
        navigate(`/instructor/${teacherId}`);
    };

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
                    <div className={styles.instructorInfo} onClick={() => handleInstructorClick(teacher.id)}>
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
                    <div className={styles.commentsContainer}>
                        <h3>댓글 목록</h3>
                        {commentsLoading ? (
                            <p>댓글을 불러오는 중...</p>
                        ) : comments.length > 0 ? (
                            <ul className={styles.commentList}>
                                {comments.map((comment) => (
                                    <li key={comment.id} className={styles.commentItem}>
                                        <p className={styles.commentUser}>{comment.user_name}:</p>
                                        <p className={styles.commentContent}>{comment.content}</p>
                                        <p className={styles.commentTime}>{new Date(comment.created_at).toLocaleString()}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>작성된 댓글이 없습니다.</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default VideoDetail;
