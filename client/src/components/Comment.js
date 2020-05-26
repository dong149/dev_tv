import React, { useState, useEffect } from "react";
import "../styles/comment.scss";
import commentService from "../services/commentService.js";
import axios from "axios";
import { format, formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
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
// 언제 게시되었는지를 알려주는 함수입니다.
const handleDate = (date) => {
  if (isEmpty(date)) {
    return "";
  }
  let dyear = parseInt(date.substring(0, 4));
  let dmonth = parseInt(date.substring(4, 6)) - 1;
  let dday = parseInt(date.substring(6, 8));
  let dhour = parseInt(date.substring(8, 10));
  let dmin = parseInt(date.substring(10, 12));
  let dsec = parseInt(date.substring(12, 14));

  let res = formatDistanceToNow(
    new Date(dyear, dmonth, dday, dhour, dmin, dsec),
    { includeSeconds: true, locale: ko }
  );

  let reslen = res.length;
  if (res[reslen - 1] === "만") {
    if (res[1] === "초") {
      res = res.substring(0, 2);
    } else {
      res = res.substring(0, 3);
    }
  }
  let result = res + " 전";
  return result;
};

const CommentForm = (props) => {
  const { content_id, comments, commentUpdate } = props;
  // const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState("");
  const onSubmit = () => {
    try {
      if (isEmpty(comment)) {
        setError("※글이 입력되지 않았습니다.");
        return;
      }
      const date = format(new Date(), "yyyyMMddHHmmss");
      commentService.postComment({
        date: date,
        comment: comment,
        content_id: content_id,
        author: author || "익명",
      });
      commentUpdate();
      setComment("");
      alert("성공적으로 등록되었습니다.");
    } catch (err) {
      console.log(err);
    }
  };
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className="comment">
      <div className="comment-header-wrap">
        <div className="comment-input-wrap">
          <textarea
            className="comment-input"
            // type="textarea"
            rows="3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="댓글을 입력해주세요."
            onKeyPress={onKeyPress}
          />
        </div>
        <div className="comment-bottom-wrap">
          <input
            className="comment-author-input"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="작성자를 입력해주세요."
            onKeyPress={onKeyPress}
          />
          <span className="comment-text" onClick={() => onSubmit()}>
            작성하기
          </span>
          {!isEmpty(error) && (
            <div className="comment-error-text">
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>
      {!isEmpty(comments) && (
        <Comments comments={comments} content_id={content_id} />
      )}
    </div>
  );
};
const Comments = (props) => {
  const { comments, content_id } = props;
  const viewComments = [];

  for (let i = Object.keys(comments).length - 1; i >= 0; i--) {
    if (comments[i].content_id === content_id) {
      viewComments.push(
        <Comment
          comment={comments[i].comment}
          author={comments[i].author}
          date={comments[i].date}
        />
      );
    }
  }

  return viewComments;
};

const Comment = (props) => {
  const { comment, author, date } = props;
  const dateInfo = handleDate(date);
  return (
    <div className="comment-one">
      <div className="comment-one-header">
        <div className="comment-one-author">
          <span>{author}</span>
        </div>
        <div className="comment-one-date">
          <span>{dateInfo}</span>
        </div>
      </div>
      <div className="comment-one-comment">
        <span>{comment}</span>
      </div>
    </div>
  );
};

export default CommentForm;
