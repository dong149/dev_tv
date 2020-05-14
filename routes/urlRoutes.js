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
};
