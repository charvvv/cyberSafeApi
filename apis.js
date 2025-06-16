const mongoose = require('mongoose')
require('dotenv').config()
const url = "mongodb+srv://charvig:Xx0Wjo6nAGDfw8dp@cyberdata.dhzkj.mongodb.net/"
console.log(url)
const port = 5000
mongoose.connect(url) .then(() => console.log("Connected to MongoDB", url)) .catch(err => console.error("Failed to connect to MongoDB:", err));

const schema = mongoose.Schema({
    topic: String,
    subTopic: String,
    date: String,
    body: String,
    graphic: String

})

const cyberModel = mongoose.model('blogdatas', schema)

const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())


app.post("/api/upload", async (req, res) => { let data = cyberModel(req.body); 
let result = await data.save();
res.send(result); }); 
app.get("/api/get", async (req, res) => { let data = await cyberModel.find(); 
res.send(data); }); 
app.put("/api/update/:_id", async (req, res) => { let result = await cyberModel.updateOne(req.params, { $set: req.body }); 
res.send(result); }); app.delete("/api/delete/:_id", async (req, res) => { console.log(req.params); 
let result = await cyberModel.deleteOne(req.params); 
res.send(result); });


app.listen(port, ()=>{console.log('app is running on port 5000')})

