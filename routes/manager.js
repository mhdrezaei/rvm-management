const express = require("express");
const router = express.Router();
const { getMe , registerManage, loginManage } = require("../controller/manageController");

const { protect } = require("../middleware/authMiddleware");

router.route("/manage/new").post(registerManage);
router.route("/manage/login").post(loginManage);
router.get("/manage/me", protect, getMe);

module.exports = router;