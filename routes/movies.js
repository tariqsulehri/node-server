const {Movie, validate} = require('../models/movie');
const {Genre}   = require('./genres');
const mongoose =  require('mongoose');
const express =  require('express');
const router =  express.Router();

router.get("/", async(req, res)=>{
    const movies = await Movie.find().sort('name');  
    res.statusCode = 200;
    res.send(movies);
});

router.get("/:id", async(req, res)=>{
    let id = req.params.id;
    console.log(id);
    const movie = await Movie.findById(id); 
    if(!movie){
        res.statusCode = 404;
        res.send(movie);
        return;     
    }
     res.statusCode = 200;
     res.send(movie);
});

router.post('/', async(req, res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);  
      
    const genre =  await Genre.findById(req.body.gid); 

     let movie = new Movie({ 
          title : req.body.name,
          genre :{
                    _id: genre._id,
                   name: genre.name
          }, 
          numberInStock:req.body.numberInStock,
          dailyRentalRate:req.body.dailyRentalRate,             
     });
     
     movie =  await Movie.save()
     //res.statusCode = 200;
     res.send(movie);               
       
 });





module.exports = router;