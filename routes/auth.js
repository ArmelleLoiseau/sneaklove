const express = require("express");
const router = new express.Router();

const User = require("./../models/User");
const bcrypt = require("bcrypt");
const protectAuthRoute = require("../middlewares/protectAuthRoute");

// - display the signup form
router.get("/signup", protectAuthRoute, (req, res) => {
  res.render("signup");
});

// - display the signin form
router.get("/signin", protectAuthRoute, (req, res) => {
  res.render("signin");
});

// - logout
router.get("/logout", (req, res, next) => {
  // console.log(req.session.currentUser);
  req.session.destroy(function (err) {
    // cannot access session here anymore
    // console.log(req.session.currentUser);
    res.redirect("/signin");
  });
});

// - register a new user
router.post("/signup", async (req, res, next) => {
  // console.log('--- --- route /signup');
  try {
    // get the user's input
    const newUser = { ...req.body };
    // console.log('req.body', newUser);
    // check if all mandatory fields are present
    if (
      !newUser.name ||
      !newUser.lastname ||
      !newUser.email ||
      !newUser.password
    ) {
      // console.log('one or more fields missing');
      req.flash("error", "All fields are mandatory");
      res.redirect("/signup");
    } else {
      // check if email exists in db
      const foundUser = await User.findOne({ email: newUser.email });
      // console.log('foundUser', foundUser);
      if (foundUser) {
        // console.log('before redirect to signup because email already registered')
        req.flash("error", "Email already registered");
        res.redirect("/signup");
      } else {
        // hash + salt the password
        const hashedPwd = bcrypt.hashSync(newUser.password, 10);
        newUser.password = hashedPwd;
        // console.log(`hashedPwd`, hashedPwd);
        // create the new user in db
        await User.create(newUser);
        req.flash(
          "success",
          "Congrats! You are now registered. Please, sign in."
        );
        res.redirect("/signin");
      }
    }
  } catch (error) {
    // handling errors on form fields
    // console.log("signup - error: ", error);
    let errorMessage = "";
    for (field in error.errors) {
      errorMessage += error.errors[field].message + "\n";
    }
    req.flash("error", errorMessage);
    res.redirect("/signup");
  }
});

// - signin a registered user
router.post("/signin", async (req, res, next) => {
  // console.log('--- --- route /signin');
  try {
    // get the user's input
    const { email, password } = req.body;
    // console.log('req.body', email, password);
    // check if all mandatory fields are present
    if (!email || !password) {
      // console.log('one or more fields missing');
      req.flash("error", "All fields are mandatory");
      res.redirect("/signin");
    } else {
      // find the user in db
      const foundUser = await User.findOne({ email: email });
      // console.log('foundUser', foundUser);
      if (!foundUser) {
        // console.log('before redirect to signup because email unknown')
        req.flash("error", "Email unknown, please register instead.");
        res.redirect("/signup");
      } else {
        // compare the passwords via bcrypt
        const isPwdOk = bcrypt.compareSync(password, foundUser.password);
        // console.log(`isPwdOk`, isPwdOk);
        if (!isPwdOk) {
          // password problem
          req.flash("error", "Invalid credentials");
          res.redirect("/signin");
        } else {
          // email & password ok, ready to finish authentication
          // transform the foundUser into an object
          const foundUserObject = foundUser.toObject();
          // delete the password for more safety
          delete foundUserObject.password;
          // create the currentUser in session
          req.session.currentUser = foundUserObject;
          // display success message & redirect
          req.flash("success", "Successfully logged in.");
          res.redirect("/dashboard");
        }
      }
    }
  } catch (error) {
    // handling errors on form fields
    // console.log("signin - error: ", error);
    let errorMessage = "";
    for (field in error.errors) {
      errorMessage += error.errors[field].message + "\n";
    }
    req.flash("error", errorMessage);
    res.redirect("/signin");
  }
});

module.exports = router;
