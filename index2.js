
const express = require('express');
const startupDebugger =  require('debug')('app:startup');
const winston = require('winston');
const app =  express();

require('./startup/logging')();
require('./startup/routes')(app); 
require('./startup/config')(app);
require('./startup/db')();
require('./startup/validation')();

app.set('view engine','pug');
app.set('views','./views') //default

process.on('unhandledRejection', (ex)=>{
   // console.log('WE GOT AN UN-HANDLED PROMISE REJECTION');
   // winston.error(ex.message, ex);
   // process.exit(1);
   throw ex;
});

if(app.get('env')==='development'){
     app.use(morgan('tiny')); //morgan impact performance you can use in development and some time in production
                           //for certin situations
     console.log(`NODE_ENV : ${process.env.NODE_ENV}`);
     console.log(`env : ${app.get('env')}`);
     startupDebugger('Morgan Enable...');

app.use(function(req, res, next){
//Moddilewear
   console.log('Logging',req.hostname, req.path ,req.url);
   next();   
      
});

const port =  process.env.PORT || 3200;

app.listen(port,()=>{
  winston.info(`Listening on Port : ${port}`);
});

}
