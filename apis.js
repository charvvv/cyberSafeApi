const mongoose = require('mongoose')
require('dotenv').config() 
// hello from saanvi
const url = process.env.url
console.log(url)
const port = process.env.port
mongoose.connect(url) .then(() => console.log("Connected to MongoDB")) .catch(err => console.error("Failed to connect to MongoDB:", err));

const schema = mongoose.Schema({
    topic: String,
    subTopic: String,
    date: String,
    body: String,
    graphic: String

})

const cyberModel = mongoose.model('blogData', schema)

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
module.exports = app;

