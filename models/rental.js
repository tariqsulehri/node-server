const Joi = require('joi');
const mongoose = require('mongoose');

const Rental = mongoose.model('Rental', new mongoose.Schema({
      // we have not imported schema because may be schema contain 50 properties 
      customer:{
          type: new mongoose.Schema({
                name:{
                    type : String,
                    required : true,
                    minLength : 2,
                    maxlength : 50,
            },
            isGold:{
                    type :  Boolean,
                    required : true,
            },
            phone:{
                type: String,
                require : true,
                minlength : 5,
                maxlength: 50,
            }
            }),
            require:true,
       },

       movie:{
           type : new  mongoose.Schema({
            title : {
                type :  String,
                required :  true,
                trim : true,
                minlength :  5,
                maxlength : 255
            },
         
            dailyRentalRate:{
                type:Number,
                required:true     
            }

          }),
           required :  true, 
       },

       dateOut :{ 
             type:Date,
             require:true,
             default : Date.now
       },

       dateReturned:{ 
            type:Date,
            require:true,
            default : Date.now
      },
      rentalFee:{
          type:Number,
          min:0,
      }



}));

function validateRental(rental){
    const schema = {
        customerId =  Joi.string().required(),
        movieId: Joi.string().required()
    };

    return Joi.validate(genre, schema);
};

exports.Rental =  Rental;
exports.validate =  validateGenre;