import React from "react";
import { Helmet } from "react-helmet";

const locales = {
  ko: "ko_KR",
};
const Meta = ({ data }) => {
  const lang = locales[data.locale] || locales["ko"];
  const title = data.title;
  const description = data.description;
  const image = data.image !== undefined && `${data.image}`;
  const canonical = `https://www.your-homepage.com/${data.canonical}`;
  const type = data.type === undefined ? "website" : data.type;
  const width = data.image && (data.width || 1200);
  const height = data.image && (data.height || 630);

  return (
    <Helmet titleTemplate="%s">
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonical ? <link rel="canonical" href={canonical} /> : null}
      {image ? <link rel="image_src" href={image} /> : null}
      {image ? <meta itemprop="image" content={image} /> : null}

      <meta
        property="og:site_name"
        content="devtv.club 데브티비 - 개발 영상 공유, 추천"
      />
      <meta property="og:title" content={title} />
      {description ? (
        <meta property="og:description" content={description} />
      ) : null}
      <meta
        name="keywords"
        content="개발, 영상, 강의,개발영상, 개발강의, 윈도우, 백신,웹개발, 앱개발,소프트웨어,컴퓨터공학,안드로이드,아이폰,아마존,애플,이클립스,리액트,자바,c언어,c++,깃허브,프로그래머,보안전문가,컴공과,컴공,어도비,디자인,호스팅,스타트업,취업,외주,동빈나,노마드코더"
      />
      {canonical ? <meta property="og:url" content={canonical} /> : null}
      <meta property="og:locale" content={locales[lang]} />
      <meta property="og:type" content={type} />

      {image ? <meta property="og:image" content={image} /> : null}
      {/* {width ? <meta property="og:image:width" content={width} /> : null}
        {height ? <meta property="og:image:height" content={height} /> : null} */}
      {/* <meta property="fb:pages" content="YOUR WEB SITE" /> */}

      {/* change type of twitter if there is no image? */}
      {/* <meta name="twitter:card" content="summary_large_image" /> */}
      {/* <meta name="twitter:title" content={title} />
        {description ? (
          <meta name="twitter:description" content={description} />
        ) : null}
        {image ? <meta name="twitter:image" content={image} /> : null}
        <meta name="twitter:site" content="@YOURWEBSITE" />
        {canonical ? (
          <link rel="alternate" href={data.canonical} hreflang={lang} />
        ) : null} */}
    </Helmet>
  );
};

export default Meta;
