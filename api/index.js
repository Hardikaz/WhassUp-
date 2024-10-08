const express=require('express');
const cors=require('cors')
const mongoose=require('mongoose')
const User=require('./models/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const cookieParser=require('cookie-parser');
const multer=require('multer')
const uploadMiddleware=multer({dest: 'uploads/'});
const fs=require('fs');
const Post=require('./models/Post');
const app=express();

app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads',express.static(__dirname+'/uploads'));

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
                res.cookie('token',token).json({
                    id:userDoc._id,
                    username,
                });
            });
         }
         else {
            res.status(400).json('wrong credentials');
         }
        //  res.json(hashedpassword);
 });

app.get('/profile',(req,res)=>{
    const {token}=req.cookies;
    jwt.verify(token,secret,{},(err,info)=>{
        if(err) throw err;
        res.json(info);
    });
    // res.json(req.cookies);
});

app.post('/logout',(req,res)=>{
    res.cookie('token','').json('ok');
})

app.post('/post',uploadMiddleware.single('file'),async (req,res)=>{
    const {originalname,path}=req.file;
    const parts=originalname.split('.');
    const ext=parts[parts.length-1];
    const newPath=path+'.'+ext;
    fs.renameSync(path,newPath);

    const {token}=req.cookies;
    jwt.verify(token,secret,{},async (err,info)=>{
        if(err) throw err;
        const {title,summary,content}=req.body;
        const postDoc=await Post.create({
            title,
            summary,
            content,
            cover:newPath,
            author:info.id,
        });
        res.json(postDoc);
    });
})

app.get('/post',async(req,res)=>{
    
    res.json(await Post.find()
    .populate('author', ['username'])
    .sort({createdAt: -1}).limit(20));
})

app.put('/post',uploadMiddleware.single('file'),async(req,res)=>
{
   let newPath=null;
   if(req.file)
   {
    const {originalname,path}=req.file;
    const parts=originalname.split('.');
    const ext=parts[parts.length-1];
    newPath=path+'.'+ext;
    fs.renameSync(path,newPath);
  }

  const {token}=req.cookies;
  jwt.verify(token,secret,{},async (err,info)=>{
    if(err) throw err;
    const {id,title,summary,content}=req.body;
    const postDoc=await Post.findById(id);
    const isAuthor=JSON.stringify(postDoc.author)===JSON.stringify(info.id);
    if(!isAuthor) {
    return res.status(400).json('you are not the author');
    }
    
    await postDoc.updateOne({
        title,
        summary,
        content,
        cover: newPath ? newPath : postDoc.cover,
    });
    // res.json({isAuthor,postDoc,info})

    res.json(postDoc);
});

})

app.get('/post/:id',async (req,res)=>{
    const {id}=req.params;
    const postDoc=await Post.findById(id).populate('author',['username']);
    res.json(postDoc);
})

app.listen(4000);

// MongoDb username:sharmahardikaz
//MongoDb password
//q9hnv6LpPsQ3uMlp
//mongodb+srv://sharmahardikaz:UHpvW12zO3eOpFDV@cluster0.gyfza.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0