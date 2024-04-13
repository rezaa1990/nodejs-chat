const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Room = require("../models/room");

router.get("/getoldmessages", async (req, res) => {
  try {
    const { loginedUserEmail } = req.query;
    console.log("loginedUser",loginedUserEmail);

    const user = await User.findOne({ email: loginedUserEmail });
    if (!user) {
      return res.status(404).json({ message: "چنین کاربری وجود ندارد" });
    }

    const loginedUserRooms = user.rooms;
    const rooms = await Room.find({ _id: { $in: loginedUserRooms } });
    res.json(rooms);
    console.log("rooms:", rooms);
  } catch (error) {
    console.error("خطا:", error);
    res.status(500).json({ message: "خطای داخلی سرور" });
  }
});

module.exports = router;
