import React, { useState, useEffect } from "react";
import "../styles/register.scss";
import urlService from "../services/urlService.js";
import urlParse from "url-parse";
// import ReactCSSTransitionGroup from "react-transition-group";
var ReactCSSTransitionGroup = require("react-transition-group");

require("dotenv").config();

const Modal = (props) => {
  const { close } = props;
  const [videoUrl, setVideoUrl] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  // const [category, setCategory] = useState([]);
  let categories = [];
  const handleChange = (event) => {
    setVideoUrl(event.target.value);
  };
  const api_key = process.env["REACT_APP_GOOGLE_API_KEY"];

  const handleCategory = (text, isClicked) => {
    if (!isClicked) {
      let categoryIndex = categories.indexOf(text);
      if (categoryIndex === -1) categories.push(text);
    } else {
      categories.splice(categories.indexOf(text), 1);
    }
    console.log(categories);
  };

  const onSubmit = async (url) => {
    try {
      console.log(categories);
      let videoId = getQueryStringObject(url);
      if (videoId) {
        await urlService.getVideoInfo(videoId, api_key).then((res) => {
          urlService.postUrl({
            url: url,
            videoId: videoId,
            title: title || res.items[0].snippet.title,
            author: author || res.items[0].snippet.channelTitle,
            category: categories,
          });
          alert("성공적으로 등록되었습니다.");
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      {/* <ReactCSSTransitionGroup
        transitionName={"modal-anim"}
        transitionEnterTimeout={200}
        transitionLeaveTimeout={200}
      > */}
      <div className="modal-overlay" onClick={close} />

      <div className="modal">
        <div className="modal-img-wrap">
          <img className="modal-img" src="./register.jpg" alt="modal-img" />
        </div>

        <div className="modal-input-wrap">
          <p className="modal-input-label">카테고리</p>
          <Category
            category={"프론트엔드"}
            onClick={(text, isClicked) => handleCategory(text, isClicked)}
          />
          <Category
            category={"백엔드"}
            onClick={(text, isClicked) => handleCategory(text, isClicked)}
          />
          <Category
            category={"취업"}
            onClick={(text, isClicked) => handleCategory(text, isClicked)}
          />
          <Category
            category={"웹 개발"}
            onClick={(text, isClicked) => handleCategory(text, isClicked)}
          />
          <Category
            category={"앱 개발"}
            onClick={(text, isClicked) => handleCategory(text, isClicked)}
          />
          <Category
            category={"iOS"}
            onClick={(text, isClicked) => handleCategory(text, isClicked)}
          />
          <Category
            category={"안드로이드"}
            onClick={(text, isClicked) => handleCategory(text, isClicked)}
          />
          <p className="modal-input-label">링크(주소)</p>
          <input
            className="modal-input"
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="http://"
          />
          <p className="modal-input-label">제목</p>
          <input
            className="modal-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="입력하지 않으면 자동으로 입력됩니다."
          />
          <p className="modal-input-label">작성자</p>
          <input
            className="modal-input"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="필수 항목입니다."
          />
        </div>
        <div
          className="modal-register-btn-wrap"
          onClick={() => onSubmit(videoUrl)}
        >
          <span>등록하기</span>
        </div>
      </div>
      {/* </ReactCSSTransitionGroup> */}
    </React.Fragment>
  );
};

const getQueryStringObject = (url) => {
  let res = new urlParse(url);
  if (res.query) {
    let temp = res.query.split("=");
    return temp[1];
  }
  return "";
};

const Category = (props) => {
  const [categoryClick, setCategoryClick] = useState(false);
  const { category, onClick } = props;

  return categoryClick ? (
    <div
      className="modal-category-click"
      onClick={() => {
        setCategoryClick(!categoryClick);
        onClick(category, true);
      }}
    >
      <span>{category}</span>
    </div>
  ) : (
    <div
      className="modal-category"
      onClick={() => {
        setCategoryClick(!categoryClick);
        onClick(category, false);
      }}
    >
      <span>{category}</span>
    </div>
  );
};

export default Modal;
