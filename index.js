'use strict';
const express = require("express");
const hbars = require("express-handlebars");
const app = express();
const Album = require("./models/Album");


app.set('port', process.env.PORT || 3000);
app.engine(".html", hbars({extname: '.html'}));
app.set("view engine", ".html");

app.use(express.static(__dirname + '/public')); // set location for static files
app.use(require("body-parser").urlencoded({extended: true})); // parse form submissions
app.use('/api', require('cors')()); // set Access-Control-Allow-Origin header for api route



app.get('/', (req, res, next) => {
  Album.find({}, (err, albums) => {
   if (err) return next(err);
   res.render('home', {albums: albums});
  });
});
  

app.get('/about', (req, res) => {
    res.type('text/html');
    res.render('about');
});
   

app.get('/detail', (req, res, next) => {
   Album.findOne({ title: req.query.title }, (err, album) => {
       if (err) return next(err);
       res.type('text/html');
       res.render('detail', {result: album});
   });
});


app.get('/delete', (req, res, next) => {
   Album.remove({ title: req.query.title }, (err, result) => {
       if (err) return next(err);
       Album.count((err, total) => {
           res.type('text/html');
           res.render('delete', {title: req.query.title, result: result, count: total});
   });
});
});



app.get('/add', (req, res) => {
    res.render('add');
});

 
app.get('/add', (req, res, next) => {
    let title = req.body.title;
    Album.update({title: title}, 
                 {
                    artist: req.body.artist, 
                    title: title, 
                    label: req.body.label
                 }, 
                 {upsert: true},
                 ( (err, result) => {
                    if(err) return next(err);
                    res.redirect('/');
                    })
                );
});   




// api

app.get('/api/albums/:title', (req, res, next) => {
  //  let title = req.params.title;
  console.log(req.params.title);
    Album.findOne({title: req.params.title}, (err, album) => {
        if (err) return next(err);
        if (album) {
        res.json({artist:album.artist, title:album.title, label:album.label});
        } else {
            res.json({"err": "No such entry", "query":req.params.title});
        }
    });
});



app.get('/api/albums', (req, res, next) => {
    Album.find({}, (err, albums) => {
        if (err) return next(err);
        res.json(albums);
    });
});


app.get('/api/delete/:title', (req, res, next) => {
    Album.remove({title: req.params.title}, (err, album) => {
        if (err) return next(err);
        // return number of items deleted, or error if 0
        if (album.n != 0) {
        res.json({deleted: album.n});
        } else {
            res.json({"err": "No such entry to delete"});
        }
    });
});


app.get('/api/add/:artist/:title/:label', (req, res, next) => {
    let title = req.params.title;
    Album.update({title: title}, {
                                    artist: req.params.artist, 
                                    title: title, 
                                    label: req.params.label
        
                                 }, 
                                 {upsert: true}, (err, album) => {
        if (err) return next(err);
        /* returns album id if new addition, and/or number 
         of items updated. 0 if nothing changed */
        res.json({added: album.upserted, updated: album.nModified});
    });
});


app.listen(app.get('port'), () => {
 console.log('Express started'); 
});




/* for issues booting db:
 mongod --repair
 mongod --nojournal
 */