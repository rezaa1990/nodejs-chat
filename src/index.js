const express = require("express");
const app = require ("./cors")
const connectDB = require('./mongodb')
const router = require("./routes/index");
const initializeSocket = require("./socket_io");

app.use(express.json());

// اتصال به دیتابیس
connectDB();

//router
app.use("/api",router);

const PORT = process.env.PORT || 3030;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Initialize socket
initializeSocket(server);
