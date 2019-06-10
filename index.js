const express = require('express');
const app =  express();

//Templating Engine
app.set('view engine','pug');
app.set('views','./views') //default

//rc      is the popular package to handle configurations. -->Most popular
//config  is an other package to handle configurations.
const config = require('config');

const startupDebugger =  require('debug')('app:startup');
const dbDebugger =  require('debug')('app:db');

const helmet = require('helmet'); // secure you request by setting verious header
const morgan =  require('morgan'); //log your http requests

const courses = require('./routes/courses');
app.use('/api/courses',courses); //mean any route will start /api/course use this router

const home = require('./routes/home');
app.use('/',home); //mean any route will start /api/course use this router



app.use(express.json());
app.use(express.urlencoded({extended:true})); //to avoid body-parser depricated
                                              // with this option we can pass arrays and complex objects   
app.use(express.static("public"));  //you can put your static file here images, css, textfiles etc.
                                    //static contents server from root of the site
                                    // localhost:3200/readme.txt  

//Third Party Middlewear
app.use(helmet()); // secure you request by setting verious header


//Configurations
//console.log("Application Name : " + config.get('name'));
//console.log("Mail Server      : " + config.get('mail.host'));
//console.log("Password Mail Server : " + config.get('mail.password'));

if(app.get('env')==='development'){
    app.use(morgan('tiny')); //morgan impact performance you can use in development and some time in production
                           //for certin situations
     console.log(`NODE_ENV : ${process.env.NODE_ENV}`);
     console.log(`env : ${app.get('env')}`);
     startupDebugger('Morgan Enable...');
}

dbDebugger('Connected to the database');
//Setting up Environments Development, Production
//Some time you want to set some options on production Environment
//Some time you want to set some options on production Production

//rc      is the popular package to handle configurations. -->Most popular
//config  is an other package to handle configurations.

app.use(function(req, res, next){
//Moddilewear
   console.log('Logging',req.hostname, req.path ,req.url);
   next();   
      
});


const port =  process.env.PORT || 3200;

app.listen(port,()=>{
  console.log(`Listening on Port : ${port}`);
});



