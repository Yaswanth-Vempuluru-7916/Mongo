const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs');
require("./db/conn")
const port = process.env.PORT || 3000 

const Register = require("./")
const static_path = path.join(__dirname,"../public")
const template_path = path.join(__dirname,"../templates/views")
const partial_path = path.join(__dirname,"../templates/partials")
// console.log(__dirname);
app.use(express.static(static_path)) 
// --->  index.html file kosam vethukuthaadi first
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.set("view engine","hbs")
app.set("views",template_path)
hbs.registerPartials(partial_path)

app.get("/",(req,res)=>{
    // res.sendFile(path.join(static_path, "index.html"));
    res.render("index")

})

app.get("/register",(req,res)=>{
    res.render("register")
})
app.post("/register",async(req,res)=>{
   try{
    console.log(req.body.firstname);
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;
    if(password===confirmpassword){
        const registerEmployee = new Register({
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            email : req.body.email,
            gender : req.body.gender,
            phone : req.body.phone,
            age : req.body.age,
            password : req.body.firstname,
            confirmpassword : req.body.confirmpassword,
           
        })

        const registered = await registerEmployee.save()
        res.status(201).render('index')
    }else{
        res.send("Password not matching")
    }

   }catch(e){
    res.status(400).send(e)
   }
})

app.listen(port,()=>{
    console.log(`Server is running at port no ${port}`);
})