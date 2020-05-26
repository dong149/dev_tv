const mongoose = require("mongoose");
const Url = mongoose.model("urls");
const Comment = mongoose.model("comments");

module.exports = (app) => {
  app.get(`/api/url`, async (req, res) => {
    let urls = await Url.find();
    return res.status(200).send(urls);
  });
  app.post(`/api/url`, async (req, res) => {
    console.log(req.body);
    let urls = await Url.create(req.body);
    return res.status(201).send({ error: false, urls });
  });
  // url (post) 를 삭제할 시, 해당하는 댓글들도 함께 삭제합니다.
  app.delete(`/api/url/:url_id`, async (req, res) => {
    await Url.remove({ _id: req.params.url_id }, (err) => {
      if (err) return res.status(500).json({ error: "databse failure" });
      res.status(204).end();
    });
    await Comment.remove({ content_id: req.params.url_id }, (err) => {
      if (err) return res.status(500).json({ error: "databse failure" });
      res.status(204).end();
    });
  });
};
