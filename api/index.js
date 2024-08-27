const express=require('express');
const cors=require('cors')
const mongoose=require('mongoose')
const User=require('./models/User')
const bcrypt=require('bcrypt')
const app=express();

app.use(cors());
app.use(express.json());

//mongoose.connect('mongodb+srv://sharmahardikaz:UHpvW12zO3eOpFDV@cluster0.gyfza.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
mongoose.connect('mongodb://localhost:27017/BlogSpot');

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
 const userDoc=await User.findOne({username});
 res.json(userDoc);
});

app.listen(4000);

// MongoDb username:sharmahardikaz
//MongoDb password
//q9hnv6LpPsQ3uMlp
//mongodb+srv://sharmahardikaz:UHpvW12zO3eOpFDV@cluster0.gyfza.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0