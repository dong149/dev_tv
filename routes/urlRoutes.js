const mongoose = require("mongoose");
const Url = mongoose.model("urls");

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
  app.delete(`/api/url/:url_id`, async (req, res) => {
    await Url.remove({ _id: req.params.url_id }, (err) => {
      if (err) return res.status(500).json({ error: "databse failure" });
      res.status(204).end();
    });
  });
};
