var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
    res.render('cart', {
      items: (await Request.mongo.collection("items").find({}).toArray())
    });
  });

module.exports = router;
