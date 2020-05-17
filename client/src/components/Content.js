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

const Contents = (props) => {
  const { videoUrls } = props;
  const contents = [];
  for (let i = Object.keys(videoUrls).length - 1; i >= 0; i--) {
    const videoId = videoUrls[i].videoId;
    // getQueryStringObject(videoUrls[i].url);
    if (videoId) {
      contents.push(
        <Content
          videoId={videoId}
          title={videoUrls[i].title}
          author={videoUrls[i].author}
        />
      );
    }
  }
  return contents;
};

const Content = (props) => {
  const { videoId, title, author } = props;
  const [isOpen, setIsOpen] = useState(false);
  const _onReady = (event) => {
    event.target.pauseVideo();
  };
  const iframeSrc = `https://www.youtube.com/embed/${videoId}`;
  const thumbnailSrc = `http://img.youtube.com/vi/${videoId}/0.jpg`;
  // const api_key = process.env["REACT_APP_GOOGLE_API_KEY"];
  // const getVideoInfo = async () => {
  //   let res = await axios.get(
  //     `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=AIzaSyCDowl_ehZXRoDwlEYK-PHCVuHWm7stWPc`
  //   );
  //   return res.data || [];
  // };
  // getVideoInfo().then((res) => {
  //   console.log(res);
  // });

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
            <span>{author}</span>
          </div>
          <div className="post-name-wrap">
            <span>류동훈</span>
          </div>
        </div>
      </div>
    );
  }
};

export default Contents;
