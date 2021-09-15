const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const schedule = require('./models/schedule')
const cors = require('cors')
const { route } = require('express/lib/application')
require('dotenv/config')

// setting up router
const router = express.Router()

// setup express app
const app = express()
app.use(express.static('assets'))
app.use(cors())

// using express to parse json data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// api paths using router
// documentation page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/assets/home.html'));
})

// get all races
router.get('/api', async (req,res) => {
    try {
        const races = await schedule.find()
        res.json(races)
    } catch(err) {
        res.status(400)
    }
})

// get races based on id
router.get('/api/:id', async (req,res) =>{
    try {
        const race = await schedule.findById(req.params.id)
        res.json(race)
    } catch(err) {
        res.status(400)
    }
})

// get races based on race_no
router.get('/api/race/:race_no', async (req,res) => {
    try {
        const races = await schedule.find()
        res.json(races[req.params.race_no-1])
    } catch(err) {
        res.status(400)
    }
})

// add race
router.post('/api', async (req, res) => {
    const race = new schedule({
        race_no : req.body.race_no,
        track : req.body.track,
        date : req.body.date
    })

    try { 
        const savedRace = await race.save()
        res.json(savedRace)
    } catch(err) {
        res.status(400)
    }
})

// delete race based on id
router.delete('/api/:id', async (req, res) => {
    try {
        const removeRace = await schedule.remove({ _id: req.params.id});
        res.json(removeRace)
    } catch(err) {
        res.status(400)
    }
})

// update race based on id
router.patch('/api/:id', async (req, res) => {
    try {
        const updateRace = await schedule.updateOne(
            { _id : req.params.id},
            { $set : { track : req.body.track}}
        )
        res.json(updateRace)
    } catch(err) {
        res.status(400)
    }
})

// Connecting to DB
mongoose.connect(
    process.env.DB_CONNECTION, () =>
    console.log("Connected to DB")
)


// adding router to app 
app.use('/', router)
app.listen(process.env.port || 3000)

console.log("Listening on port 3000")