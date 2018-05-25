'use strict'
const express = require("express");
const hbars = require("express-handlebars");
const app = express();
const Album = require("./models/Album.js");


app.set('port', process.env.PORT || 3000);
app.engine(".html", hbars({extname: '.html'}));
app.set("view engine", ".html");

app.use(express.static(__dirname + '/public')); // set location for static files
app.use(require("body-parser").urlencoded({extended: true})); // parse form submissions
app.use((err, req, res, next) => {
 console.log(err);
});
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


app.post('/detail', (req, res, next) => {
    var reqTitle = new RegExp(req.body.title,"i");
   Album.findOne({ title: reqTitle }, (err, album) => {
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

app.get('/api/album/:title', (req, res, next) => {
  //  let title = req.params.title;
    console.log("where is the album");
    Album.findOne({title: req.params.title}, (err, album) => {
        if (err) return next(err);
        res.json(album);
    });
});



app.get('/api/albums', (req, res, next) => {
    Album.find({}, (err, albums) => {
        if (err) return next(err);
        res.json(albums);
    });
});



app.listen(app.get('port'), () => {
 console.log('Express started'); 
});
