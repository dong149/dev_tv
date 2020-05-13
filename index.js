const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");

// create express
const app = express();

//dotenv
dotenv.config();

// body-parser
app.use(express.json());

// Configure Cors
if (process.env.NODE_ENV === "production") {
  app.use(
    cors({
      origin: "https://",
    })
  );
} else {
  app.use(
    cors({
      origin: "https://localhost:3000",
    })
  );
}

const BASE_URL = "https://openapi.naver.com";
const CLIENT_ID = process.env["CLIENT_ID"];
const CLIENT_SECRET = process.env["CLIENT_SECRET"];
const baseAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    "X-Naver-Client-Id": CLIENT_ID,
    "X-Naver-Client-Secret": CLIENT_SECRET,
  },
});
const INFO_URL = "https://m.map.naver.com";
const infoAPI = axios.create({
  baseURL: INFO_URL,
});

// api
app.get(`/data`, (req, res) => {
  const data = {
    lastname: "dl",
    firstname: "wlrma",
  };
  res.json(data);
});
app.get(`/pc`, (req, res) => {
  getPCRoomInfo(res);
});
app.get(`/info`, (req, res) => {
  getInfo(res);
});
app.get(`/cafe/info`, (req, res) => {
  getCafeInfo(res);
});

// 피시방 정보를 가져옵니다.
const getPCRoomInfo = async (res) => {
  baseAPI
    .get(
      `/v1/search/local.json?query=%EC%A3%BC%EC%8B%9D&display=10&start=1&sort=random`
    )
    .then((Data) => {
      console.log(Data);
      res.send(Data.data);
    })
    .catch((err) => {
      res.status(400).send("error");
      console.log(err);
    });
};

const getInfo = async (res) => {
  infoAPI
    .get(
      `/search2/searchMore.nhn?query=%EC%9B%90%EB%8B%B9%EC%97%AD%20%ED%94%BC%EC%8B%9C%EB%B0%A9&sm=clk&style=v5&page=1&displayCount=75&type=SITE_1`
      // `/search2/searchMore.nhn?query=%ED%94%BC%EC%8B%9C%EB%B0%A9&siteSort=1&sm=clk&page=1&displayCount=75&type=SITE_1`
    )
    .then((Data) => {
      console.log(Data);
      res.send(Data.data);
    })
    .catch((err) => {
      res.status(400).send("error");
      console.log(err);
    });
};
const getCafeInfo = async (res) => {
  infoAPI
    .get(
      `/search2/searchMore.nhn?query=%EC%9B%90%EB%8B%B9%EC%97%AD%20%EC%B9%B4%ED%8E%98&sm=clk&style=v5&page=1&displayCount=75&type=SITE_1`
      // `/search2/searchMore.nhn?query=%ED%94%BC%EC%8B%9C%EB%B0%A9&siteSort=1&sm=clk&page=1&displayCount=75&type=SITE_1`
    )
    .then((Data) => {
      console.log(Data);
      res.send(Data.data);
    })
    .catch((err) => {
      res.status(400).send("error");
      console.log(err);
    });
};

// Listen PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on PORT ${PORT}`);
});
