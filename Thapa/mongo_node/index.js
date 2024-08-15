const { MongoClient } = require("mongodb");
const uri = "mongodb://127.0.0.1";
const client = new MongoClient(uri);
const data1 = {
    name: "Designer Handbag1",
    company: "64c23350e32f4a51b19b923a",
    price: 3466,
    colors: ["#000000", "#cc6600", "#663300"],
    image: "/images/product-handbag.png",
    category: "64c2342de32f4a51b19b9250",
    isFeatured: true,
  };
  
const main = async () => {
    try {
        await client.connect();
        const db = client.db('shop');
        const collection = db.collection("products");
        await collection.insertOne(data1)
        const data = await collection.find({ price: { $eq: 3466 } }).toArray();
        console.log(data);
        return "done";
    } catch (e) {
        console.log(e);
    } finally {
        await client.close();
    }
}

main()
    .then((result) => console.log(result))
    .catch((e) => console.log(e));



// const { MongoClient } = require('mongodb');

// const uri = 'mongodb://127.0.0.1';
// const dbName = 'shop';

// const client = new MongoClient(uri);

// async function main() {
//     try {
//         await client.connect();
//         const db = client.db(dbName);
//         const collection = db.collection('products');
//         const data = await collection.find({ price: { $gt: 1200 } }).toArray();
//         console.log(data);
//         return 'done';
//     } catch (e) {
//         console.log(e);
//     } finally {
//         await client.close();
//     }
// }

// main().then(() => console.log('Process completed.')).catch((e) => console.log(e));

// const { MongoClient } = require('mongodb');

// const uri = 'mongodb://127.0.0.1';
// const dbName = 'shop';

// const client = new MongoClient(uri);

// const main = async (): Promise<String> => {
//     try {
//         await client.connect();
//         const db = client.db(dbName);
//         const collection = db.collection('products');
//         const data = await collection.find({ price: { $gt: 1200 } }).toArray();
//         console.log(data);
//         return 'done';
//     } catch (e) {
//         console.log(e);
//     } finally {
//         await client.close();
//     }
// };

// main().then(() => console.log('Process completed.'))
// .catch((e) => console.log(e))
// .finally((): Promise<void> => client.close());


// const {MongoClient} = require(id: "mongodb");

// const uri = "mongodb://127.0.0.1";

// const client = new MongoClient(uri);


// const main = async() : Promise<void> =>{
//     await client.connect();
//     const db = client.db(dbName: 'shop');
//     const collection = db.collection(name : "products")
//    const data = await collection.find({price : {$gt : 1200}}).toArray;
//    console.log(data);
//    return "done";

// }



// main().then(console.log())
// .catch((e)=>console.log(e))
// .finally((): Promise<void> => client.close());