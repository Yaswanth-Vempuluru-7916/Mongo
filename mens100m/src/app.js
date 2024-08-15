const express=require('express')
const app = express();
const port = process.env.PORT||3000;
const MensRanking = require("../src/models/mens")
require("./db/conn")
app.use(express.json())
app.post("/mens",async(req,res)=>{

    try {
        const addingMensRecords = new MensRanking(req.body)
        console.log(req.body);
        await addingMensRecords.save()
        res.status(201).send(addingMensRecords)
    } catch (e) {
        res.status(400).send(e)
    }

})
app.get("/mens",async(req,res)=>{

    try {
       const getMens = await MensRanking.find().sort({"ranking" :1})
        res.status(201).send(getMens)
        console.log(getMens);
    } catch (e) {
        res.status(400).send(e)
    }

})

app.get("/mens/:id",async(req,res)=>{

    try {
        const _id = req.params.id
       const getMen = await MensRanking.findById(_id)
        res.status(201).send(getMen)
        console.log(getMen);
    } catch (e) {
        res.status(400).send(e)
    }

})
app.patch("/mens/:id",async(req,res)=>{

    try {
        const _id = req.params.id
       const getMen = await MensRanking.findByIdAndUpdate(_id,req.body,{new : true})
        res.status(201).send(getMen)
        console.log(getMen);
    } catch (e) {
        res.status(400).send(e)
    }

})
app.delete("/mens/:id",async(req,res)=>{

    try {
        const _id = req.params.id
       const getMen = await MensRanking.findByIdAndDelete(_id)
        res.status(201).send(getMen)
        console.log(getMen);
    } catch (e) {
        res.status(400).send(e)
    }

})
app.get("/",async(req,res)=>{
    res.send("Hello Amaia Tores!!!")
})
app.listen(port,()=>{
    console.log(`connection is successful at port ${port}`);
})