const express =  require('express');
//const app = express(); // will not work once you seprate routes from index.js
const router =  express.Router(); // instead this will work.


//for simplicity instead of using /api/course/:id etc
// we will use / only with all routers.

const courses =[
    {id:1, title : 'course-1'},
    {id:2, title : 'course-2'},
    {id:3, title : 'course-3'},
    {id:4, title : 'course-4'},
]


router.get("/", (req, res)=>{
    res.statusCode = 200;
    res.send(courses);
});

router.get("/:id", (req, res)=>{
    let id = req.params.id;
    
    const course =  courses.find(x => x.id === parseInt(req.params.id));
    
    if(!course){
        res.statusCode = 404;
        res.send('course not found');
        return;     
    }
    
     res.statusCode = 200;
     res.send(course);
    
});

router.post('/', (req, res)=>{
    const course = {
                      id : courses.length + 1, 
                      name : req.body.name
                   };

    courses.push(course);
    res.statusCode = 200;
    res.send(course);               

});

router.put('/', (req, res)=>{

    var course = courses.find(x => x.id === parseInt(req.params.id));
    
    if(!course){
        res.statusCode = 404;
        res.send('course not found');
        return;  
    }

    course.title = "Edited Course";

    res.statusCode = 200;
    res.send(course);               

});


router.delete('/:id', (req, res)=>{

    var course = courses.find(x => x.id === parseInt(req.params.id));
    
    if(!course){
        res.statusCode = 404;
        res.send('course not found');
        return;  
    }
 
    const index =  courses.indexOf(course);
    courses.splice(index,1);
    res.statusCode = 200;
    res.send(course);               

});

module.exports =  router;