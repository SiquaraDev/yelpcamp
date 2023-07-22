const express = require("express");
const router = express.Router();
const user = require("../controllers/user");
const catchAsync = require("../utils/catchAsync");
const { storeReturnTo } = require("../utils/middlewares");
const passport = require("passport");

router
    .route("/register")
    .get(user.renderRegisterForm)
    .post(catchAsync(user.register));

router
    .route("/login")
    .get(user.renderLoginForm)
    .post(
        storeReturnTo,
        passport.authenticate("local", {
            failureFlash: true,
            failureRedirect: "/login",
        }),
        user.login
    );

router.get("/logout", user.logout);

module.exports = router;
