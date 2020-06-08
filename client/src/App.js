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
import Sorts from "./components/Sorts";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import DevRouter from "./components/DevRouter";
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
  let currentUrl = window.location.href.split("/")[3];
  let currentCategory;
  if (currentUrl === "" || currentUrl === "all") {
    currentCategory = "전체";
  } else if (currentUrl === "frontend") {
    currentCategory = "프론트엔드";
  } else if (currentUrl === "backend") {
    currentCategory = "백엔드";
  } else if (currentUrl === "web-develop") {
    currentCategory = "웹개발";
  } else if (currentUrl === "app-develop") {
    currentCategory = "앱개발";
  } else if (currentUrl === "android") {
    currentCategory = "안드로이드";
  } else if (currentUrl === "job") {
    currentCategory = "취업";
  } else if (currentUrl === "big-company") {
    currentCategory = "대기업";
  } else if (currentUrl === "startup") {
    currentCategory = "스타트업";
  } else if (currentUrl === "lol") {
    currentCategory = "LOL";
  } else if (currentUrl === "rest") {
    currentCategory = "기타";
  }

  const [imageLoaded, setImageLoaded] = useState(false);
  const [btnLoaded, setBtnLoaded] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [videoUrls, setVideoUrls] = useState({});
  const [category, setCategory] = useState(currentCategory);
  const [sort, setSort] = useState("인기 순");
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
  return (
    <div>
      <div className="logo-wrap">
        <a href="https://devtv.club">
          <img
            src="/devtv.jpg"
            alt="devtv-logo-데브티비 로고"
            className={`smooth-image image-${
              imageLoaded ? "visible" : "hidden"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        </a>
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
      <Sorts
        onClick={(text) => {
          setSort(text);
          console.log(text);
        }}
        currentSort={sort}
      />
      {!isEmpty(videoUrls) && (
        <>
          <Contents
            videoUrls={videoUrls}
            category={category}
            page={page}
            sort={sort}
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
          <img className="page-btn-left" src="/left.png" alt="left" />
        </div>
        <div className="page-btn-right-wrap" onClick={() => setPage(page + 1)}>
          <img className="page-btn-right" src="/right.png" alt="right" />
        </div>
      </div>

      <footer className="footer">
        <ins
          className="kakao_ad_area"
          // style={{ display: "none" }}
          data-ad-unit="DAN-urxgpcqve3xe"
          data-ad-width="320"
          data-ad-height="100"
        ></ins>

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
      <div>
        {/* <Link to="/test-a"></Link>
        <Link to="/frontend"></Link>
        <Link to="/backend"></Link> */}
      </div>

      <DevRouter />
    </div>
  );
};

export default App;
