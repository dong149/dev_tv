import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./styles/home.scss";
import YouTube from "react-youtube";
import Contents from "./components/Content";
import Modal from "./components/Register";
import Categories from "./components/Categories";
import axios from "axios";
import urlService from "./services/urlService.js";

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

const App = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [videoUrls, setVideoUrls] = useState({});

  useEffect(() => {
    const getVideoUrls = async () => {
      try {
        const temp = await urlService.getUrl();
        setVideoUrls(temp);
        if (!isEmpty(videoUrls)) console.log(videoUrls);
      } catch (err) {
        console.log(err);
      }
    };
    getVideoUrls();
  }, []);
  return (
    <div>
      <div className="logo-wrap">
        <img className="logo" src="./devtv.jpg" alt="logo" />
      </div>
      {isOpenModal && (
        <>
          <Modal close={() => setIsOpenModal(!isOpenModal)} />
        </>
      )}
      <div className="btn">
        <div
          className="submit-btn"
          onClick={() => setIsOpenModal(!isOpenModal)}
        >
          <span>등록하기</span>
        </div>
        <div className="report-btn">
          <span>신고하기</span>
        </div>
      </div>
      <Categories />
      {!isEmpty(videoUrls) && (
        <>
          <Contents videoUrls={videoUrls} />
        </>
      )}
    </div>
  );
};

export default App;
