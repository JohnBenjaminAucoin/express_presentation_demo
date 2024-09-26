var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('addPost', { title: 'Community Bulletin Board' });
});

module.exports = router;
