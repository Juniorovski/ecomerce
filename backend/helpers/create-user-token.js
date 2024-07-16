const jwt = require('jsonwebtoken');
 require('dotenv').config();


const secret = process.env.SECRET_TOKEN;
const createUsertoken = async (user,req,res)=>{
    const token = jwt.sign({
        name:user.name,
        id:user._id
    },`${secret}`)

    res.status(200).json({message:"Você esta autenticado!",
        name:user.name,
        token:token,
        userId:user._id,
    })
}

module.exports= createUsertoken;