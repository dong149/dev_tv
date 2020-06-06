import React from "react";
import Meta from "../components/Meta";

export default function Android() {
  const metaData = {
    title: "DevTV.club 데브티비 - 안드로이드",
    description:
      "개발 영상, 개발 커뮤니티, 개발자, 영상 모음, 유튜브, 추천, 사이트",
  };
  return (
    <>
      <Meta data={metaData} />
    </>
  );
}
