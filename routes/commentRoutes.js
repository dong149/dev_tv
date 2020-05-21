const mongoose = require("mongoose");
const Comment = mongoose.model("comments");

module.exports = (app) => {
  app.get(`/api/comment`, async (req, res) => {
    let comments = await Comment.find();
    return res.status(200).send(comments);
  });
  // 해당 영상의 댓글을 가져옵니다.
  app.get(`/api/comment/video_id/:video_id`, async (req, res) => {
    let comments = await Comment.find({
      video_id: req.paramse.video_id,
    });
    return res.status(200).send(comments);
  });
  app.post(`/api/comment`, async (req, res) => {
    console.log(req.body);
    let comments = await Comment.create(req.body);
    return res.status(201).send({ error: false, comments });
  });
  app.delete(`/api/comment/:comment_id`, async (req, res) => {
    await Comment.remove({ _id: req.params.url_id }, (err) => {
      if (err) return res.status(500).json({ error: "databse failure" });
      res.status(204).end();
    });
  });
};
