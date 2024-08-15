const mongoose = require("mongoose");
const validator = require("validator")

const studentsSchema = new mongoose.Schema(
    {
        name : {
            type:String,
            required : true,
            minlength : 3
        },
        email:{
            type:String,
            required : true,
            unique:[true,"Emal already present"],
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("Invalid Error")
                }
            }

        },
        phone:{
            type : Number,
            minlength:10,
            maxlength : 10,
            required : true,
            unique : true
        },
        address : {
            type : String,
            required : true

        }
    }
)

//we will create A  new collection using the model

const Student = new mongoose.model('Student',studentsSchema)

module.exports = Student