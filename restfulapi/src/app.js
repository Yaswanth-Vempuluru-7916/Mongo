const express = require('express');
require("./db/conn.js")
const app = express();
const port = process.env.PORT || 3000
const Student = require('./models/students.js')
const studentRouter = require("./routers/student.js")
app.use(express.json())
app.use(studentRouter)

app.listen(port, () => {
    console.log(`connection setup at ${port}`);
})
//         const createUser = await user.save();
// app.get("/",(req,res)=>{

//     res.send("Hello <h1> Roselia Rey Crystalia</h1>")
// })

//? create a new students
// app.post("/students", (req, res) => {
//     console.log(req.body);
//     const user = new Student(req.body)
//     //!promise
//     user.save().then(() => {
//         res.status(201).send(user)
//     }).catch((e) => {
//         res.status(400).send(e)
//     })
//     // res.send("Hello Leonis Magnus")
// })

//create  a new router
// const router = new express.Router()

//! we need to define the rourter

// router.get("/yash",(req,res)=>{
    //     res.send("Hello Leonis Magnus")
    // })
    
    //we need to register our router
    // app.use(router)
    
  
    // app.post("/students", async (req, res) => {
        //     try {
            //         const user = new Student(req.body);
    
    //         res.status(201).send(createUser);
    //     } catch (e) {
            
    //         res.status(400).send(e)
    //     }
    // })
    
    
    // //? read the data of the registered students
    // app.get("/students",async(req,res)=>{
    //     try{
    //         const studentsData = await Student.find()
    //         res.send(studentsData);
    //         console.log(studentsData);
    //     }catch(e){
    //         res.status(400).send(e)
    //     }
    // })
    
    
    // // get the individual student data
    // app.get("/students/:id",async(req,res)=>{
    //     try{
    //         const _id = req.params.id
    //         const studentData = await Student.findById(_id)
    //         console.log(studentData);
            
    //         if(!studentData){
    //             return res.status(404).send()
    //         }else{
    //             res.send(studentData)
    
    //         }
    
    //     }catch(e){
    //         res.status(500).send(e)
    //     }
    // })
    // app.get("/students/name/:name",async(req,res)=>{
    //     try{
    
    //         //localhost:3000/students/name/Suzune Hirata
    //         const name = req.params.name
    //         const studentData = await Student.findOne({name :name })
    //         console.log(studentData);
            
    //         if(!studentData){
    //             return res.status(404).send({message : `${name} named Student not Found`})
    //         }else{
    //             res.send(studentData)
    
    //         }
    
    //     }catch(e){
    //         res.status(500).send(e)
    //     }
    // })
    
    // app.delete("/students/:id",async(req,res)=>{
    //     try {
    //         const id = req.params.id;
    //         const deleteStudent = await Student.findByIdAndDelete(id)
    //         if(!req.params.id){
    //             return res.status(400).send()
    //         }else{
    //             res.send(deleteStudent)
    //         }
    //     } catch (e) {
    //         res.status(500).send(e)
    //         console.log(e);
    //     }
        
    // })
    
    // app.patch("/students/:id",async(req,res)=>{
    //     try {
    //         const id = req.params.id
    // const updateStudent = await Student.findByIdAndUpdate(id,req.body,{new :true})    
    // res.send(updateStudent)    
    //     } catch (e) {
    //         res.status(404).send(e)
    //         console.log(e);
            
    //     }
    // })
