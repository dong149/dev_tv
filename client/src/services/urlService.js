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
  deleteUrl: async (id) => {
    console.log(id);
    const res = await axios.delete(`/api/url/${id}`, { params: { _id: id } });
    if (res.statusText === "No Content") {
      return true;
    } else {
      return false;
    }
  },
  getVideoInfo: async (videoId, api_key) => {
    let res = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${api_key}`
    );
    return res.data || [];
  },
};

export default urlService;
