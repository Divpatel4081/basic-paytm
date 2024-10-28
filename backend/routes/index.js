const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const bankRouter = require("./bank");

router.use("/user" , userRouter);
router.use("/bank",bankRouter);


module.exports = router;