let express = require('express');
let https = require('https');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
        res.render('index', {
          title: 'Fail Engine',
        });
});


module.exports = router;
