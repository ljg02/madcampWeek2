// src/pages/CourseDetail.js
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'; // toast import
import './CourseDetail.css'; // 스타일링 파일 (필요 시 생성)
import { AuthContext } from '../../components/AuthContext'; // AuthContext import
import ReactPlayer from 'react-player'; // ReactPlayer import

const CourseDetail = () => {
  const { id } = useParams(); // URL 파라미터에서 course ID 가져오기
  const [course, setCourse] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEnrolled, setIsEnrolled] = useState(false); // 강의 신청 상태
  const [videos, setVideos] = useState([]); // 강의 영상 상태

  const { auth } = useContext(AuthContext); // AuthContext에서 로그인 정보 확인
  const navigate = useNavigate(); // 페이지 이동을 위한 훅
  const location = useLocation(); // 현재 위치를 가져오기 위한 훅

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

    // 강의 신청 여부 확인
    const checkEnrollment = async () => {
      if (auth.isAuthenticated && auth.user) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/enrolls/check`, {
            params: {
              userId: auth.user.id,
              courseId: id,
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

    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/courses/${id}/videos`);
        setVideos(response.data.videos);
      } catch (err) {
        console.error('강의 영상 목록 요청 실패:', err);
        toast.error('강의 영상목록을 불러오는 데 실패했습니다.');
      }
    }

    fetchCourseDetail();
    checkEnrollment();
    fetchVideos();
  }, [id, auth.isAuthenticated, auth.user]);

  // 강의 신청 버튼 클릭 핸들러
  const handleEnroll = async () => {
    if (auth.isAuthenticated && auth.user) {
      const userId = auth.user.id;
      const courseId = id;
      if (!isEnrolled) {
        try {
          // 강의 신청 API 요청 (예시: POST 요청)
          const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/enrolls`, {
            userId: userId, courseId: courseId,
          });
          toast.success('강의가 신청되었습니다.');
          setIsEnrolled(true);
        } catch (err) {
          console.error('강의 신청 실패:', err);
          toast.error('강의 신청에 실패했습니다. 다시 시도해주세요.');
        }
      }
      else {
        // 강의 취소
        try {
          const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/enrolls/cancel`, {
            data: { userId, courseId },
          });

          toast.success('강의 신청이 취소되었습니다.');
          setIsEnrolled(false); // 상태 업데이트
        } catch (err) {
          console.error('강의 취소 실패:', err);
          toast.error('강의 취소에 실패했습니다. 다시 시도해주세요.');
        }
      }
    } else {
      // 비로그인 상태일 경우 로그인 페이지로 이동
      navigate('/login', {
        state: {
          from: location.pathname, // 사용자가 강의 신청을 시도한 페이지
          message: '로그인이 필요한 서비스입니다.',
        },
      });
    }
  };

  const handleVideoCardClick = (videoId) => {
    navigate(`/video/${videoId}`);
  };

  const handleTeacherProfileClick = (teacherId) => {
    navigate(`/instructor/${teacherId}`);
  };

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
      <div className="course-book-content">
        <h1 className="course-title-course">{course.title}</h1>
        <img src={course.image} alt={course.title} className="course-image-coursedetail" />
        <p className="course-description">{course.description}</p>
      </div>
      {teacher && (
        <div className="teacher-info" onClick={() => handleTeacherProfileClick(teacher.id)}>
          {/* <h2>담당 선생님</h2> */}
          <img src={teacher.image} alt={teacher.name} className="teacher-image" />
          <div className="info-container">
            <p className="teacher-name">{teacher.name}</p>
            <p className="teacher-subject">담당 과목: {teacher.subject}</p>
          </div>
        </div>
      )}

      {/* 강의 신청/취소 버튼 추가 */}
      <button className={`enroll-button ${isEnrolled ? 'cancel' : 'enroll'}`} onClick={handleEnroll}>
        {isEnrolled ? '강의 취소' : '강의 신청'}
      </button>

      {/* 강의 영상 목록 렌더링 */}
      <div className="video-list">
        <h2 className="video-list-title">강의 비디오 목록</h2>
        {videos.length > 0 ? (
          <ul>
            {videos.map((video) => (
              <li key={video.id} className="video-item">
                <div className="video-card" onClick={() => handleVideoCardClick(video.id)}>
                  <ReactPlayer
                    url={video.youtube_id}
                    controls
                    width="630px"
                    height="360px"
                    config={{
                      youtube: {
                        playerVars: { showinfo: 1 }
                      }
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>강의에 포함된 영상이 없습니다.</p>
        )}
      </div>

      {/* 추가적인 세부 정보 표시 가능 */}
    </div>
  );
};

export default CourseDetail;
