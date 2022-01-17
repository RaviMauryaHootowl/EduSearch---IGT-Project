// const instModel = require('./models/InstModel');
const express = require('express');
const Pool = require('pg').Pool;
const path = require('path');
// import mongoose from 'mongoose';
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

// Connect to Postgres
const pool = new Pool({
  user: "postgres",
  password: "8521",
  database: "sdb_course"
});

// Get All Institutes
app.get("/api/all", async (req, res) => {
  try{
    const allPoints = await pool.query("SELECT * FROM points");
    res.json(allPoints.rows);
  }catch(err){
    console.log(err);
  }
});


// Search for Institutes
app.get("/api/search", async (req, res) => {
  let {q, loc, board, category} = req.query;
  const locobj = JSON.parse(loc)
  console.log(req.query);
  let locQuery = "";
  let boardQuery = "";
  let categoryQuery = "";
  if(category != undefined && category !== ""){
    categoryQuery = `AND (LOWER(points.name) LIKE '%${category.toLowerCase()}%' OR LOWER(points.amenity) LIKE '%${category.toLowerCase()}%')`;
  }
  console.log(locobj)
  if(board === undefined){ board = ""}
  if(category === undefined){ category = ""; categoryQuery = "";}

  if(locobj['value'] !== ""){
    console.log("asdf")
    console.log(locobj['value'])
    const x = locobj.x; const y = locobj.y;
    const limit = 300;
    const searchRes = await pool.query(`select name, amenity, board, rating, points.gid from points, states where ST_Intersects((points.geom),(states.geom)) AND states.name_1 = '${locobj['value']}' AND LOWER(points.name) LIKE '%${q.toLowerCase()}%' order by points.rating desc limit ${limit};`);
    
    res.send({"code": "OK", "value": searchRes.rows});
    return;
  }

  try{
    const searchRes = await pool.query(`SELECT * FROM points WHERE LOWER(points.name) LIKE '%${q.toLowerCase()}%'` + categoryQuery + ' order by points.rating desc limit 200');
    res.send({"code": "OK", "value": searchRes.rows});
  }catch(err){
    console.log(err);
  }
})

// Get Single Institute
app.get("/api/getInst", async (req, res) => {
  const {gid} = req.query;
  let instData;
  // instsList = await Inst.find({});
  try{
    instData = await pool.query(`SELECT *, ST_ASGEOJSON(geom) AS geojson FROM points WHERE points.gid = ${gid}`);
    res.send({"code": "OK", "value": instData.rows[0]});
  }catch(e){
    res.send({"code": "NOPE", "value": {}}).status(404);
  }
});

// Recommend nearby institutes
app.get("/api/recommend", async (req, res) => {
  let {x, y, limit} = req.query;
  if(limit === undefined) {limit = 10;}
  try {
    instData = await pool.query(`select ST_Distance((points.geom)::geography,(ST_GeomFromText('POINT(${x} ${y})',4326))::geography)/1000 as dist_km,* from points order by dist_km limit ${limit};`)
    res.send({"code": "OK", "value": instData.rows});
  } catch (err) {
    res.send({"code": "NOPE", "value": {}}).status(404);
  }
})

// Check for production
if(process.env.NODE_ENV=== 'production'){
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log("Server started at PORT : ", PORT);
});
