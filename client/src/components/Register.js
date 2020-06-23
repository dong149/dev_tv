import React, { useState, useEffect } from "react";
import "../styles/register.scss";
import urlService from "../services/urlService.js";
import urlParse from "url-parse";
import { isEmpty, handleDate } from "../functions";
import { format, formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
var ReactCSSTransitionGroup = require("react-transition-group");

require("dotenv").config();

const Modal = (props) => {
  const { close } = props;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  // const [category, setCategory] = useState([]);
  // let categories = [];
  const handleChange = (event) => {
    setVideoUrl(event.target.value);
  };
  const api_key = process.env["REACT_APP_GOOGLE_API_KEY"];
  useEffect(() => {
    console.log(categories);
  }, [categories]);
  const handleCategory = (text, isClicked) => {
    // console.log(typeof categories);
    // let temp = categories.slice(0, categories.length);
    // console.log(temp);
    if (!isClicked) {
      let categoryIndex = categories.indexOf(text);
      if (categoryIndex === -1) {
        setCategories(categories.concat(text));
      }
    } else {
      // console.log(categories.indexOf(text));
      let removeCategory = categories.splice(categories.indexOf(text), 1);
      console.log(removeCategory);
      setCategories(categories);
    }
  };

  const onSubmit = async (url) => {
    try {
      if (isEmpty(videoUrl)) {
        setError("※영상 url을 입력해주세요.");
        return;
      }
      console.log(categories);
      if (isEmpty(categories)) {
        setError("※적어도 한 개 이상의 카테고리를 선택해주세요.");
        return;
      }
      if (isEmpty(password)) {
        setError("※암호를 입력해주세요.");
        return;
      }

      let videoId = getQueryStringObject(url);
      if (isEmpty(videoId)) {
        setError("※유효하지 않은 영상입니다.");
        return;
      }
      if (videoId) {
        await urlService.getVideoInfo(videoId, api_key).then((res) => {
          if (isEmpty(res)) {
            setError("※유효하지 않은 영상입니다.");
            return;
          }
          const date = format(new Date(), "yyyyMMddHHmmss");
          urlService
            .postUrl({
              url: url,
              videoId: videoId,
              title: title || res.items[0].snippet.title,
              channel: res.items[0].snippet.channelTitle,
              author: author || "익명",
              categories: categories,
              password: password,
              date: date,
              good: 0,
              bad: 0,
            })
            .then((res) => {
              alert("성공적으로 등록되었습니다.");
              window.location.reload();
            });
        });
      }
    } catch (err) {
      setError("※유효하지 않은 영상입니다.");
      console.log(err);
      return;
    }
  };
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      onSubmit(videoUrl);
    }
  };

  return (
    <React.Fragment>
      <div className="modal-overlay" onClick={close} />

      <div className="modal">
        <div className="modal-img-wrap">
          <img
            src="/register.jpg"
            alt="modal-img"
            className={`smooth-image image-${
              imageLoaded ? "visible" : "hidden"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          {/* {
            !imageLoaded && (
              <div>

              </div>
            )

          } */}
        </div>

        <div className="modal-input-wrap">
          <p className="modal-input-label">카테고리</p>
          <Category
            category={"스마트스토어"}
            onClick={(text, isClicked) => handleCategory(text, isClicked)}
          />
          <Category
            category={"쿠팡"}
            onClick={(text, isClicked) => handleCategory(text, isClicked)}
          />
          <Category
            category={"아마존셀러"}
            onClick={(text, isClicked) => handleCategory(text, isClicked)}
          />
          <Category
            category={"pdf"}
            onClick={(text, isClicked) => handleCategory(text, isClicked)}
          />
          <Category
            category={"월10만"}
            onClick={(text, isClicked) => handleCategory(text, isClicked)}
          />
          <Category
            category={"월100만"}
            onClick={(text, isClicked) => handleCategory(text, isClicked)}
          />
          <Category
            category={"월1000만"}
            onClick={(text, isClicked) => handleCategory(text, isClicked)}
          />
          <Category
            category={"프론트엔드"}
            onClick={(text, isClicked) => handleCategory(text, isClicked)}
          />
          <Category
            category={"백엔드"}
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
          <Category
            category={"취업"}
            onClick={(text, isClicked) => handleCategory(text, isClicked)}
          />
          <Category
            category={"대기업"}
            onClick={(text, isClicked) => handleCategory(text, isClicked)}
          />
          <Category
            category={"스타트업"}
            onClick={(text, isClicked) => handleCategory(text, isClicked)}
          />
          <Category
            category={"LOL"}
            onClick={(text, isClicked) => handleCategory(text, isClicked)}
          />
          <Category
            category={"기타"}
            onClick={(text, isClicked) => handleCategory(text, isClicked)}
          />
          <p className="modal-input-label">링크(주소)</p>
          <input
            className="modal-input"
            type="text"
            value={videoUrl}
            maxLength="50"
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://"
            onKeyPress={onKeyPress}
          />
          <p className="modal-input-label">제목</p>
          <input
            className="modal-input"
            type="text"
            value={title}
            maxLength="20"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="입력하지 않으면 자동으로 입력됩니다."
            onKeyPress={onKeyPress}
          />
          <p className="modal-input-label">작성자</p>
          <input
            className="modal-input"
            type="text"
            value={author}
            maxLength="10"
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="작성하지 않을 시, 익명으로 처리됩니다."
            onKeyPress={onKeyPress}
          />
          <p className="modal-input-label">암호</p>
          <input
            className="modal-input"
            type="password"
            maxLength="10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="필수 항목입니다."
            onKeyPress={onKeyPress}
          />
        </div>
        {!isEmpty(error) && (
          <div>
            <span>{error}</span>
          </div>
        )}
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
    temp = temp[1].split("&");
    return temp[0];
  }
  if (res.pathname) {
    let temp = res.pathname.split("/");
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
