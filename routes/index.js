const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
  //#swagger.tags = ['Hello World]
  res.send("Hi, this is my CSE341 Project 2👋");
});

router.use('/users', require('./users'));
router.use("/activities", require("./activities"));

module.exports = router;
