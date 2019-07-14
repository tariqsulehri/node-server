const config =  require('config');
//Joi Password complexity.
const {User} =  require('../models/user');
//const bodyParser = require('body-parser');
const express =  require('express');
const _ =  require("lodash");
const bcrypt =  require('bcrypt');
//const app = express(); // will not work once you seprate routes from index.js
const router =  express.Router(); // instead this will work.
const Joi    =  require('joi');

//for simplicity instead of using /api/course/:id etc
// we will use / only with all routers.
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json({ type: 'application/*+json' }));

router.post('/', async(req, res)=>{
   const {error} = validate(req.body);

   if(error) return res.status(400).send(error.details[0].message);  
    
        let user = await User.findOne({email:req.body.email});
        if(!user) return res.status(400).send('Invalid email or password.');
          
     const validPassword =  await bcrypt.compare(req.body.password, user.password)
     if(!validPassword){
        return res.status(400).send('Invalid email or password.');
     } 
     
     const token = user.genrateAuthToken();
     res.send(token);

});

function validate(req){
    const schema = {
        email    :  Joi.string().min(5).max(255).required().email(),
        password :  Joi.string().min(5).max(255).required()
    };
  
    return Joi.validate(req, schema);
    
};



module.exports =  router;