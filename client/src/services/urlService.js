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

const urlService = {
  getUrl: async () => {
    let res = await baseAPI.get(`/api/url`);
    return res.data || [];
  },
  postUrl: async (object) => {
    console.log(object);
    await baseAPI
      .post(`/api/url`, object)
      .then((res) => {
        console.log("post");
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  deleteUrl: async (id) => {
    console.log(id);
    const res = await baseAPI.delete(`/api/url/${id}`, { params: { _id: id } });
    if (res.statusText === "No Content") {
      return true;
    } else {
      return false;
    }
  },
  updateGood: async (id, good) => {
    await baseAPI
      .put(`/api/url/${id}`, { good: good + 1 })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  updateBad: async (id, bad) => {
    await baseAPI
      .put(`/api/url/${id}`, { bad: bad + 1 })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getVideoInfo: async (videoId, api_key) => {
    let res = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${api_key}`
    );
    return res.data || [];
  },
  // getIpAddress: async () => {
  //   let res = await axios.get(`https://www.cloudflare.com/cdn-cgi/trace`);
  //   return res.request.response || [];
  // },
};

export default urlService;
