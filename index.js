let http = require("http"), fs = require("fs"), qs = require("querystring"); 
let albums = require("./albums.js");
'use strict'
const express = require("express");
const hbars = require("express-handlebars");
const app = express();
app.set('port', process.env.PORT || 3000);
app.engine(".html", hbars({extname: '.html'}));
app.set("view engine", ".html");

app.use(express.static(__dirname + '/public')); // set location for static files
app.use(require("body-parser").urlencoded({extended: true})); // parse form submissions


app.get('/', (req, res) => {
 res.render('home', { 
                      albums: albums.getAll 
             });
});

app.post('/get', (req, res) => {
  console.log(req.body); // display parsed form submission
});

app.get('/detail', (req,res) => {
 let found = albums.get(req.query.title);
 res.render('detail', {
                        title: req.query.title, 
                        artist: req.query.artist, 
                        label: req.query.label, 
                        result: found,
                        albums: albums.getAll()
             });
});

app.post('/detail', (req,res) => {
 let result = albums.get(req.body.title);
 res.render('detail', {
                        title: req.body.title, 
                        artist: req.body.artist, 
                        label: req.body.label, 
                        result: result 
             });
});


app.get('/delete', (req,res) => {
 res.type('text/html')
 let result = albums.delete(req.query.title);
 res.render('delete', {
                        title: req.query.title, 
                        result: result,
                        found: res.locals.found,
                        count: albums.getCount()
             });
});


app.get('/about', (req, res) => {
 res.type('text/plain');
 res.send('About page');
});


app.use( (req,res) => {
 res.type('text/plain'); 
 res.status(404);
 res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
 console.log('Express started'); 
});

