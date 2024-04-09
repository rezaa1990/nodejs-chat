const express = require("express");
const router = express.Router();
const User = require("../models/user"); 
const bcrypt = require("bcrypt");
// ثبت‌نام کاربر جدید
router.post("/register", async (req, res) => {
  try {
    console.log("register")
    const { username, email, password } = req.body;

    // بررسی آیا کاربر با ایمیل وارد شده قبلاً ثبت‌نام کرده یا نه
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "این ایمیل قبلاً استفاده شده است." });
    }

    // هش کردن رمز عبور
    const hashedPassword = await bcrypt.hash(password, 10);

    // ایجاد یک کاربر جدید
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // ذخیره کاربر در دیتابیس
    await newUser.save();

    res.status(201).json({ message: "کاربر با موفقیت ثبت‌نام شد." });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "مشکلی در ثبت‌نام کاربر رخ داده است." });
  }
});

module.exports = router;
