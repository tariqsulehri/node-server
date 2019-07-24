const express =  require('express');
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const auth = require('../routes/auth');
const users = require('../routes/users');
const error =  require('../middleware/error');

module.exports =  function(app){
    app.use('/api/genres',genres); //mean any route will start /api/course use this router
    app.use('/api/customers' , customers); //mean any route will start /api/course use this router
    app.use('/api/movies' , movies); //mean any route will start /api/course use this router
    app.use('/api/auth' , auth); //mean any route will start /api/course use this router
    app.use('/api/users' , users); //mean any route will start /api/course use this router
    app.use(error);
    app.use(express.json());
    app.use(express.urlencoded({extended:true})); //to avoid body-parser depricated
}