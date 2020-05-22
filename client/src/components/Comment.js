import React, { useState, useEffect } from "react";
import "../styles/comment.scss";
import commentService from "../services/commentService.js";
import axios from "axios";
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

const CommentForm = (props) => {
  const { content_id, comments } = props;
  // const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [author, setAuthor] = useState("");
  const onSubmit = () => {
    try {
      commentService.postComment({
        comment: comment,
        content_id: content_id,
        author: author || "익명",
      });
      alert("성공적으로 등록되었습니다.");
    } catch (err) {
      console.log(err);
    }
  };
  // useEffect(() => {
  //   const getComments = async () => {
  //     try {
  //       const temp = await commentService.getComment(content_id);
  //       setComments(temp);
  //       if (!isEmpty(comments)) {
  //         console.log(comments);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getComments();
  // }, []);

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
          />
        </div>
        <div className="comment-bottom-wrap">
          <input
            className="comment-author-input"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="작성자를 입력해주세요."
          />
          <span className="comment-text" onClick={() => onSubmit()}>
            작성하기
          </span>
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
    console.log("dkdkdk");
    if (comments[i].content_id === content_id) {
      viewComments.push(
        <Comment comment={comments[i].comment} author={comments[i].author} />
      );
    }
  }

  return viewComments;
};

const Comment = (props) => {
  const { comment, author } = props;
  return (
    <div className="comment-one">
      <div className="comment-one-header">
        <div className="comment-one-author">
          <span>{author}</span>
        </div>
        <div className="comment-one-date">
          <span>45분 전</span>
        </div>
      </div>
      <div className="comment-one-comment">
        <span>{comment}</span>
      </div>
    </div>
  );
};

export default CommentForm;
