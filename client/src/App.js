import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "./styles/home.scss";

const App = () => {
  return (
    <div>
      <div className="logo-wrap">
        <img className="logo" src="./devtv.jpeg" alt="logo" />
      </div>
      <div className="content">
        <span>여기는 유튜브 영상이 올라갈 곳입니다.</span>
      </div>
    </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
};

export default App;
