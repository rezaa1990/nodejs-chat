const express = require("express");
const app = express();
const cors = require("./cors");
const connectDB = require('./mongodb')
const authController = require("./authController/register");

app.use(express.json());

//CORS
app.use(cors);

// اتصال به دیتابیس
connectDB();

//authController
app.use("/auth", authController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
