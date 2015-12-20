var express = require('express');
var router = express.Router();
var db = require('../bin/db');
var fs = require('fs');

var nav = [
    {
        text: 'Home',
        icon: 'home',
        link: '/'
    }
];

function groupped(list, size) {
    return list.reduce(function (prev, item, i) {
        if(i % size === 0)
            prev.push([item]);
        else
            prev[prev.length - 1].push(item);

        return prev;
    }, []);

}

/* GET home page. */
router.get('/', function (req, res, next) {
    var dbOut = {
        topSection: {},
        sections: []
    };

    db.serialize(function() {
        db.each('select rowid as id, header, content from homePage', function(err, row) {
            if (err)
                throw err;
            console.log(JSON.stringify(row));
            var info = {header: row.header, content: row.content};
            if (row.id === 1)
                dbOut.topSection = info ;
            else
                dbOut.sections.push(info);
        }, function() {
            dbOut.sections = groupped(dbOut.sections, 3);
            console.log(JSON.stringify(dbOut));
            res.render('index', {title: 'Chattahoochee GSA', nav: nav, slideshow: fs.readdirSync(__dirname + '/../public/images/slideshow'), db: dbOut});
        });
    });

});


module.exports = router;