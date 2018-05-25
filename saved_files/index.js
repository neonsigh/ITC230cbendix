let http = require("http"), fs = require("fs"), qs = require("querystring"); 
let albums = require("./albums.js");
'use strict'
const express = require("express");
const hbars = require("express-handlebars");
const app = express();
var albumMethods = require("./albumMethods");


app.set('port', process.env.PORT || 3000);
app.engine(".html", hbars({extname: '.html'}));
app.set("view engine", ".html");

app.use(express.static(__dirname + '/public')); // set location for static files
app.use(require("body-parser").urlencoded({extended: true})); // parse form submissions

/* 
get / path from previous express setup...

app.get('/', (req, res) => {
 res.render('home', { 
                      albums: albums.getAll 
             });
});
*/




app.get('/', (req, res, next) => {
  albumMethods.getAll().then((albums) => {
    res.render('home', { albums: albums }); 
  }).catch((err) =>{
    return next(err);
  });
});

/*
// not updated yet
app.post('/get', (req, res) => {
  console.log(req.body); // display parsed form submission
});
*/

app.get('/detail', (req, res, next) => {
 albumMethods.findOne().then((title) => {
 res.render('detail', { 'title' : title });
 }).catch((err) => {
  return next(err);
 });
});

/*
// not updated yet
app.post('/detail', (req,res) => {
 let result = albums.get(req.body.title);
 res.render('detail', {
                        title: req.body.title, 
                        artist: req.body.artist, 
                        label: req.body.label, 
                        result: result 
             });
});
*/

app.get('/delete', (req, res, next) => {
 albumMethods.delete().then((item) => {
  res.render('delete', { album : item });
 }).catch((err) => {
  return next(err);
 });
});

/*
app.get('/about', (req, res) => {
 res.type('text/plain');
 res.send('About page');
});

*/

/*
app.use( (req,res) => {
 res.type('text/plain'); 
 res.status(404);
 res.send('404 - Not found');
});
*/

app.listen(app.get('port'), () => {
 console.log('Express started'); 
});

