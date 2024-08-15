    require('dotenv').config();
const mongoose = require("mongoose");
// const uri = "mongodb://127.0.0.1/shop";

// The following characters and the space character must be converted using percent encoding if included in a username or password:

// : / ? # [ ] @ ! $ & ' ( ) * , ; = %

// For example, if your password in plain-text is p@ssw0rd'9'!, you need to encode your password as:

// p%40ssw0rd%279%27%21
// const uri = "mongodb+srv://Yaswanth:K@madoT@njiro123@cluster0.ejr9djt.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0";
const uri = "mongodb+srv://Yaswanth:K%40madoT%40njiro123@cluster0.ejr9djt.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0";
// const uri = "mongodb+srv://Yaswanth:K%40madoNezuko123@cluster0.ejr9djt.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0";
// mongoose.connect(process.env.uri)
mongoose.connect(uri)
//we need to create a //!schema //

const productSchema = new mongoose.Schema({
    name : String,
    company : String,
    price : Number,
    colors : [String],
    image : String,
    category : String,
    isFeatured : Boolean,
})
const data1 = {
    name: "Suzune hirata",
    company: "64c23350e32f4a51b19b923a",
    price: 9000,
    colors: ["#000000", "#cc6600", "#663300"],
    image: "/images/product-handbag.png",
    category: "64c2342de32f4a51b19b9250",
    isFeatured: true,
  };
//we need to craete a //!model

const Product = new mongoose.model('Product',productSchema)

const main=async()=>{
    try{
        // await Product.insertOne(data1) //!InsertOne is not a function in Mongoose
        await Product.insertMany(data1)
        const data = await Product.find({price : 3999})
        console.log(data);
    }catch(e){
        console.log(e);
    }finally{
        mongoose.connection.close()
    }
}
main();