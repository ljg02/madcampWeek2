// import React from "react";
import React, { useState } from 'react';

import styles from "./Lecture.module.css";


const LectureAllFrame = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [sentiment, setSentiment] = useState({ positive: 70, negative: 30 });

  const handleCommentSubmit = () => {
      if (newComment.trim()) {
          setComments([...comments, newComment]);
          setNewComment('');
      }
  };

  return (
      <div className={styles.container}>
          {/* Video Section */}
          <div className={styles.videoContainer}>
              <video className={styles.videoPlayer} controls>
                  <source src="video-link.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
              </video>
          </div>

          {/* Instructor Section */}
          <div className={styles.instructorInfo}>
              <img src="instructor-profile.jpg" alt="Instructor" className={styles.profileImage} />
              <div>
                  <p className={styles.subject}>Subject: Math</p>
                  <p className={styles.message}>"Keep pushing forward!"</p>
              </div>
          </div>

          {/* Sentiment Analysis Section */}
          <div className={styles.sentimentAnalysis}>
              <p>댓글 감정 분석</p>
              <div className={styles.sentimentBar}>
                  <div className={styles.positive} style={{ width: `${sentiment.positive}%` }}></div>
                  <div className={styles.negative} style={{ width: `${sentiment.negative}%` }}></div>
              </div>
          </div>

          {/* Comment Input Section */}
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

          {/* Comment Section */}
          <ul className={styles.commentList}>
              {comments.map((comment, index) => (
                  <li key={index} className={styles.commentItem}>{comment}</li>
              ))}
          </ul>
      </div>
  );
};

export default LectureAllFrame;
