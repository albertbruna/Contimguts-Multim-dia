/**
 * Created by boyander on 11/10/16.
 */

var express = require('express');
var Item = require('./Item.js').Item;
var app = express();

// Configure jade to be our rendering engine
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

// Enable boostrap from npm as a served static directory
app.use("/libs",express.static('node_modules/bootstrap/dist'));

// Our CSS and JS files
app.use("public",express.static('public'));


// Use 500px API to get random pictures for our products
var API500px = require('500px');
var api500px = new API500px("YecP85RjzG08DN0MqvgFa0N780dNaDmJX6iTPbYp");
/*
var pics = [
    new Item("https://mosaic02.ztat.net/vgs/media/catalog1/EV/41/1L/A0/RJ/11/EV411LA0R-J11@12.jpg","Even&Odd","39.95"),
    new Item("https://mosaic02.ztat.net/vgs/media/catalog1/M0/Q1/1L/02/MJ/11/M0Q11L02M-J11@12.jpg","Missguided","41.95"),
    new Item("https://mosaic02.ztat.net/vgs/media/catalog1/M0/Q1/1L/03/MJ/11/M0Q11L03M-J11@12.jpg","Aldo","41.95"),
    new Item("https://mosaic02.ztat.net/vgs/media/catalog1/M6/61/1L/A0/2G/11/M6611LA02-G11@12.jpg","Mai Piu Senza","89.95"),
    new Item("https://mosaic02.ztat.net/vgs/media/catalog1/M0/Q1/1L/02/FG/11/M0Q11L02F-G11@10.jpg","Even&Odd","41.95"),
    new Item("https://mosaic02.ztat.net/vgs/media/catalog1/A0/11/1L/02/4G/11/A0111L024-G11@12.jpg","Aldo","89.95"),
    new Item("https://mosaic02.ztat.net/vgs/media/catalog1/M6/61/1N/A0/NQ/11/M6611NA0N-Q11@12.jpg","Mai Piu Senza","90.99"),
    new Item("https://mosaic02.ztat.net/vgs/media/catalog1/M0/Q1/1B/00/CQ/11/M0Q11B00C-Q11@12.jpg","Missguided","41.95"),
    new Item("https://mosaic02.ztat.net/vgs/media/catalog1/RI/91/1L/02/VQ/11/RI911L02V-Q11@12.jpg","River Island","54.95")
];
*/
api500px.photos.searchByTerm('Sex', {'sort': 'created_at', 'rpp': '10','image_size':200},  function(error, results) {
    // Do something
    pics = results.photos.map(function(a){
        // Compose object to be used in show items template
        return new Item(a.image_url);
    });
});

// Render frontpage
app.get('/', function (req, res) {
    res.render('portada',{
        pics: pics
    });
});


// Server start
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
