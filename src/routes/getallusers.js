const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/getallusers", async (req, res) => {
  try {
    const allUsers = await User.find();

    // Remove password field from each user object
    const usersWithoutPassword = allUsers.map((user) => {
      const { password, ...userWithoutPassword } = user.toObject();
      return userWithoutPassword;
    });

    res.json(usersWithoutPassword);
  } catch (error) {
    console.error("خطا در بازیابی همه کاربران:", error);
    res.status(500).json({ message: "خطای داخلی سرور" });
  }
});

module.exports = router;
