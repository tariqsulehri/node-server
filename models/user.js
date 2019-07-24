const mongoose =  require('mongoose');
const Joi    = require('Joi');
const jwt =  require('jsonwebtoken');

const userSchema= new mongoose.Schema({
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
});

userSchema.methods.getrateAuthToken = function() {
    const token = jwt.sign({_id:this._id}, 'node_secureJwtKey') // config.get('jwtPrivateKey'));
    return token;
}

const User =  new mongoose.model("User", userSchema); 

function validateUser(user){
    const schema = {
        email    :  Joi.string().min(5).max(255).required().email(),
        name     :  Joi.string().min(5).max(50).required(),
        password :  Joi.string().min(5).max(255).required()
    };
  
    return Joi.validate(user, schema);
    
};

exports.User =  User;
exports.validate =  validateUser;