import React, { useState } from "react";
import "../styles/category.scss";

const Categories = () => {
  return (
    <div className="categories">
      <Category category="전체" />
      <Category category="프론트엔드" />
      <Category category="백엔드" />
      <Category category="취업" />
      <Category category="웹 개발" />
      <Category category="앱 개발" />
      <Category category="iOS" />
      <Category category="안드로이드" />
    </div>
  );
};
const Category = (props) => {
  const [categoryClick, setCategoryClick] = useState(false);
  const { category } = props;
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
      }}
    >
      <span>{category}</span>
    </div>
  );
};

export default Categories;
