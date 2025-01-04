import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = () => {
  return (
    <div className="video" style={{ flex: 1, textAlign: 'center', marginTop: '20px' }}>
      <h1>Video Player Page</h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '50px', height: '70vh' }}>
        <ReactPlayer
          url="https://www.youtube.com/watch?v=R5itCSeyuQA"
          controls
          width="100%"
          height="100%"
          style={{ maxWidth: '800px' }} // 원하는 최대 너비 설정
          config={{
            youtube: {
              playerVars: { showinfo: 1 }
            }
          }}
        />
      </div>
    </div>
  );
}

export default VideoPlayer;
