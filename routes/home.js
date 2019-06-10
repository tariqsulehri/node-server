const express =  require('express');
const router =  express.Router();


router.get("/", (req, res)=>{
    res.statusCode = 200;
    res.render('index.pug', {title:'My Express app', message:'Hello'});

});


module.exports = router;