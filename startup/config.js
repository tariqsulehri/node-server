const config = require('config');
const dbDebugger =  require('debug')('app:db');
const bodyParser = require('body-parser');
const helmet = require('helmet'); // secure you request by setting verious header
const morgan =  require('morgan'); //log your http requests

module.exports =  function(app){
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(express.urlencoded({extended:true})); //to avoid body-parser depricated

    app.use(express.static("public"));  //you can put your static file here images, css, textfiles etc.
                                    //static contents server from root of the site
                                    // localhost:3200/readme.txt  
                                    //Third Party Middlewear
    app.use(helmet()); // secure you request by setting verious header


    if(!config.get('jwtPrivateKey')){
        throw new Error("FATAL ERROR: jwtPrivateKey not Defined");
    };


}