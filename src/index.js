const express = require("express");
const app = express();
const cors = require("./cors");
const connectDB = require('./mongodb')
const router = require("./routes/index");

app.use(express.json());

//CORS
app.use(cors);

// اتصال به دیتابیس
connectDB();

//router
app.use("/api",router);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
