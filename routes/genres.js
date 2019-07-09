const {Genre, validate} =  require('../models/genre');
const express =  require('express');
//const app = express(); // will not work once you seprate routes from index.js
const router =  express.Router(); // instead this will work.

//for simplicity instead of using /api/course/:id etc
// we will use / only with all routers.

router.get("/", async (req, res)=>{
    const genres = await Genre.find({}); 
    console.log(genres);
    // res.statusCode = 200;
    res.send(genres);
});

router.get("/:id", async(req, res)=>{
    let id = req.params.id;
    console.log(id);
    const genre = await Genre.findById(id); 
    if(!genre){
        res.statusCode = 404;
        res.send(genre);
        return;     
    }
    
     res.statusCode = 200;
     res.send(genre);
    
});

router.post('/', async(req, res)=>{
   const {error} = validate(req.body);
   if(error) return res.status(400).send(error.details[0].message);  
    
    let genre = new Genre({  name : req.body.name  });
    genre =  await Genre.save()
    //res.statusCode = 200;
    res.send(genres);               
      
});

router.put('/:id', async (req, res)=>{
    
    const genre = await  Genre.findByIdAndUpdate(req.params.id, {name : req.body.name }, {
                new : true
    });
    
    if(!genre){
        res.statusCode = 404;
        res.send('Genres not found...');
        return;  
    }

    res.statusCode = 200;
    res.send(genre);               

});


router.delete('/:id', async(req, res)=>{

    const genre = await  Genre.findByIdAndRemove(req.params.id);

if(!genre){ 
    res.statusCode = 404;
    res.send(genre);
    return;
}

res.statusCode = 200;
res.send(genre);               
});

module.exports =  router;