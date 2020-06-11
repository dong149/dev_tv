import axios from "axios";

let BASE_URL;
if (process.env.NODE_ENV === "production") {
  BASE_URL = "https://donghoon.tk";
} else {
  BASE_URL = "http://localhost:3000";
}
const baseAPI = axios.create({
  baseURL: BASE_URL,
});

const trendNewsService = {
  getNewsID: async () => {
    let res = await axios.get(
      `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`
    );
    return res.data || [];
  },
  getNewsInfo: async (id) => {
    let res = await axios.get(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
    );
    return res.data || [];
  },
};
export default trendNewsService;
