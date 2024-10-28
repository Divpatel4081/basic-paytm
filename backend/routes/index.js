const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const bankRouter = require("./bank");

router.get("/user" , userRouter);
router.get("/bank",bankRouter);

module.exports = router;