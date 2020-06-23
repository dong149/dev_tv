import React, { useState, useEffect } from "react";
import "../styles/register.scss";
import urlService from "../services/urlService.js";
import urlParse from "url-parse";
import { isEmpty, handleDate } from "../functions";
import { format, formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

require("dotenv").config();

const Official = (props) => {
  const { close } = props;
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      <div className="modal-overlay" onClick={close} />

      <div className="modal">
        <div className="modal-img-wrap">
          <img
            src="/register.jpg"
            alt="modal-img"
            className={`smooth-image image-${
              imageLoaded ? "visible" : "hidden"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      </div>
    </>
  );
};

export default Official;
