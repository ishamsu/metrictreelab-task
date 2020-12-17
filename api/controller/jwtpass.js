const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 
require('dotenv').config()


   function hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8)) //return hashd passowd
  }

   function comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword); //compare password(usernn idknne) and hashd password(dbl stored) and return true or f
  }


    function generateToken(uid, isadmin) {  //jwt sign in genearte token 
    const token = jwt.sign({
      userId: uid,
      isadmin: isadmin
    },
      process.env.SECRET, { expiresIn: '7d' }
    );
    return token;
  }


exports.comparePassword=comparePassword;
exports.generateToken=generateToken;
exports.hashPassword=hashPassword;
