  
    function log(req, res, next){
    //Moddilewear
       console.log('Logging',req.hostname, req.path ,req.url);
       next();   
          
    };

    module.exports = log;
    