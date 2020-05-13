import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "./styles/home.scss";
import YouTube from "react-youtube";
import Content from "./components/Content";

const App = () => {
  return (
    <div>
      <div className="logo-wrap">
        <img className="logo" src="./devtv.jpg" alt="logo" />
      </div>
      <div className="btn">
        <div className="submit-btn">
          <span>등록하기</span>
        </div>
        <div className="report-btn">
          <span>신고하기</span>
        </div>
      </div>
      <Content />
      <Content />
      <Content />
      <Content />
      <Content />
    </div>
  );
};

export default App;
