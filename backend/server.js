const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const port = 5000; // Change to your desired port number

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
const uri = process.env.MONGO_URL;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Create a schema of users
const UserSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  allergy:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
  },
  age:{
    type:Number,
    required:true
  },
  username:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  }
});

const User=mongoose.model('User',UserSchema);

// register user
app.post('/user/register', async (req, res) => {
  const password=req.body.password;
  const name=req.body.name;
  const email=req.body.email;
  const age=req.body.age;
  const allergy=req.body.allergy;
  const username=req.body.username;
  try{
    if(!(password && name && email && age && allergy && username)){
      res.json({"msg":"all details required"}).status(400)
      return
    }
    const foundUser=await User.findOne({username:username})
    if(foundUser){
      res.json({"msg":"user already exists"}).status(400)
      return
    }
    const newUser=new User({
      name,
      email,
      password,
      age,
      allergy,
      username
    })
    newUser.save();
    const token=jwt.sign({username:username,email:email},process.env.SECRET_KEY)
    res.json({"msg":"new user created","authToken":token}).status(200)
  }catch(e){
    res.json({"error":e.message}).status(402);
  }
  
})
// login user
app.get('/user/login',async (req,res)=>{
  const token=req.headers['authorization'];
  if(token){
    jwt.verify(token,process.env.SECRET_KEY,async (err,user)=>{
      if(err){
        res.json({"msg":"invalid token"}).status(400)
      }else{
        const foundUser=await User.findOne({username:user.username})
        res.json({"msg":"valid token","data":foundUser}).status(200)
      }
    })
  }
})

app.post('/user/login',async (req,res)=>{
  const username=req.body.username;
  const password=req.body.password;
  if(!(username && password)){
    res.json({"msg":"all details required"}).status(400)
    return
  }
  const user = await User.findOne({username:username},{password:password})
  if(user){
    const token=jwt.sign({username:username,email:user.email},process.env.SECRET_KEY)
    res.json({"msg":"login success","authToken":token,"data":user}).status(200)
  }else{
    res.json({"msg":"User not found"}).status(400)
  }
})



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});