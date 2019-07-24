const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');


module.exports =  function(){

    winston.ExceptionHandler(
        new winston.transports.File({filename : 'uncaughtException.log'}))

    const files = new winston.transports.File({
            filename : 'logfile.log'
    });
      
    const dbwinston = new winston.transports.MongoDB({
                 db:'mongodb://localhost/vidly'
    });
            
}