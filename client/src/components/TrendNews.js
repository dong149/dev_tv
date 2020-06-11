import React, { useState, useEffect } from "react";
import trendNewsService from "../services/trendNewsService";
import "../styles/trendNews.scss";
import { isEmpty } from "../functions";

const TrendNews = (props) => {
  const { contents } = props;
  console.log(contents);
  const newsArray = [];
  for (let i = 0; i < 10; i++) {
    if (!isEmpty(contents[i].content.url)) {
      newsArray.push(
        <News
          key={i}
          title={contents[i].content.title}
          url={contents[i].content.url}
          rank={contents[i].content.rank}
        />
      );
    }
  }

  return newsArray;
};

const News = (props) => {
  const { title, url } = props;
  console.log(title);
  return (
    <a className="news-a" href={url}>
      <div className="news">
        <span className="news-title">{title}</span>
      </div>
    </a>
  );
};

export default TrendNews;
