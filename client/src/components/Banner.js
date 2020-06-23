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
  const [image2Loaded, setImage2Loaded] = useState(false);
  return (
    <>
      <div
        className={`banner banner-${
          imageLoaded && image2Loaded ? "visible" : "hidden"
        }`}
        onLoad={() => setImage2Loaded(true)}
      >
        <span className="item"></span>
        <div className="banner-center">
          <img
            className={`banner-logo-smooth banner-logo-${
              imageLoaded && image2Loaded ? "visible" : "hidden"
            }`}
            src="/banner.png"
            alt="devtv 배너"
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      </div>
    </>
  );
};

export default Banner;
