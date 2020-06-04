import React, { useState, useEffect } from "react";
import "../styles/sorts.scss";

const Sorts = (props) => {
  const { onClick, currentSort } = props;
  return (
    <div className="sorts">
      <Sort
        way="인기 순"
        onClick={(text) => {
          onClick(text);
        }}
        currentSort={currentSort}
      />
      <Sort
        way="최근 순"
        onClick={(text) => {
          onClick(text);
        }}
        currentSort={currentSort}
      />
    </div>
  );
};

const Sort = (props) => {
  const { way, onClick, currentSort } = props;
  const [sortClick, setSortClick] = useState(false);
  useEffect(() => {
    if (currentSort !== way) {
      setSortClick(false);
    } else {
      setSortClick(true);
    }
  }, [currentSort]);
  return sortClick ? (
    <div
      className="sort-click"
      onClick={() => {
        setSortClick(!sortClick);
      }}
    >
      <span className="way">{way}</span>
    </div>
  ) : (
    <div
      className="sort"
      onClick={() => {
        setSortClick(!sortClick);
        onClick(way);
      }}
    >
      <span className="way">{way}</span>
    </div>
  );
};
export default Sorts;
