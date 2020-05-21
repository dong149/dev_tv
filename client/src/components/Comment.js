import React, { useState } from "react";
import "../styles/comment.scss";
import YouTube from "react-youtube";
import urlService from "../services/urlService.js";
import urlParse from "url-parse";
import axios from "axios";

const Comments = (videoId) => {
  return (
    <div className="comment">
      <div className="comment-header-wrap">
        <div className="comment-input-wrap">
          <textarea
            className="comment-input"
            // type="textarea"
            rows="3"
            placeholder="댓글을 입력해주세요."
          />
        </div>
        <div className="comment-bottom-wrap">
          <input
            className="comment-author-input"
            type="text"
            placeholder="작성자를 입력해주세요. (생략 가능)"
          />
          <span className="comment-text">작성하기</span>
        </div>
      </div>
      <Comment />
    </div>
  );
};

const Comment = () => {
  return (
    <div>
      <span>코멘트코멘트</span>
    </div>
  );
};

export default Comments;
