import React, { useState } from "react";
import "../styles/content.scss";
import YouTube from "react-youtube";
import urlService from "../services/urlService.js";
import urlParse from "url-parse";
import axios from "axios";
require("dotenv").config();
const opts = {
  // height: "390",
  width: "390",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};
// const getQueryStringObject = (url) => {
//   let res = new urlParse(url);
//   if (res.query) {
//     let temp = res.query.split("=");
//     return temp[1];
//   }
//   return "";
// };
const handleCategory = (categories, currentCategory) => {
  if (currentCategory === "전체") {
    return true;
  }
  for (let i = 0; i < categories.length; i++) {
    if (categories[i] === currentCategory) {
      return true;
    }
  }
  return false;
};
const Contents = (props) => {
  const { videoUrls, category } = props;
  const contents = [];
  console.log(category);
  for (let i = Object.keys(videoUrls).length - 1; i >= 0; i--) {
    const videoId = videoUrls[i].videoId;
    let isInCategory = handleCategory(videoUrls[i].categories, category);
    if (videoId && isInCategory) {
      contents.push(
        <Content
          id={videoUrls[i]._id}
          videoId={videoId}
          title={videoUrls[i].title}
          channel={videoUrls[i].channel}
          author={videoUrls[i].author}
        />
      );
    }
  }
  return contents;
};

const Content = (props) => {
  const { id, videoId, title, channel, author } = props;
  const [isOpen, setIsOpen] = useState(false);
  const _onReady = (event) => {
    event.target.pauseVideo();
  };
  const iframeSrc = `https://www.youtube.com/embed/${videoId}`;
  const thumbnailSrc = `http://img.youtube.com/vi/${videoId}/0.jpg`;

  // 삭제 기능입니다.
  const onDelete = async (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      await urlService.deleteUrl(id).then((res) => {
        if (res) {
          alert("성공적으로 삭제되었습니다.");
          window.location.reload();
        } else {
          alert("삭제 중에 오류가 발생하였습니다.");
          window.location.reload();
        }
      });
    }
  };
  if (isOpen && videoId) {
    return (
      <div className="content">
        <iframe
          width="560"
          height="315"
          src={iframeSrc}
          // src={videoUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          autoPlay="1"
        />

        {/* <YouTube videoId="2g811Eo7K8U" opts={opts} onReady={_onReady} /> */}
        <div onClick={() => setIsOpen(!isOpen)}>
          <span>닫기</span>
        </div>
        <div>
          <span onClick={() => onDelete(id)}>삭제</span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="post" onClick={() => setIsOpen(!isOpen)}>
        <div className="thumbnail-wrap">
          <img className="thumbnail" src={thumbnailSrc} alt="thumbnail" />
        </div>
        <div className="post-content">
          <div className="post-title-wrap">
            <span>{title}</span>
          </div>
          <div className="post-subtitle-wrap">
            <span>{channel}</span>
          </div>
          <div className="post-name-wrap">
            <span>{author}</span>
          </div>
        </div>
      </div>
    );
  }
};

export default Contents;
