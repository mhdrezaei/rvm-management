const express = require("express");
const router = express.Router();
const { getMe , registerManage, loginManage } = require("../controller/manageController");

const { protect } = require("../middleware/authMiddleware");

router.post("/manage/new", registerManage);
router.route("/manage/login").post(loginManage);
router.get("/manage/me", protect, getMe);

module.exports = router;