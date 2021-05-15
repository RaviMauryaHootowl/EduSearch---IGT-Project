// const instModel = require('./models/InstModel');
const express = require('express');
const mongoose = require('mongoose');
// import mongoose from 'mongoose';
const Inst = require('./models/InstModel');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

// Connect DB
const dbLink = `${process.env.MONGO_SECRET}`;
console.log(dbLink);
mongoose.connect(dbLink, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
}, () => {
  console.log("DB connected!");
});

if(process.env.NODE_ENV=== 'production'){
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.get("/api/search", async (req, res) => {
  let {q, loc, board, category} = req.query;
  if(loc === undefined){ loc = ""}
  if(board === undefined){ board = ""}
  if(category === undefined){ category = ""}
  console.log(q + " " + loc + " " + board + " " + category);
  const combinedQ = [q, loc, board, category].join(" ").trim(); 
  console.log(combinedQ); 
  let instsList = [];

  if(combinedQ === ""){
    instsList = await Inst.find({});
  }else{
    instsList = await Inst.aggregate([
      {
        '$search': {
          'text': {
            'query': `${combinedQ}`, 
            'path': [
              'name', 'address', 'email', 'board','category'
            ]
          }
        }
      }
    ]);
  }
  // instsList = await Inst.find({});
  
  console.log(instsList.length);
  res.send({"code": "OK", "value": instsList});
});

app.get("/api/getInst", async (req, res) => {
  const {instID} = req.query;
  let instData;
  // instsList = await Inst.find({});
  try{
    instData = await Inst.findById(instID);
    res.send({"code": "OK", "value": instData});
  }catch(e){
    res.send({"code": "NOPE", "value": {}}).status(404);
  }  
})


app.listen(PORT, () => {
  console.log("Server started at PORT : ", PORT);
});

// update node veersion