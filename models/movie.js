const Joi =  require('joi');
const mongoose =  require('mongoose');
const {genereSchema} =  require('./genre');

const Movie =  mongoose.model('Movie', new mongoose.Schema({

    title : {
       type:  String,
       required:  true,
       trim: true,
       minlength:  5,
       maxlength: 255
   },
//    genre:{
//         type: genereSchema,
//         required : true
//    },
   numberInStock :{
       type:Number,
       require:true
   },
   dailyRentalRate:{
       type:Number,
       required:true     
   }

}));

function validateMovie(movie){
    const schema = {
        title  :  Joi.string().min(5).max(255).required(),
        gId   :  Joi.string().required(),
        numberInStock : Joi.number.min(0).require(),
        dailyRentalRate : Joi.number.min(0).require()
    };
  
 return Joi.validate(movie, schema);
    
};

exports.Movie =  Movie;
exports.validate =  validateMovie;
