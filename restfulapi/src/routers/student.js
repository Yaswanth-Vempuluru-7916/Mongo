const express = require('express')
const router = new express.Router()
const Student = require('../models/students')
//? create a new students
// router.post("/students", (req, res) => {
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
router.post("/students", async (req, res) => {
    try {
        const user = new Student(req.body);
        const createUser = await user.save();

        res.status(201).send(createUser);
    } catch (e) {

        res.status(400).send(e)
    }
})


//? read the data of the registered students
router.get("/students", async (req, res) => {
    try {
        const studentsData = await Student.find()
        res.send(studentsData);
        console.log(studentsData);
    } catch (e) {
        res.status(400).send(e)
    }
})


// get the individual student data
router.get("/students/:id", async (req, res) => {
    try {
        const _id = req.params.id
        const studentData = await Student.findById(_id)
        console.log(studentData);

        if (!studentData) {
            return res.status(404).send()
        } else {
            res.send(studentData)

        }

    } catch (e) {
        res.status(500).send(e)
    }
})
router.get("/students/name/:name", async (req, res) => {
    try {

        //localhost:3000/students/name/Suzune Hirata
        const name = req.params.name
        const studentData = await Student.findOne({ name: name })
        console.log(studentData);

        if (!studentData) {
            return res.status(404).send({ message: `${name} named Student not Found` })
        } else {
            res.send(studentData)

        }

    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete("/students/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deleteStudent = await Student.findByIdAndDelete(id)
        if (!req.params.id) {
            return res.status(400).send()
        } else {
            res.send(deleteStudent)
        }
    } catch (e) {
        res.status(500).send(e)
        console.log(e);
    }

})

router.patch("/students/:id", async (req, res) => {
    try {
        const id = req.params.id
        const updateStudent = await Student.findByIdAndUpdate(id, req.body, { new: true })
        res.send(updateStudent)
    } catch (e) {
        res.status(404).send(e)
        console.log(e);

    }
})

module.exports = router