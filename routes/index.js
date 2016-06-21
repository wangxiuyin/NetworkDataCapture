var express = require('express'),
    router = express.Router();

router.get('/', function(req, res) {
  res.render('test');
});

module.exports = router;