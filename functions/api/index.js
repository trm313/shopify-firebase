const express = require("express");
const router = express.Router();

const testRoute = require("./test");
router.use("/test", testRoute);

const authRoute = require("./auth");
router.use("/auth", authRoute);

module.exports = router;
