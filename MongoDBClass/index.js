const express = require('express')
const { MongoClient } = require('mongodb');
const app =express()
const PORT = process.env.PORT || 3000
const mongouri = "mongodb+srv://Yaswanth:K%40madoT%40njiro123@cluster0.ejr9djt.mongodb.net/RuneVault?retryWrites=true&w=majority&appName=Cluster0";
console.log(mongouri);
async function connect() {
    const client = new MongoClient(mongouri, { useNewUrlParser: true, useUnifiedTopology: true });
    
    try {
        await client.connect();
        console.log("Connected to the database");
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

connect();
