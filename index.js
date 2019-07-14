const mongoose = require('mongoose');
const express = require('express');
const joi     = require('Joi');
const app =  express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost/vidly',{useNewUrlParser:true})
   .then(()=> console.log("Connected to MongoDB"))
   .catch(err => console.error('Could not connect to MongoDB',err));

// const courseSchema =  new mongoose.Schema({
//    name   : {
//       type : String, 
//       required : true,
//       minlength : 5,
//       maxlength :255,
//       // lowercase : true,
//       uppercase :  true,
//       trim : true
//       // match : /pattren/
//    },
//    category:{
//         type : String,
//         required : true,
//         enum :  ['web', 'mobile', 'network']   
//    },

//    author : String,
//    date   : Date,
//    tags   : {
//             type:Array,
//             validate : {
//                  validator : function(v){
//                       return v.length > 0;
//                  }, 
//                  message : 'A course at least has one character'
//             }

//    },
//    date   : { type : Date, default : Date.now},
//    isPublished : Boolean,
//    price : {
//        type: Number,
//        require:true,
//        min : 10,
//        max : 200, 
//        get : v => Math.round(v),
//        set : v => Math.round(v)
//    }
// });

// const Course = mongoose.model('Course', courseSchema);

// async function createCourse(){ 
//       const course =  new Course({
//          name   : 'Node.Js Course',
//          category : 'web',
//          author : 'Tariq',
//          tags   : ['node', 'angular'],
//          isPublished : true,
//          price : 12.20,
//       });

//     try{
//        const result = await course.save();
//        console.log(result);

//     } catch (ex) {
//          console.log(ex.message);     
//     } 
// }

// createCourse();

// async function getCourses(){
//    const pageNumber = 2;
//    const pageSize   = 10;  
//    //const courses = await Course.find({author:/tariq/i, isPublished:true})
//       //Start with Tariq
//           //const courses = await Course.find({author : /^tariq/})
//       //End with Tariq
//           //const courses = await Course.find({author : /tariq$/i})
//       //Contain Tariq
//            const courses = await Course.find({author : /.*tariq.*/i})
//       //.or([{author : 'tariq'}, {isPublished : true}])
//       // .and([{author : 'tariq'}, {isPublished : true}])
//       // .skip((pageNumber -1 ) * pageSize)     
//       // .limit(pageSize)
//       .sort({name : 1})
//       .select({ name : 1 });
    
//     console.log("=====================");
//     console.log(courses);
//     console.log("=====================");
// }

// getCourses();


// async function updateCourse(id){
//      // Approach : query first
//      //const course =  await Course.findById(id);
//      //if (!course) return;

//    //   course.isPublished =  false;
//    //   course.author      =  "Another Auther";
   
//    //   course.set({
//    //        isPublished :  true,
//    //        author : 'Another Author' 
//    //   });

//    //   const result = await course.save();
//    //   console.log(result);
     
//      // findById()
//      // Modify its
//      // Save
     
//      //Approach : Update first

//      //Second Approach

//      const result =  await Course.updateOne({_id : id},{
//             $set :{
//                  author : 'Mosh',
//                  isPublished : false
//             }

//      });

//      console.log(result);
// }

// updateCourse('5d1f933c8fc179022c5682b4');

// async function deleteCourse(id){

//    const result =  await Course.deleteOne({ _id : id});
//    console.log("Deleted",result);
// }


// deleteCourse('5d1f933c8fc179022c5682b4');


//Templating Engine
app.set('view engine','pug');
app.set('views','./views') //default

//rc      is the popular package to handle configurations. -->Most popular
//config  is an other package to handle configurations.
const config = require('config');

//const dotenv = require('dotenv');
//dotenv.config();

if(!config.get('jwtPrivateKey')){
     console.log("FATAL ERROR: jwtPrivateKey not Defined");
     process.exit(1);
};

const startupDebugger =  require('debug')('app:startup');
const dbDebugger =  require('debug')('app:db');

const helmet = require('helmet'); // secure you request by setting verious header
const morgan =  require('morgan'); //log your http requests

const genres = require('./routes/genres');
app.use('/api/genres',genres); //mean any route will start /api/course use this router

const customers = require('./routes/customers');
app.use('/api/customers' , customers); //mean any route will start /api/course use this router

const movies = require('./routes/movies');
app.use('/api/movies' , movies); //mean any route will start /api/course use this router


const auth = require('./routes/auth');
app.use('/api/auth' , auth); //mean any route will start /api/course use this router

const users = require('./routes/users');
app.use('/api/users' , users); //mean any route will start /api/course use this router




app.use(express.json());
app.use(express.urlencoded({extended:true})); //to avoid body-parser depricated
                                              // with this option we can pass arrays and complex objects   
app.use(express.static("public"));  //you can put your static file here images, css, textfiles etc.
                                    //static contents server from root of the site
                                    // localhost:3200/readme.txt  
//Third Party Middlewear
app.use(helmet()); // secure you request by setting verious header

//Configurations
//console.log("Application Name : " + config.get('name'));
//console.log("Mail Server      : " + config.get('mail.host'));
//console.log("Password Mail Server : " + config.get('mail.password'));

if(app.get('env')==='development'){
    app.use(morgan('tiny')); //morgan impact performance you can use in development and some time in production
                           //for certin situations
     console.log(`NODE_ENV : ${process.env.NODE_ENV}`);
     console.log(`env : ${app.get('env')}`);
     startupDebugger('Morgan Enable...');
}

dbDebugger('Connected to the database');
//Setting up Environments Development, Production
//Some time you want to set some options on production Environment
//Some time you want to set some options on production Production

//rc      is the popular package to handle configurations. -->Most popular
//config  is an other package to handle configurations.

app.use(function(req, res, next){
//Moddilewear
   console.log('Logging',req.hostname, req.path ,req.url);
   next();   
      
});

const port =  process.env.PORT || 3200;

app.listen(port,()=>{
  console.log(`Listening on Port : ${port}`);
});



