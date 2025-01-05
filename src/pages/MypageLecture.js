import React, { useState } from 'react';
import styles from "./MypageLecture.module.css";

const MypageLecture = () => {
    const [lectures, setLectures] = useState([
        { title: 'Lecture 1', video: 'lecture1.mp4', progress: 70, remaining: 3 },
        { title: 'Lecture 2', video: 'lecture2.mp4', progress: 40, remaining: 5 },
        { title: 'Lecture 3', video: 'lecture3.mp4', progress: 90, remaining: 1 }
    ]);
    const [currentLecture, setCurrentLecture] = useState(0);

    const [teachers, setTeachers] = useState([
        { name: 'John Doe', subject: 'Math', lecture: 'Algebra Basics', profileImage: 'john_doe.jpg' },
        { name: 'Jane Smith', subject: 'Science', lecture: 'Physics 101', profileImage: 'jane_smith.jpg' }
    ]);

    const handleCancelEnrollment = (index) => {
        const updatedTeachers = teachers.filter((_, i) => i !== index);
        setTeachers(updatedTeachers);
    };

    const remainingLectures = lectures.filter(lecture => lecture.remaining > 0).length;

    return (
        <div className={styles.mypageContainer}>

            {/* Today's Lecture Section */}
            <div className={styles.sectionFrame}>
                <h1>매일 한 걸음, 꾸준한 배움의 시작</h1>
                <button className={styles.todayButton}>Today's Lectures</button>
                <div className={styles.lectureCardContainer}>
                    {lectures.map((lecture, index) => (
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
                                <div className={styles.progress} style={{ width: `${lectures[currentLecture].progress}%` }}></div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.progressRow}>
                        <div className={styles.statBox}>남은 강의</div>
                        <div className={styles.notificationBox}>
                            오늘의 강의 {remainingLectures}개 중 {lectures[currentLecture].remaining}개 남았습니다.
                        </div>
                    </div>
                </div>
            </div>

            {/* Enrolled Teachers Section with Bounding Box */}
            <div className={styles.sectionFrame}>
                <h2>내가 수강신청한 강의</h2>
                <div className={styles.teacherList}>
                    {teachers.map((teacher, index) => (
                        <div key={index} className={styles.teacherCard} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '10px' }}>
                            <img src={teacher.profileImage} alt={teacher.name} className={styles.teacherProfileImage} />
                            <p><strong>{teacher.name}</strong></p>
                            <p>{teacher.subject} - {teacher.lecture}</p>
                            <button className={styles.cancelButton} onClick={() => handleCancelEnrollment(index)}>수강 취소</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MypageLecture;
