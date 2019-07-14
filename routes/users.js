//Joi Password complexity.
const jwt =  require('jsonwebtoken');
const config =  require('config');

const {User, validate} =  require('../models/user');
//const bodyParser = require('body-parser');
const express =  require('express');
const _ =  require("lodash");
const bcrypt =  require('bcrypt');
//const app = express(); // will not work once you seprate routes from index.js
const router =  express.Router(); // instead this will work.


//for simplicity instead of using /api/course/:id etc
// we will use / only with all routers.
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json({ type: 'application/*+json' }));

router.post('/', async(req, res)=>{
   const {error} = validate(req.body);
   if(error) return res.status(400).send(error.details[0].message);  
    
    let user = await User.findOne({email:req.body.email});
    if(user) return res.status(400).send('User already registered.');

    console.log("Post Method Called..");
    console.log(req.body);

    user = new User(_.pick(req.body, ['name','email','password']));
   
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save()
    const token = jwt.sign({_id:user._id}, config.get('jwtPrivateKey'));
    res.statusCode = 200;
    res.header('x-auth-token',token).send(_.pick(user,['_id','name','email','password']));     

});

module.exports =  router;