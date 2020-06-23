import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/category.scss";

const Categories = (props) => {
  const { onClick, currentCategory, pageReset } = props;

  return (
    <div className="categories">
      <Category
        category="전체"
        text="all"
        onClick={(text) => {
          onClick(text);
          pageReset();
        }}
        currentCategory={currentCategory}
      />
      <Category
        category="스마트스토어"
        text="smartstore"
        onClick={(text) => {
          onClick(text);
          pageReset();
        }}
        currentCategory={currentCategory}
      />
      <Category
        category="쿠팡"
        text="coupang"
        onClick={(text) => {
          onClick(text);
          pageReset();
        }}
        currentCategory={currentCategory}
      />
      <Category
        category="아마존셀러"
        text="amazon"
        onClick={(text) => {
          onClick(text);
          pageReset();
        }}
        currentCategory={currentCategory}
      />
      <Category
        category="pdf"
        text="pdf"
        onClick={(text) => {
          onClick(text);
          pageReset();
        }}
        currentCategory={currentCategory}
      />
      <Category
        category="월10만"
        text="ten"
        onClick={(text) => {
          onClick(text);
          pageReset();
        }}
        currentCategory={currentCategory}
      />
      <Category
        category="월100만"
        text="hundred"
        onClick={(text) => {
          onClick(text);
          pageReset();
        }}
        currentCategory={currentCategory}
      />
      <Category
        category="월1000만"
        text="thousand"
        onClick={(text) => {
          onClick(text);
          pageReset();
        }}
        currentCategory={currentCategory}
      />
      <Category
        category="프론트엔드"
        text="frontend"
        onClick={(text) => {
          onClick(text);
          pageReset();
        }}
        currentCategory={currentCategory}
      />
      <Category
        category="백엔드"
        text="backend"
        onClick={(text) => {
          onClick(text);
          pageReset();
        }}
        currentCategory={currentCategory}
      />
      <Category
        category="웹 개발"
        text="web-develop"
        onClick={(text) => {
          onClick(text);
          pageReset();
        }}
        currentCategory={currentCategory}
      />
      <Category
        category="앱 개발"
        text="app-develop"
        onClick={(text) => {
          onClick(text);
          pageReset();
        }}
        currentCategory={currentCategory}
      />
      <Category
        category="iOS"
        text="ios"
        onClick={(text) => {
          onClick(text);
          pageReset();
        }}
        currentCategory={currentCategory}
      />
      <Category
        category="안드로이드"
        text="android"
        onClick={(text) => {
          onClick(text);
          pageReset();
        }}
        currentCategory={currentCategory}
      />
      <Category
        category="취업"
        text="job"
        onClick={(text) => {
          onClick(text);
          pageReset();
        }}
        currentCategory={currentCategory}
      />
      <Category
        category="대기업"
        text="big-company"
        onClick={(text) => {
          onClick(text);
          pageReset();
        }}
        currentCategory={currentCategory}
      />
      <Category
        category="스타트업"
        text="startup"
        onClick={(text) => {
          onClick(text);
          pageReset();
        }}
        currentCategory={currentCategory}
      />
      <Category
        category="LOL"
        text="lol"
        onClick={(text) => {
          onClick(text);
          pageReset();
        }}
        currentCategory={currentCategory}
      />
      <Category
        category="기타"
        text="rest"
        onClick={(text) => {
          onClick(text);
          pageReset();
        }}
        currentCategory={currentCategory}
      />
    </div>
  );
};

const Category = (props) => {
  const [categoryClick, setCategoryClick] = useState(false);
  const { category, text, onClick, currentCategory } = props;
  useEffect(() => {
    if (currentCategory !== category) {
      setCategoryClick(false);
    } else {
      setCategoryClick(true);
    }
  }, [currentCategory]);
  let link = `/${text}`;
  return categoryClick ? (
    <div
      className="category-click"
      onClick={() => {
        setCategoryClick(!categoryClick);
      }}
    >
      <span>{category}</span>
    </div>
  ) : (
    <Link to={link} style={{ textDecoration: "none", color: "black" }}>
      <div
        className="category"
        onClick={() => {
          setCategoryClick(!categoryClick);
          onClick(category);
        }}
      >
        <span>{category}</span>
      </div>
    </Link>
  );
};

export default Categories;
