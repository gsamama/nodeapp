const jwt = require('jsonwebtoken');
const config = require('../config');
const hashkey = config.HASHKEY;

const auth = (req, res, next) =>{
  const token_header = req.headers.auth;
  if(!token_header) return res.status(401).send({error: 'No Token'});

  jwt.verify(token_header, hashkey, (err, decoded) => {
    if(err) return res.status(401).send({error: 'Invalid Token'});
    res.locals.auth_data = decoded;
    return next();
  });
}
module.exports = auth;