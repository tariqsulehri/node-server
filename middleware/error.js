const winston = require('winston');

module.exports =  function(err ,req, res, next){
    //Log the exceptions
    winston.error(err.message, err);
    //error
    //warn
    //info
    //verbose
    //debug
    //silly    
    res.send(500).send('Something failed. ');
};
 