const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const { isAuth } = require("./middleware/authMiddleware");
const Note = require("./models/listing");
const User = require("./models/User");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/my_notes")
.then(()=>console.log("Connected to MongoDB"))
.catch(err=>console.log(err));

app.use(session({
    secret: "notes_secret_key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: "mongodb://127.0.0.1:27017/my_notes"
    }),
    cookie:{
        httpOnly:true,
        maxAge:24*60*60*1000
    }
}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.get("/",(req,res)=>{
    res.redirect("/login");
});

app.get("/register",(req,res)=>{
    res.render("register");
});

app.post("/register",async(req,res)=>{
    try{
        const bcrypt = require("bcrypt");
        const {username,email,password} = req.body;

        const hashedPassword = await bcrypt.hash(password,10);

        await User.create({
            username,
            email,
            password:hashedPassword
        });

        res.redirect("/login");

    }catch(err){
        res.send("Registration Error");
    }
});

app.get("/login",(req,res)=>{
    res.render("login");
});

app.post("/login",async(req,res)=>{
    try{
        const bcrypt = require("bcrypt");

        const user = await User.findOne({
            email:req.body.email
        });

        if(!user){
            return res.send("User not found");
        }

        const match = await bcrypt.compare(req.body.password,user.password);

        if(!match){
            return res.send("Wrong password");
        }

        req.session.user = user;

        res.redirect("/notes/note");

    }catch(err){
        res.send("Login Error");
    }
});

app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.send("Error logging out");
        }
        res.redirect("/login");
    });
});

app.get("/notes/note",isAuth,async(req,res)=>{
    try{
        const notes = await Note.find({
            userId:req.session.user._id
        });

        res.render("index",{
            allNotes:notes,
            user:req.session.user
        });

    }catch(err){
        res.send("Error loading notes");
    }
});

app.post("/notes/note",isAuth,async(req,res)=>{
    try{
        await Note.create({
            title:req.body.title,
            content:req.body.content,
            userId:req.session.user._id
        });

        res.redirect("/notes/note");

    }catch(err){
        res.send("Create Note Error");
    }
});

app.post("/notes/delete/:id",isAuth,async(req,res)=>{
    try{
        await Note.deleteOne({
            _id:req.params.id,
            userId:req.session.user._id
        });

        res.redirect("/notes/note");

    }catch(err){
        res.send("Delete Error");
    }
});

app.get("/notes/edit/:id",isAuth,async(req,res)=>{
    try{
        const note = await Note.findOne({
            _id:req.params.id,
            userId:req.session.user._id
        });

        if(!note){
            return res.send("Unauthorized Access");
        }

        res.render("edit",{ note });

    }catch(err){
        res.send("Server Error");
    }
});

app.post("/notes/update/:id",isAuth,async(req,res)=>{
    try{
        await Note.updateOne(
            {
                _id:req.params.id,
                userId:req.session.user._id
            },
            {
                title:req.body.title,
                content:req.body.content
            }
        );

        res.redirect("/notes/note");

    }catch(err){
        res.send("Update Error");
    }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});