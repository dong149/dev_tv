const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// models
require("./models/Url");

// create express
const app = express();

//dotenv
dotenv.config();

// const BASE_URL = "https://www.googleapis.com/youtube/v3/videos/";
// const KEY = process.env["GOOGLE_API_KEY"];
// const baseAPI = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     "X-Riot-Token": TOKEN,
//   },
// });
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

// mongoose
mongoose.Promise = global.Promise;
mongoose
  .connect(
    process.env.MONGODB_URI || `mongodb://localhost:27017/node-react-starter`,
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }
  )
  .then(
    () => {
      console.log("database connected😎");
    },
    (error) => {
      console.log("Database could not be connected : " + error);
    }
  );

// body-parser
// app.use(express.json());
app.use(bodyParser.json());

// corsOptions = {
//   origin: "https://league-of-legend-service.herokuapp.com",
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };
// app.use(cors(corsOptions));

//IMPORT ROUTES
const urlRoutes = require("./routes/urlRoutes")(app);

app.use(express.static("client/build"));

if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Listen PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on PORT ${PORT}`);
});
