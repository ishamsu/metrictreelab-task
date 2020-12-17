var express = require('express');
var router = express.Router();
const pool = require('../configuration/config');
const {hashPassword,comparePassword,generateToken} = require('../controller/jwtpass');

  // CREATE user
    async function createuser(req, res) {
      if (!req.body.username || !req.body.password) {
        return res.status(400).send({'message': 'Some values are missing'});
      }
      const hashPasswordd = hashPassword(req.body.password);
  
      try {
        const { rows } =  await pool.query('INSERT INTO user_table(username, password, date_created) VALUES($1, $2, NOW()) RETURNING uid,username,isadmin',[req.body.username,hashPasswordd]);
        console.log(rows)

        const token = generateToken(rows[0].uid,rows[0].isadmin);
        return res.json({ token,uid:rows[0].uid,username:rows[0].username,isadmin:rows[0].isadmin});
    } catch(error) {
        if (error.routine === '_bt_check_unique') {
          return res.status(400).send({ 'message': 'User with that username already exist' })
        }
        return res.status(400).send(error);
      }
    }

    //user login
    async function login(req, res) {
        if (!req.body.username || !req.body.password) {
          return res.status(400).send({'message': 'Some values are missing'});
        }
        try {
          const { rows } = await pool.query('SELECT * FROM user_table WHERE username = $1', [req.body.username]);
          if (!rows[0]) {
            return res.status(400).send({'message': 'The credentials you provided is incorrect'});
          }
          if(!comparePassword(rows[0].password, req.body.password)) {
            return res.status(400).send({ 'message': 'The credentials you provided is incorrect' });
          }
          const token = generateToken(rows[0].uid,rows[0].isadmin);
        //   return res.json({ token,uid:ows[0].uid });
          return res.json({ token,uid:rows[0].uid,username:rows[0].username,isadmin:rows[0].isadmin});


        } catch(error) {
          return res.status(400).send(error)
        }
    }

    //UPDATE user
    async function updateuser(req, res) {
      try {
        const updatedpassword = hashPassword(req.body.password);
        // if (req.params==req.user)
        // {
            console.log("ll",req.user.uid)
            const {id} = req.params;
            const {username} = req.body;
            const { rows } = await pool.query('UPDATE user_table SET username= $1, password=$2, date_created=NOW() WHERE uid =$3 RETURNING uid,username,isadmin', [username,updatedpassword,id]);
            return res.json({ uid:rows[0].uid,username:rows[0].username,isadmin:rows[0].isadmin });

        // }
       

// return res.status(404).send({'message': 'updated successfully'});
      } 
      catch(error) {
        return res.status(400).send(error);
      }
  }

  // DELETE USER
  async function deleteuser(req, res) {
    try {
      const { rows } = await pool.query('DELETE FROM user_table WHERE uid=$1 RETURNING uid', [req.user.uid]);
      if(!rows[0]) {
        return res.status(404).json({'message': 'user not found'});
      }
      return res.status(400).json({ 'message': 'deleted' });

    } catch(error) {
      return res.status(400).json(error);
    }
}

async function getalldata(req,res) {
    try {
    const results = await pool.query('SELECT title,body,master_id,author FROM data');
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(results.rows))
    
    }
    catch(e){
        return [];
    }
    
}

    exports.createuser = createuser;
    exports.login = login;
    exports.updateuser = updateuser;
    exports.deleteuser = deleteuser;
    exports.getalldata = getalldata;




