const express = require("express");
const cors = require("cors");

const app = express();

// می‌توانید تنظیمات مربوط به CORS را در این قسمت اضافه کنید
const corsOptions = {
  origin: "*", // اجازه دسترسی به همه دامنه‌ها
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // مجموعه مجاز از متد‌ها
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

module.exports = app;
