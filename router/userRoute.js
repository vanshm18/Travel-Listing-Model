const express = require("express");
const router = express.Router();
const passport = require("passport");

const { registerSchema, loginSchema } = require("../schemas/userSchema.js");

const User = require("../models/user.js");

const validate = require("../middlewares/validate.js");

router.post("/register" , validate(registerSchema), async (req,res) => {
    try {
        let {username, name, password, confirmPassword} = req.body;
        let newUser = new User ({
            username,
            name
        });
        await User.register(newUser, password);
        res.redirect("/login");
    }
    catch(err) {
        console.log(err);
    } 
});

router.post("/login" , validate(loginSchema), passport.authenticate("local", {
    failureRedirect: "/login"
}),  (req,res) => {
    res.redirect("/listings");
});

module.exports = router;