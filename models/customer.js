const mongoose =  require('mongoose');
const Joi    = required('Joi');

const Customer =  new mongoose.model("Customer", new mongoose.Schema({
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
}));

function validateCustomer(customer){
    const schema = {
        name  =  Joi.string().min(5).max(50).required(),
        phone =  Joi.string().min(5).max(20).required(),
        isGold =  Joi.Boolean(),
    };
  
 return Joi.validate(customer, schema);
    
};

exports.Customer =  Customer;
exports.validate =  validateCustomer;