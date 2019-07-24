const Joi     = require('Joi');
module.exports =  function(){
   joi.objectId =  require('joi-objectid')(Joi);
}