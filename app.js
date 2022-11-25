const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

// const cronRun = require('./cron-job');

const { config } = require("./config");

const apiRouter = require("./router/api.router");

const app = express();

_conectDB();

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(process.cwd(), "static")));

// app.use(
//   cors({
//     origin: [
//       "http://localhost:3000",
//       "https://https://deploy-preview-55--beamish-gecko-9f736e.netlify.app",
//     ],
//     methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
//   })
// );

app.use(cors());

app.use("/", apiRouter);

// eslint-disable-next-line no-unused-vars
app.use("*", (err, req, res, next) => {
  res.status(err.status || 500).json({
    customCode: err.customCode || 0,
    message: err.message || "",
  });
});

app.listen(config.PORT, () => {
  console.log(`App ${config.PORT} in progress`);
  // cronRun();
});

function _conectDB() {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.connect(config.MONGO_URL, connectionParams);
    console.log("Database connected succesfully");
  } catch (error) {
    const { connection } = mongoose;
    connection.on("error", (error) => {
      console.log(error);
    });
  }
  // mongoose.connect(config.MONGO_URL, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // });

  // const { connection } = mongoose;
  // connection.on("error", (error) => {
  //   console.log(error);
  // });
}
