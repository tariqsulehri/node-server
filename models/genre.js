const mongoose =  require('mongoose');
const Joi    = require('Joi');

const genreSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true,
        minLength : 2,
        maxlength : 50,
   }
});

const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(genre){
    const schema = {
        name : Joi.string().min(5).max(50).required()
    };

    return Joi.validate(genre, schema);
};

exports.genreSchema =  genreSchema; 
exports.Genre =  Genre;
exports.validate =  validateGenre;