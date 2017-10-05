var express = require('express'),
    app = express(),
    port = 3000,
    mongoose = require( 'mongoose' ),
    Schema = mongoose.Schema;

mongoose.connect( 'mongodb://localhost/blogroll', {
    useMongoClient: true
});

var BlogSchema = new Schema({
    autor: String,
    title: String,
    url: String
});

mongoose.model( 'Blog', BlogSchema );

var Blog = mongoose.model( 'Blog' ),
    blog = new Blog({
        autor: 'Ricardo',
        title: 'Ricardo\'s blog',
        url: 'http://ricardoblog.com'
    });

    blog.save();

app.use( express.static( __dirname + '/public') );

app.listen( port );
console.log( 'server on' + port );
