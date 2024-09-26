var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

const bulletinsPath = path.join(__dirname, 'bulletins.json');


/* GET home page. */
router.get('/', function(req, res, next) {
  let json = [];
  fs.readFile(bulletinsPath, 'utf8', (err, bulletins) => {
    
    if (!err){
      json = JSON.parse(bulletins);
    }
  });
  console.log(json)
  res.render('index', { title: 'Community Bulletin Board', posts: json});
});

router.post('/', (req, res) => {
  const  bulletin  =  req.body;
  console.log(bulletin);
  let json = [];
  fs.readFile(bulletinsPath, 'utf8', (err, bulletins) => {
    

    if (!err){
      json = JSON.parse(bulletins);
    }

    json.push(bulletin);

    fs.writeFile(bulletinsPath, JSON.stringify(json, null, 2), (err) => {
      if (err) {
          console.error('Error writing to file:', err);
          return res.status(500).send('Error saving bulletin.');
      }
        res.render('index', { title: 'Community Bulletin Board', posts: json});
    });
  });
});

module.exports = router;
