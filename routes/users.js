const {User, validate} =  require('../models/user');
const express =  require('express');
//const app = express(); // will not work once you seprate routes from index.js
const router =  express.Router(); // instead this will work.

//for simplicity instead of using /api/course/:id etc
// we will use / only with all routers.

router.post('/', async(req, res)=>{
   const {error} = validate(req.body);
   if(error) return res.status(400).send(error.details[0].message);  
    
    let user = await User.findOne({email :  req.body.email})
    if(user) return res.status(400).send('User already registered.');

    let user = new User({ 
         name     : req.body.name,
         email    : req.body.email,
         password : req.body.password
    });
    user =  await User.save()
    //res.statusCode = 200;
    res.send(user);               
      
});

module.exports =  router;