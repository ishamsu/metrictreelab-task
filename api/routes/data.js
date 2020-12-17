const pool = require('../configuration/config');

async function createdatabymasterid(req, res) {
    try {
    const {title,body,author} = req.body
    const {id}=req.params
    const results = await   pool.query("INSERT INTO  data (title,body,master_id,author,date_created) values ($1, $2,$3,$4,NOW())", [title,body,id,author]);
    res.status(201).json({status: 'success', message: 'sadanam added successfully ✅'})
    }
    catch(e){
        return [];
    }
}


async function getdatabymasterid(req, res) { 
    try {
        const {id} = req.params;
    const results = await   pool.query('select * from data where master_id=$1', [id]);
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(results.rows))

    
    }
    catch(e){
        return [];
        
    }
}
async function getuserbymasterid(req, res) { 
    try {
        const {id} = req.params;
    const results = await   pool.query('select uid,username,isadmin from user_table where uid=$1', [id]);
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(results.rows))

    
    }
    catch(e){
        return [];
        
    }
}

exports.createdatabymasterid = createdatabymasterid;
exports.getdatabymasterid = getdatabymasterid;
exports.getuserbymasterid = getuserbymasterid;