const express = require('express');
const router = express.Router();
const passport = require("passport");


router.use('/', require('./swagger'));

router.use('/users', require('./users'));
router.use("/movies", require("./movies"));
router.use("/genres", require("./genres"));
router.use("/reviews", require("./reviews"));

router.get("/login", passport.authenticate('github'), (req, res) => {});

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
