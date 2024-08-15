require('dotenv').config();
const mongoose = require('mongoose');
const validator = require('validator')
const uri = process.env.MONGODB_URI;

mongoose.connect(uri).then(() => console.log("MongoDB Connection Successful")).catch(err => console.log(err))

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: false,
        trim: true,
        
        //   minlength :3
        minlength: [3, "Minimum 3 letters enter chey ra"]
    }
    ,
    company: String,
    price: {
        //!Custom validation ivvalante like price>=0//
        type: Number,
        validate(value) {
            if (value < 0) {
                throw new Error("Price cant be negative")
            }
        }
    },
    colors: [String],
    image: String,
    email : {
        type:String,
        required : true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                
                throw new Error("Invalid Email")
            }
        }
    },
    category: String,
    isFeatured: Boolean,
})

const data1 = {
    name: "Riselia Ray Crystalia",
    company: "64c23350e32f4a51b19b923a",
    price: 1100,
    colors: ["#000000", "#cc6600", "#663300"],
    image: "/images/product-handbag.png",
    email : "riselia.ray.crystalia@.com",
    category: "64c2342de32f4a51b19b9250",
    isFeatured: true,
};

const Product = new mongoose.model('Product', productSchema)


const main = async () => {
    try {
        // await Product.insertOne(data1) //!InsertOne is not a function in Mongoose
        await Product.insertMany([data1])
        const data = await Product.find({ price: 1100 })
        console.log(data);

        // const updateQuery = await Product.findOneAndUpdate({ name: "Leonis Death Magnus", price: 100000 }, { $set: { price: 999999 } })
        // const data1 = await Product.find({ price: 999999 })
        // console.log(data1);
    } catch (e) {
        console.log(e);
    } finally {
        mongoose.connection.close()
    }
}
main();

/*
enum ante 
for suppose web dev ante : frontend,backend ,database

! ctype:{
    type : String,
    enum : ["frontend","backend","database"]
}
*/