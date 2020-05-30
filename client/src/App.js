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
  const [imageLoaded, setImageLoaded] = useState(false);
  const [btnLoaded, setBtnLoaded] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [videoUrls, setVideoUrls] = useState({});
  const [category, setCategory] = useState("전체");
  const [page, setPage] = useState(1);
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
  // const test = async () => {
  //   await urlService.getIpAddress().then((res) => {
  //     console.log("personInfo", res);
  //   });
  // };
  // test();

  return (
    <div>
      <div className="logo-wrap">
        <img
          src="./devtv.jpg"
          alt="logo"
          className={`smooth-image image-${imageLoaded ? "visible" : "hidden"}`}
          onLoad={() => setImageLoaded(true)}
        />
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
      <Categories
        onClick={(text) => {
          setCategory(text);
          console.log(text);
        }}
        pageReset={() => {
          setPage(1);
        }}
        currentCategory={category}
      />
      {!isEmpty(videoUrls) && (
        <>
          <Contents
            videoUrls={videoUrls}
            category={category}
            page={page}
            pageChange={(page) => setPage(page - 1)}
          />
        </>
      )}
      <div
        className={`page-btn btn-${btnLoaded ? "visible" : "hidden"}`}
        onLoad={() => setBtnLoaded(true)}
      >
        <div
          className="page-btn-left-wrap"
          onClick={() => {
            if (page > 1) setPage(page - 1);
          }}
          onLoad={() => setBtnLoaded(true)}
        >
          <img className="page-btn-left" src="./left.png" alt="left" />
        </div>
        <div className="page-btn-right-wrap" onClick={() => setPage(page + 1)}>
          <img className="page-btn-right" src="./right.png" alt="right" />
        </div>
      </div>

      <footer className="footer">
        <p>
          왼손잡이들&nbsp;&nbsp;|&nbsp;&nbsp;
          <a className="footer-info" href="./devtv.club.html">
            개인정보처리방침
          </a>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <a className="footer-info" href="mailto:donghoon149@gmail.com">
            메일 보내기
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;
