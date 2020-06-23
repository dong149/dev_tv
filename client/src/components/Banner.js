import React, { useState, useEffect } from "react";
import "../styles/banner.scss";
import urlService from "../services/urlService.js";
import urlParse from "url-parse";
import { isEmpty, handleDate } from "../functions";
import { format, formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

require("dotenv").config();

const Banner = (props) => {
  const { close } = props;
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      <div className="banner">
        <span className="item"></span>
        <div className="banner-center">
          <img
            className="banner-logo"
            src="/banner-text.png"
            alt="devtv 배너"
          />
        </div>
      </div>
    </>
  );
};

export default Banner;
