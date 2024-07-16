const jwt = require('jsonwebtoken');
const getToken = require('../helpers/getToken');
require('dotenv').config();

secret = process.env.SECRET_TOKEN;

const checkToken = (req,res,next)=>{

    if(!req.headers.authorization){
        return res.status(401).json({message:"Acesso Negado!"});
    }

    const token = getToken(req);

    if(!token){
        return res.status(401).json({message:"Acesso Negado!"});
    }
    try{
        const verified = jwt.verify(token,`${secret}`);
        req.user = verified;
        next();
    }catch(error){
        return res.status(400).json({message:"Token invalido!"});
    }
}

module.exports = checkToken;