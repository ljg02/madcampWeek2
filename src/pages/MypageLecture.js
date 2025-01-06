import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styles from "./MypageLecture.module.css";
import { AuthContext } from '../components/AuthContext'; // AuthContext import
import { toast } from 'react-toastify';

const MypageLecture = () => {
    const { auth } = useContext(AuthContext);
    const userId = auth.user ? auth.user.id : null;

    const [lectures, setLectures] = useState([
        {course_id : 1, 
         course_title : '영어1', 
         course_image : 'https://via.placeholder.com/220x130.png?text=ENG',
         progress : 30,
         teacher_name : '이명학',
         teacher_subject : '영어',
         teacher_profile_image : 'https://via.placeholder.com/220x130.png?text=이명학'},
         {course_id : 2, 
            course_title : '수학1', 
            course_image : 'https://via.placeholder.com/220x130.png?text=MATH',
            progress : 80,
            teacher_name : '현우진',
            teacher_subject : '수학',
            teacher_profile_image : 'https://via.placeholder.com/220x130.png?text=현우진'}
    ]);
    const [currentLecture, setCurrentLecture] = useState(0);

    const exampleLectures = [{ title: 'Lecture 1', video: 'lecture1.mp4', progress: 70, remaining: 3 },
        { title: 'Lecture 2', video: 'lecture2.mp4', progress: 40, remaining: 5 },
        { title: 'Lecture 3', video: 'lecture3.mp4', progress: 90, remaining: 1 }];

    useEffect(() => {
        console.log('userId : ', userId);
        console.log('user');
        if (!userId) return; // 사용자 ID가 없으면 요청하지 않음

        // 신청한 강좌 목록 요청
        const fetchCourseDetail = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/enrolls/user/${userId}`);
                setLectures(response.data);
            } catch (err) {
                console.error('신청 과목 정보 요청 실패:', err);
                //toast.error('신청한 강의 정보를 불러오지 못했습니다.');
            }
        };

        fetchCourseDetail();
    }, [userId]);

    const handleCancelEnrollment = async (courseId) => {
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

    //const remainingLectures = lectures.filter(lecture => lecture.remaining > 0).length;

    return (
        <div className={styles.mypageContainer}>

            {/* Today's Lecture Section */}
            <div className={styles.sectionFrame}>
                <h1>매일 한 걸음, 꾸준한 배움의 시작</h1>
                <button className={styles.todayButton}>Today's Lectures</button>
                <div className={styles.lectureCardContainer}>
                    {exampleLectures.map((lecture, index) => (
                        <div key={index} className={styles.lectureCard}>
                            <video className={styles.videoPlayer} controls>
                                <source src={lecture.video} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            <h3>{lecture.title}</h3>
                        </div>
                    ))}
                </div>

                {/* Progress Section Adjusted to a Single Row */}
                <div className={styles.statsContainerRow}>
                    <div className={styles.progressRow}>
                        <div className={styles.statBox}>강의 진행률</div>
                        <div className={styles.progressBarContainer}>
                            <div className={styles.progressBar}>
                                <div className={styles.progress} style={{ width: `${exampleLectures[currentLecture].progress}%` }}></div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.progressRow}>
                        <div className={styles.statBox}>남은 강의</div>
                        <div className={styles.notificationBox}>
                            오늘의 강의 remaining개 중 {exampleLectures[currentLecture].remaining}개 남았습니다.
                        </div>
                    </div>
                </div>
            </div>

            {/* Enrolled Teachers Section with Bounding Box */}
            <div className={styles.sectionFrame}>
                <h2>내가 수강신청한 강의</h2>
                {/* <span>접속 유저 : {userId}</span> */}
                {lectures.length > 0 ? (
                    <div className={styles.enrolledLectures}>
                        {lectures.map((lecture) => (
                            <div key={lecture.course_id} className={styles.enrolledLectureCard}>
                                <img src={lecture.teacher_profile_image} alt={lecture.teacher_name} className={styles.teacherProfileImage} />
                                <div className={styles.lectureInfo}>
                                    <p><strong>{lecture.course_title}</strong></p>
                                    <p>{lecture.teacher_subject} - {lecture.teacher_name}</p>
                                    <div className={styles.progressContainer}>
                                        <div className={styles.progressBar}>
                                            <div className={styles.progress} style={{ width: `${lecture.progress}%` }}></div>
                                        </div>
                                        <span>{lecture.progress}% 완료</span>
                                    </div>
                                    <button className={styles.cancelButton} onClick={() => handleCancelEnrollment(lecture.course_id)}>
                                        수강 취소
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={styles.noData}>신청한 강의가 없습니다.</div>
                )}
            </div>
        </div>
    );
};

export default MypageLecture;
