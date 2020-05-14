import React, { useState } from "react";
import "../styles/register.scss";
import urlService from "../services/urlService.js";
const Modal = (props) => {
  const { close } = props;
  const [videoUrl, setVideoUrl] = useState("");
  const handleChange = (event) => {
    setVideoUrl(event.target.value);
  };
  const onSubmit = (url) => {
    try {
      urlService.postUrl({
        url: url,
        title: "dd",
        author: "dd",
      });
      alert("성공적으로 등록되었습니다.");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <React.Fragment>
      <div className="modal-overlay" onClick={close} />
      <div className="modal">
        <div className="modal-img-wrap">
          <img className="modal-img" src="./register.jpg" alt="modal-img" />
        </div>
        <p className="modal-title">등록</p>
        <p className="modal-content">모달창입니다.</p>
        <div className="modal-url-input-wrap">
          <input
            className="modal-url-input"
            type="text"
            value={videoUrl}
            onChange={handleChange}
          />
        </div>
        <div
          className="modal-register-btn-wrap"
          onClick={() => onSubmit(videoUrl)}
        >
          <span>등록하기</span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Modal;
