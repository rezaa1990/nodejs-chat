const express = require("express");
const router = express.Router();
const login = require("./login");
const register = require("./register");
const getAllUsers = require("./getallusers");
const getOldmessages = require("./getoldmessages");

router.post("/register", register);

router.post("/login", login);

router.get("/getallusers", getAllUsers);

router.get("/getoldmessages", getOldmessages);

module.exports = router;