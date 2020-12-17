const jwt = require ('jsonwebtoken');
const pool = require('../configuration/config');

// auth middleware here user requestd token will decoded with same secret key 
  async function verifyToken(req, res, next) {
    const token = req.headers['x-access-token']; //get token from uthe request header
    if(!token) {
      return res.status(400).send({ 'message': 'Token is not provided' });
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET); //token from user send here
      const { rows } = await pool.query('SELECT * FROM user_table WHERE uid = $1', [decoded.userId]);
      if(!rows[0]) {
        return res.status(400).send({ 'message': 'The token you provided is invalid' });
      }
      req.user = { uid: decoded.userId , isadmin:decoded.isadmin};
      var id = req.params.id;
var uid = JSON.stringify(req.user.uid);
var isEquel = uid === id;
console.log("isda",req.user.isadmin)

console.log(isEquel);
      if(isEquel || req.user.isadmin
        ) {
          console.log("hh",decoded.userId)
          console.log("isda",req.user.isadmin)

        next();

      }
      else {
          return res.json("no access")
      }
    } catch(error) {
      return res.status(400).json("error");
    }
  }

  exports.verifyToken = verifyToken;
