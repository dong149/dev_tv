import axios from "axios";

const urlService = {
  getUrl: async () => {
    let res = await axios.get(`/api/url`);
    return res.data || [];
  },
  postUrl: async (object) => {
    console.log(object);
    await axios
      .post(`/api/url`, object)
      .then((res) => {
        console.log("post");
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  getVideoInfo: async (videoId, api_key) => {
    let res = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${api_key}`
    );
    return res.data || [];
  },
};

export default urlService;
