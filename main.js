const express = require("express");
const app = express();
const path = require("path");
const {v4 : uuidv4} = require("uuid");
const methodOverride = require("method-override");

let port = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));


let dbs = [
   {
      id: uuidv4(),
      name: "Ashish Kumar",
      content: "I am an actor,voice over artist. I live in Delhi-NCR and i also do gym",
   },
   {
      id: uuidv4(),
      name: "Ayush Raj",
      content: "Hi Everyone, This Webpage is created to check my knowledge of HTML, CSS, JS and Backend Tech Stack.",
   },
   {
      id: uuidv4(),
      name: "Rahul Kumar",
      content: "Hloo goiss, my name is Rahul. Naam to suna hi hoga. By Profession I am a HR in FAANG Company.",
   },
];

 app.listen(port, ()=>{
    console.log(`Listening to the Port: ${port}`);
 });

 app.get("/blog", (req,res)=>{
    res.render("home.ejs" , {dbs});
 });

 app.get("/blog/new", (req,res)=>{
   res.render("new.ejs");
 });

 app.post("/blog", (req,res)=>{
   let {name, content} = req.body;
   let id = uuidv4();
   dbs.push({id,name,content});
   res.redirect("/blog");
 });

 app.get("/blog/view/:id", (req,res)=>{
   let {id} = req.params;
   let ob = dbs.find((p)=> id === p.id);
   res.render("view.ejs", {ob});
 });
 
 app.get("/blog/edit/:id", (req,res)=>{
   let {id} = req.params;
   let ob = dbs.find((p)=> id === p.id);
   res.render("edit.ejs", {ob});
 });

 app.patch("/blog/:id", (req,res)=>{
   let {id} = req.params;
   let name = req.body.name;
   let content = req.body.content;
   let ob = dbs.find((p)=> id === p.id);
   if(name == ""){
      name = ob.name;
   }
   else{
      ob.name = name;
   }
   ob.content = content;
   res.redirect("/blog");
 });

 app.delete("/blog/delete/:id", (req,res)=>{
   let {id} = req.params;
   dbs = dbs.filter((p)=> id !== p.id);
   res.redirect("/blog");
 });
