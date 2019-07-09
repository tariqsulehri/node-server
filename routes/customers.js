const {Customer, validate} = require('../models/customer');
const mongoose =  require('mongoose');
const express =  require('express');
const router =  express.Router();

router.get("/", async(req, res)=>{
    const customers = await Customer.find().sort('name');  
    res.statusCode = 200;
    res.send(customers);
});

router.get("/:id", async(req, res)=>{
    let id = req.params.id;
    console.log(id);
    const customer = await Customer.findById(id); 
    if(!customer){
        res.statusCode = 404;
        res.send(customer);
        return;     
    }
     res.statusCode = 200;
     res.send(customer);
});

router.post('/', async(req, res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);  
     
     let customer = new Customer({ 
           name : req.body.name, 
           isGold : req.body.isGold, 
           phone : req.body.phone 
     });
     
     customer =  await Customer.save()
     //res.statusCode = 200;
     res.send(customer);               
       
 });





module.exports = router;