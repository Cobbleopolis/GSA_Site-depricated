var express = require('express');
var router = express.Router();
var db = require('../bin/db');

/* GET home page. */
router.get('/', function (req, res, next) {
    var dbOut = "";

    db.serialize(function() {
        db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
            dbOut += row.id + ": " + row.info + " | ";
        }, function() {
            res.render('index', {title: 'Express', db: dbOut});
        });
    });

});
module.exports = router;