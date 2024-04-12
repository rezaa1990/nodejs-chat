const express = require("express");
const router = express.Router();
const login = require("./login");
const register = require("./register");
const getAllUsers = require("./getallusers");
const makeRoom = require("./makeroom");

router.post("/register", register);

router.post("/login", login);

router.get("/getallusers", getAllUsers);

router.post("/makeroom", makeRoom);

module.exports = router;