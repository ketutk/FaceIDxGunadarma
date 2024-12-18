// Module
require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const fs = require("fs");
const multer = require("multer");

const indexRouter = require("./routes");
const { LoadModels } = require("./libs/face-process");

const app = express();
const upload = multer();

// Middleware
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(upload.none());

LoadModels();

// Route
app.use("/api/v1", indexRouter);

// 500 error handler
app.use((e, req, res, next) => {
  console.log(e);
  res.status(e.statusCode || 500).json({
    status: false,
    message: e.message || e.error,
    data: null,
  });
});

// 404 error handler
app.use((req, res, next) => {
  res.status(404).json({
    status: false,
    message: `are you lost? ${req.method} ${req.url} is not registered!`,
    data: null,
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server ready on port ${PORT}.`));

module.exports = app;
