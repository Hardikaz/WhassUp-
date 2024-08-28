const express=require('express');
const cors=require('cors')
const mongoose=require('mongoose')
const User=require('./models/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const app=express();

app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());

//mongoose.connect('mongodb+srv://sharmahardikaz:UHpvW12zO3eOpFDV@cluster0.gyfza.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
mongoose.connect('mongodb://localhost:27017/BlogSpot');

const secret='awdfsgsthdrndtndns';

app.post('/register',async (req,res)=>{
    const {username,password}=req.body;
    const hashedpassword=await bcrypt.hash(password,10)
    try{
        const userDoc=await User.create({username,password:hashedpassword});
        res.json(userDoc);
    }
     catch(e)
    {
        res.status(400).json(e);
    }
   
});

app.post('/login',async (req,res)=>{
        const {username,password}=req.body;
        //  const existingUser=await User.findOne({username})
        //  const matchpassword=await bcrypt.compare(password,existingUser.password)
            
            // if(matchpassword===true) alert("User found")
            // else 
            // alert("User not found")
        
         const userDoc=await User.findOne({username});
         const hashedpassword=await bcrypt.compare(password,userDoc.password);

         if(hashedpassword)
         {
            jwt.sign({username,id:userDoc._id},secret,{},(err,token)=>
            {
               if(err) throw err;
                res.cookie('token',token).json('ok');
            });
         }
         else {
            res.status(400).json('wrong credentials');
         }
        //  res.json(hashedpassword);
 });

app.listen(4000);

// MongoDb username:sharmahardikaz
//MongoDb password
//q9hnv6LpPsQ3uMlp
//mongodb+srv://sharmahardikaz:UHpvW12zO3eOpFDV@cluster0.gyfza.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0