const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

require('dotenv').config()

const exerciseModel = require('./Models/Exercise')

app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3001

//console.log(process.env.MongoDB_URL)
mongoose.connect("mongodb+srv://root1:root1@cluster0.qbxxdld.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

app.post('/insert', async (req,res)=>{
    const exName = req.body.exName
    const sets = req.body.sets
    const reps = req.body.reps
    const exercise = new exerciseModel({exName:exName, sets: sets ,reps: reps})
    try{
        await exercise.save()
        res.send("inserted data")
    }catch(err){
        console.log(err);
    }
})
app.get('/read', async (req,res)=>{
       try{
        const result = await exerciseModel.find({})
        res.send(result)
       }catch{

       }
   })
app.put('/update', async (req,res)=>{
    const newExName = req.body.newExName
    const newSets = req.body.newSets
    const newReps = req.body.newReps
    const id = req.body.id

    try{
        const updatedExName = await exerciseModel.findById(id)
        updatedExName.exName = newExName
        const updatedSets = await exerciseModel.findById(id)
        updatedSets.sets = newSets
        const updatedReps = await exerciseModel.findById(id)
        updatedReps.reps = newReps
        updatedExName.save();
        updatedSets.save();
        updatedReps.save();
        
    }catch(err){
        console.log(err);
    }
})

app.delete('/delete/:id', async(req,res)=>{
    try{
        const id = req.params.id
        await exerciseModel.findByIdAndDelete(id)
        res.send("deleted")
    }catch{

    }
})

app.listen(PORT,()=>{
    console.log(`server running in port ${PORT}`)
})