const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Room = require("./../models/room");

router.post("/makeroom", async (req, res) => {
  try {
    console.log("req.body", req.body);
    let { loginedUser, selectedUser } = req.body;

    loginedUser = await User.findOne({ email: loginedUser.email });
    selectedUser = await User.findOne({ email: selectedUser.email });

    const existingRoom = await Room.findOne({
      members: { $all: [loginedUser._id, selectedUser._id] },
    });

    if (existingRoom) {
      res.json({ room: existingRoom });
    } else {
      const newRoom = new Room({
        name: `${loginedUser.email}-${selectedUser.email}`,
        members: [loginedUser._id, selectedUser._id],
      });
      await newRoom.save();
      loginedUser.rooms.push(newRoom._id);
      await loginedUser.save();
      selectedUser.rooms.push(newRoom._id);
      await selectedUser.save();
      console.log("usersss:", loginedUser, selectedUser);
      res.json({ room: newRoom });
      
    }
  } catch (error) {
    console.error("خطا در ساخت چت روم:", error);
    res.status(500).json({ error: "خطای داخلی سرور" });
  }
});

module.exports = router;
