const loginUser = require("../Controllers/UserController/loginUser");
const registerUser = require("../Controllers/UserController/registerUser");

const router = require("express").Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;