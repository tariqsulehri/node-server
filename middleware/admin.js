const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function auth(req, res, next){
   if(!req.user.isAdmin) return res.status(403).send('Forbidden. No access token Provided..');
   next();
}