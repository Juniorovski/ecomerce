
const createUsertoken = require("../helpers/create-user-token");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const getToken = require('../helpers/getToken');
const getUserByToken = require('../helpers/get-user-by-token');

require("dotenv").config();

const secret = process.env.SECRET_TOKEN;

module.exports = class UserController {

    //criar usuario
  static async register(req, res) {
    const { name, email, fone, password } = req.body;

    if (!name) {
      res.status(422).json({ msg: "Name is required!" });
      return;
    }
    if (!email) {
      res.status(422).json({ msg: "Email is required!" });
      return;
    }
    if (!fone) {
      res.status(422).json({ msg: "Fone is required!" });
      return;
    }
    if (!password) {
      res.status(422).json({ msg: "Password is required!" });
      return;
    }

    const userExists = await User.findOne({ email: email });
    if (userExists) {
      res.status(422).json({ msg: "Email ja cadastrado!" });
    }
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      fone,
      password: passwordHash,
    });

    try {
      const newUser = await user.save();
      await createUsertoken(newUser, req, res);
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  }

   //fazer login
  static async login(req, res) {
    const { email, password } = req.body;
    if (!email) {
      res.status(422).json({ msg: "Email is required!" });
      return;
    }
    if (!password) {
      res.status(422).json({ msg: "Password is required!" });
      return;
     
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(422).json({ msg: "Usuario nao existe!" });
      return;
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      res.status(422).json({ msg: "Senha Invalida" });
    }
    await createUsertoken(user, req, res);
  }

  //buscar usuario
  static async getUser(req,res){
    const name = req.body;
    const user = await User.findOne(name, '-password')
    if(!user){
        return res.status(404).json({message:"Usuário nao encontrado!"});
      }
      res.status(200).json({user});
  }

  //checka o usuario e o token
  static async checkUser(req,res){
    let currentUser;

    if(req.headers.authorization){
      const token = getToken(req);
      const decoded = jwt.verify(token,`${secret}`);
     currentUser = await User.findById(decoded.id);
    currentUser.password= undefined;
    }else{
      currentUser=null;
    }
    res.status(200).send(currentUser)
  }
   //buscar usuario por id
  static async searchUser( req,res){
    const id = req.params.id;
    const user = await User.findById(id, '-password')
    if(!user){
    return res.status(404).json({message:"Usuario nao encontrado!"})
    }
    res.status(200).json({user});
  }

 
//atualiza o user
static async update (req,res){ 
  const id = req.params.id;
  const token = getToken(req);
  const user = await getUserByToken(token);

  const {name,email,fone}= req.body;
  
  if(req.file){
    user.image = req.file.filename;
  }

  // validations
  if(!name){
    res.status(422).json({message:"Name is required!"});
    return;
  }
  
  if(!email){
    res.status(422).json({message:"Email is required"});
    return;
  }
    
  if (!fone) {
    res.status(422).json({ msg: "Fone is required!" });
    return;
  }

  // check se user existe  
  const userExists = await User.findOne({email: email});
  if(user.email !== email && userExists){
    res.status(422).json({
      message:"Por favor, utilize outro email!",
    });
    return;
  }

  // Atualiza os campos do usuário
  user.name = name;
  user.email = email;
  user.fone = fone;
  
  try {
    await User.findOneAndUpdate(
      {_id: user.id},
      {$set: user},
      {new: true}, 
    );

    res.status(200).json({message:"Usuario atualizado com sucesso!",
      imgUrl:`/uploads/${user.image}`
    });
     
  } catch (err) {
    res.status(500).json({message: err});
  }  
}

};
