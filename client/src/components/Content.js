import React, { useState, useEffect } from "react";
import "../styles/content.scss";
import YouTube from "react-youtube";
import urlService from "../services/urlService.js";
import commentService from "../services/commentService.js";
import urlParse from "url-parse";
import axios from "axios";
import CommentForm from "./Comment";
import { handleDate } from "../functions";
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
  const { videoUrls, category, page, sort, pageChange } = props;
  const contents = [];
  const [contentSort, setContentSort] = useState(sort);
  const [contentUrls, setContentUrls] = useState(videoUrls);
  const [contentValid, setContentValid] = useState(false);
  // console.log(category);
  let pageComponentLimit = 7;
  let pageComponent = 0;
  // 해당 페이지에 몇 개의 컨텐츠가 들어갔는지 확인합니다.
  let thisPageComponent = 0;

  useEffect(() => {
    //인기 순으로 정렬합니다. 이 함수를 실행하지 않을 시, 최근 순으로 정렬됩니다.
    setContentSort(sort);
    // console.log(sort);
    // console.log(contentUrls);
    let temp = contentUrls.slice();
    if (sort === "인기 순") {
      temp.sort(function (a, b) {
        return a.good - a.bad < b.good - b.bad
          ? -1
          : a.good - b.bad > b.good - b.bad
          ? 1
          : 0;
      });
    } else {
      temp = videoUrls.slice();
    }
    setContentUrls(temp);
    setContentValid(true);
    // console.log(temp);
    return () => {
      // console.log("종료");
    };
  }, [sort]);
  // 전체 컨텐츠를 역순으로 확인합니다.
  if (contentValid) {
    for (let i = Object.keys(contentUrls).length - 1; i >= 0; i--) {
      // let index = Object.keys(videoUrls).length - i;
      const videoId = contentUrls[i].videoId;
      let isInCategory = handleCategory(contentUrls[i].categories, category);

      // 영상 id 가 유효하고, 해당 카테고리에 포함되어있을시, 화면에 보여줍니다.
      if (videoId && isInCategory) {
        pageComponent++;
        let isInPage = handlePage(page, pageComponentLimit, pageComponent);
        if (isInPage) {
          thisPageComponent++;
          let hotContent = false;
          if (
            page === 1 &&
            thisPageComponent >= 1 &&
            thisPageComponent <= 3 &&
            sort === "인기 순"
          ) {
            hotContent = true;
          }
          // console.log(page, thisPageComponent);
          contents.push(
            <Content
              key={contentUrls[i]._id}
              id={contentUrls[i]._id}
              videoId={videoId}
              title={contentUrls[i].title}
              channel={contentUrls[i].channel}
              author={contentUrls[i].author}
              password={contentUrls[i].password}
              date={contentUrls[i].date}
              good={contentUrls[i].good}
              bad={contentUrls[i].bad}
              hotContent={hotContent}
              component={pageComponent}
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
  }
  return contents;
};

const Content = (props) => {
  const {
    id,
    videoId,
    title,
    channel,
    author,
    password,
    date,
    good,
    bad,
    hotContent,
    component,
  } = props;
  const [postLoaded, setPostLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [commentCnt, setCommentCnt] = useState(0);
  const [comments, setComments] = useState([]);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [isCommentUpdate, setIsCommentUpdate] = useState(false);
  const [isGoodUpdate, setIsGoodUpdate] = useState(false);
  const [isBadUpdate, setIsBadUpdate] = useState(false);
  const [goodCnt, setGoodCnt] = useState(good);
  const [badCnt, setBadCnt] = useState(bad);
  const [clientHistory, setClientHistory] = useState();
  const _onReady = (event) => {
    event.target.pauseVideo();
  };
  const iframeSrc = `https://www.youtube.com/embed/${videoId}`;
  const thumbnailSrc = `https://img.youtube.com/vi/${videoId}/0.jpg`;
  useEffect(() => {
    const getComments = async () => {
      try {
        const temp = await commentService.getComment(id);
        setComments(temp);
        setIsCommentUpdate(false);
        if (!isEmpty(comments)) {
          // console.log(comments);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getComments();
  }, [isCommentUpdate]);

  useEffect(() => {
    const changeGoodBad = async () => {
      try {
        if (isGoodUpdate) {
          await urlService.updateGood(id, good);
          setGoodCnt(goodCnt + 1);
        }
        if (isBadUpdate) {
          await urlService.updateBad(id, bad);
          setBadCnt(badCnt + 1);
        }
        setIsGoodUpdate(false);
        setIsBadUpdate(false);
      } catch (err) {
        console.log(err);
      }
    };
    changeGoodBad();
  }, [isGoodUpdate, isBadUpdate]);

  let history;
  useEffect(() => {
    // localStorage 에 고객 정보를 담아 사용합니다.
    let jsonTemp = JSON.parse(localStorage.getItem("clientInfo"));
    if (jsonTemp) {
      history = jsonTemp;
    } else {
      history = { goodBad: [] };
    }
    // console.log(history);
    setClientHistory(history);
  }, [isGoodUpdate, isBadUpdate]);

  let cnt = 0;
  if (!isEmpty(comments)) {
    for (let i = Object.keys(comments).length - 1; i >= 0; i--) {
      if (comments[i].content_id === id) {
        cnt++;
      }
    }
    // setCommentCnt(cnt);
  }
  // 삭제 기능입니다.
  const onDelete = async (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      let inputPassword = window.prompt("암호를 입력하세요", "");
      if (inputPassword === password || isEmpty(password)) {
        await urlService.deleteUrl(id).then((res) => {
          if (res) {
            alert("성공적으로 삭제되었습니다.");
            window.location.reload();
          } else {
            alert("삭제 중에 오류가 발생하였습니다.");
            window.location.reload();
          }
        });
      } else {
        alert("암호가 틀렸습니다.");
        window.location.reload();
      }
    }
  };
  const dateInfo = handleDate(date);

  return (
    <>
      {/* {hotContent && (
        <div className="post-rank">
          <span>{component}</span>
        </div>
      )} */}
      {hotContent && (
        <div className="post-rank">
          <div className="post-rank-wrap">
            <span>{component}</span>
          </div>
        </div>
      )}
      <div
        onClick={() => {
          setIsOpen(!isOpen);
          if (isCommentOpen) {
            setIsCommentOpen(!isCommentOpen);
          }
        }}
        className={`post post-${postLoaded ? "visible" : "hidden"} ${
          hotContent ? "post-hot-content" : "post-content"
        }`}
        onLoad={() => setPostLoaded(true)}
      >
        <div className="thumbnail-wrap">
          <img
            className="thumbnail"
            src={thumbnailSrc}
            alt="thumbnail"
            border="0"
          />
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
            <div className="post-name-wrap">
              <span> | {dateInfo}</span>
            </div>
          </div>
          <div className="post-btn-wrap">
            <div
              className="post-comment-wrap"
              onClick={() => setIsCommentOpen(!isCommentOpen)}
            >
              <span>댓글 {cnt}개</span>
            </div>
            <div
              className="post-good-wrap"
              onClick={(e) => {
                console.log(clientHistory);
                if (!isEmpty(clientHistory.goodBad)) {
                  let temp = clientHistory.goodBad;
                  for (let i = 0; i < temp.length; i++) {
                    if (temp[i].content_id === id) {
                      alert("이미 누르셨습니다.");
                      e.stopPropagation();
                      return;
                    }
                  }
                }
                setIsGoodUpdate(true);
                let history = clientHistory;
                history.goodBad.push({
                  content_id: id,
                  choice: "good",
                });
                history.goodBad = Array.from(new Set(history.goodBad));
                localStorage.setItem("clientInfo", JSON.stringify(history));
                setClientHistory(history);
                e.stopPropagation();
              }}
            >
              <span className="post-good">좋아요 </span>
              <span className="post-good-cnt">{goodCnt}</span>
              <span>개</span>
            </div>
            <div
              className="post-bad-wrap"
              onClick={(e) => {
                // console.log(clientHistory);
                if (!isEmpty(clientHistory.goodBad)) {
                  let temp = clientHistory.goodBad;
                  for (let i = 0; i < temp.length; i++) {
                    if (temp[i].content_id === id) {
                      alert("이미 누르셨습니다.");
                      e.stopPropagation();
                      return;
                    }
                  }
                }
                setIsBadUpdate(true);
                let history = clientHistory;
                history.goodBad.push({
                  content_id: id,
                  choice: "bad",
                });
                history.goodBad = Array.from(new Set(history.goodBad));
                localStorage.setItem("clientInfo", JSON.stringify(history));
                setClientHistory(history);
                e.stopPropagation();
              }}
            >
              <span className="post-bad">싫어요 </span>
              <span className="post-bad-cnt">{badCnt}</span>
              <span>개</span>
            </div>
          </div>
        </div>
      </div>
      {isCommentOpen && (
        <CommentForm
          content_id={id}
          comments={comments}
          commentUpdate={() => setIsCommentUpdate(true)}
        />
      )}
      {isOpen && videoId && !isCommentOpen && (
        <>
          <div className="content-iframe-wrap">
            <iframe
              className="content-iframe"
              // width="375"
              // height="206"
              src={iframeSrc}
              // src={videoUrl}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              autoPlay="1"
            />
          </div>
          <div className="content">
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
          <CommentForm
            content_id={id}
            comments={comments}
            commentUpdate={() => setIsCommentUpdate(true)}
          />
        </>
      )}
    </>
  );
};

export default Contents;
