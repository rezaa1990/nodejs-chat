const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // یافتن کاربر بر اساس ایمیل
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "ایمیل یا رمز عبور نادرست است." });
    }

    // بررسی صحت رمز عبور
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "ایمیل یا رمز عبور نادرست است." });
    }

    // ایجاد توکن
    const token = jwt.sign({ userId: user._id }, "secret_key", {
      expiresIn: "1h",
    });

    // اعتبارسنجی موفقیت‌آمیز و ارسال توکن به کلاینت
    res.status(200).json({ message: "ورود موفقیت‌آمیز.", token, user });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "مشکلی در ورود کاربر رخ داده است." });
  }
});

module.exports = router;
