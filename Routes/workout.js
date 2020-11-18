const express = require("express");
const Workout = require('../models/workout');
const config = require('../config');
const auth = require('../middleware/auth');
const axios = require('axios'); // I picked this one to get http requests from 3rd-party 
const { Router, response } = require("express");
const routes = express.Router();

const key = config.apiKey;

// Create Workout
routes.post('/create', auth, (req, res)=>{
  try{
    const {user, type, duration, lat, lon, comments} = req.body;
    console.log(user, type, duration, lat, lon, comments);
    const url = `https://api.breezometer.com/air-quality/v2/current-conditions?lat=${lat}&lon=${lon}&key=${key}`;
    axios.get(url)
    .then(response => {
      const {data} = response.data;
      console.log(data.indexes.baqi.dominant_pollutant);
      
      const createData = {
        User: user,
        Type: type,
        Location: `${lat},${lon}`,
        Duration: duration,
        Comments: comments,
        PollutionLevel: data.indexes.baqi.dominant_pollutant
      };
      console.log(createData);
      const workout = Workout.create(createData);
      if(!workout) return res.status(400).send({result: "operation failed"});
      return res.send({workout});
    })
    .catch(error => {
      console.log(error);
      res.status(500).send({result: "Internal Server Error(500)"});
    }); 
  }
  catch(err){
    console.log(err);
  }
})

routes.get('/', auth, async (req, res)=>{
  try{
    const workoutList = await Workout.find({})
    if(!workoutList) res.status(404).send({result: 'no workout in list'});
    res.send(workoutList);
  }
  catch(err){
    console.log(err);
  }
})

routes.post('/remove', auth, async (req, res)=>{
  const { workoutId } = req.body;
  try{
    const removed = await Workout.deleteOne({"_id":workoutId});
    return res.status(202).send({result: removed});
  }
  catch(err){
    console.log(err);
  }
})

module.exports = routes;