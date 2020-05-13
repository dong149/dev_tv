import React, { useState } from "react";
import "../styles/content.scss";
import YouTube from "react-youtube";

const opts = {
  // height: "390",
  width: "390",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};

const Content = () => {
  const [isOpen, setIsOpen] = useState(false);
  const _onReady = (event) => {
    event.target.pauseVideo();
  };
  if (isOpen) {
    return (
      <div className="content">
        <YouTube videoId="2g811Eo7K8U" opts={opts} onReady={_onReady} />
        <div onClick={() => setIsOpen(!isOpen)}>
          <span>닫기</span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="post" onClick={() => setIsOpen(!isOpen)}>
        <div className="thumbnail-wrap">
          <img
            className="thumbnail"
            src="http://img.youtube.com/vi/F0Awe2-H7a0/0.jpg"
            alt="thumbnail"
          />
        </div>
        <div className="post-content">
          <div className="post-title-wrap">
            <span>React 파헤치기</span>
          </div>
          <div className="post-subtitle-wrap">
            <span>개꿀입니다.</span>
          </div>
          <div className="post-name-wrap">
            <span>류동훈</span>
          </div>
        </div>
      </div>
    );
  }
};

export default Content;
