import React, { useState, useEffect } from "react";
import "../styles/content.scss";
import YouTube from "react-youtube";
import urlService from "../services/urlService.js";
import commentService from "../services/commentService.js";
import urlParse from "url-parse";
import axios from "axios";
import CommentForm from "./Comment";
require("dotenv").config();
const opts = {
  // height: "390",
  width: "390",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};
const isEmpty = function (value) {
  if (
    value == "" ||
    value == null ||
    value == undefined ||
    (value != null && typeof value == "object" && !Object.keys(value).length)
  ) {
    return true;
  } else {
    return false;
  }
};

// 카테고리안에 포함되어 있는지 확인하는 함수.
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

// 해당 페이지에 들어있는 콘텐츠가 맞는지 확인하는 함수.
const handlePage = (page, pageComponentLimit, index) => {
  let minIndex = pageComponentLimit * (page - 1) + 1;
  let maxIndex = pageComponentLimit * page;

  if (minIndex <= index && index <= maxIndex) {
    return true;
  } else {
    return false;
  }
};

// 한 페이지에 보여질 컨텐츠를 담은 컴포넌트.
const Contents = (props) => {
  const { videoUrls, category, page, pageChange } = props;
  const contents = [];
  console.log(category);
  let pageComponentLimit = 10;
  let pageComponent = 0;
  // 해당 페이지에 몇 개의 컨텐츠가 들어갔는지 확인합니다.
  let thisPageComponent = 0;
  // 전체 컨텐츠를 역순으로 확인합니다.
  for (let i = Object.keys(videoUrls).length - 1; i >= 0; i--) {
    // let index = Object.keys(videoUrls).length - i;
    const videoId = videoUrls[i].videoId;
    let isInCategory = handleCategory(videoUrls[i].categories, category);

    // 영상 id 가 유효하고, 해당 카테고리에 포함되어있을시, 화면에 보여줍니다.
    if (videoId && isInCategory) {
      pageComponent++;
      let isInPage = handlePage(page, pageComponentLimit, pageComponent);
      if (isInPage) {
        thisPageComponent++;
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
  }
  if (thisPageComponent === 0) {
    if (page > 1) pageChange(page);
    if (pageComponent === 0) alert("컨텐츠가 비어있습니다.");
    else alert("마지막 페이지입니다.");
  }
  return contents;
};

const Content = (props) => {
  const { id, videoId, title, channel, author } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [commentCnt, setCommentCnt] = useState(0);
  const [comments, setComments] = useState([]);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const _onReady = (event) => {
    event.target.pauseVideo();
  };
  const iframeSrc = `https://www.youtube.com/embed/${videoId}`;
  const thumbnailSrc = `http://img.youtube.com/vi/${videoId}/0.jpg`;
  useEffect(() => {
    const getComments = async () => {
      try {
        const temp = await commentService.getComment(id);
        setComments(temp);
        if (!isEmpty(comments)) {
          console.log(comments);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getComments();
  }, []);
  let cnt = 0;
  if (!isEmpty(comments)) {
    for (let i = Object.keys(comments).length - 1; i >= 0; i--) {
      console.log("dkdkdk");
      if (comments[i].content_id === id) {
        cnt++;
      }
    }
  }
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
  return (
    <>
      <div
        className="post"
        onClick={() => {
          setIsOpen(!isOpen);
          if (isCommentOpen) {
            setIsCommentOpen(!isCommentOpen);
          }
        }}
      >
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
          <div className="post-name-comment-wrap">
            <div className="post-name-wrap">
              <span>{author}</span>
            </div>
            <div
              className="post-comment-wrap"
              onClick={() => setIsCommentOpen(!isCommentOpen)}
            >
              <span>댓글 {cnt}개</span>
            </div>
          </div>
        </div>
      </div>
      {isCommentOpen && <CommentForm content_id={id} comments={comments} />}
      {isOpen && videoId && !isCommentOpen && (
        <>
          <div className="content">
            <iframe
              width="375"
              height="206"
              src={iframeSrc}
              // src={videoUrl}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              autoPlay="1"
            />

            {/* <YouTube videoId="2g811Eo7K8U" opts={opts} onReady={_onReady} /> */}
            <div className="content-btn-wrap">
              <div
                className="content-quit-btn"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span>닫기</span>
              </div>
              <div className="content-delete-btn">
                <span onClick={() => onDelete(id)}>삭제</span>
              </div>
            </div>
          </div>
          <CommentForm content_id={id} comments={comments} />
        </>
      )}
    </>
  );
};

export default Contents;
