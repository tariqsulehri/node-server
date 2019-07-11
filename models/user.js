const mongoose =  require('mongoose');
const Joi    = required('Joi');

const user =  new mongoose.model("User", new mongoose.Schema({
    name:{
         type : String,
         required : true,
         minLength : 5,
         maxlength : 20,
    },
    email:{
        type: String,
        require : true,
        minlength : 5,
        maxlength: 50,
        unique : true,
    },
    password:{
        type: String,
        require : true,
        minlength : 5,
        maxlength: 1024,
    }
}));

function validateUser(user){
    const schema = {
        name     =  Joi.string().min(5).max(50).required(),
        email    =  Joi.string().min(5).max(255).required().email();
        password =  Joi.string().min(5).max(255).required()
    };
  
    return Joi.validate(user, schema);
    
};

exports.User =  User;
exports.validate =  validateUser;