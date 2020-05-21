import React, { useState, useEffect } from "react";
import "../styles/category.scss";

const Categories = (props) => {
  const { onClick, currentCategory, pageReset } = props;

  return (
    <div className="categories">
      <Category
        category="전체"
        onClick={(text) => {
          onClick(text);
          pageReset();
        }}
        currentCategory={currentCategory}
      />
      <Category
        category="프론트엔드"
        onClick={(text) => {
          onClick(text);
          pageReset();
        }}
        currentCategory={currentCategory}
      />
      <Category
        category="백엔드"
        onClick={(text) => {
          onClick(text);
          pageReset();
        }}
        currentCategory={currentCategory}
      />
      <Category
        category="취업"
        onClick={(text) => {
          onClick(text);
          pageReset();
        }}
        currentCategory={currentCategory}
      />
      <Category
        category="웹 개발"
        onClick={(text) => {
          onClick(text);
          pageReset();
        }}
        currentCategory={currentCategory}
      />
      <Category
        category="앱 개발"
        onClick={(text) => {
          onClick(text);
          pageReset();
        }}
        currentCategory={currentCategory}
      />
      <Category
        category="iOS"
        onClick={(text) => {
          onClick(text);
          pageReset();
        }}
        currentCategory={currentCategory}
      />
      <Category
        category="안드로이드"
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
  const { category, onClick, currentCategory } = props;
  useEffect(() => {
    if (currentCategory !== category) {
      setCategoryClick(false);
    } else {
      setCategoryClick(true);
    }
  }, [currentCategory]);
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
    <div
      className="category"
      onClick={() => {
        setCategoryClick(!categoryClick);
        onClick(category);
      }}
    >
      <span>{category}</span>
    </div>
  );
};

export default Categories;
