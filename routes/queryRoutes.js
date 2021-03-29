const db = require('../db')
const express = require("express");
const router = express.Router()
const bodyParser = require('body-parser')

router.use(express.urlencoded({extended: true}));
router.use(bodyParser.json());

router.post('/settingsUpdate', async (req ,res) => {
    console.log(req.body);

    await db.query("INSERT INTO settings(userid, fitnessLevel, notifications, privacy) VALUES($1,$2,$3,$4)", [])
    await db.query("UPDATE users SET username = $1",[req.body.username]);

    //await User.findByIdAndUpdate(req.session.userid, req.body);
    //res.redirect('/settings');
})

router.get('/processSleep', async (req ,res) => {
    const time = Date.now();
    const data = await db.
    console.log(data);
})

router.post('/updateProfileView', async(req, res) => {

    const number = Math.floor(Math.random() * 100)+1;
    console.log(number);

    let today = new Date(Date.now());
    let formatDate = today.toLocaleDateString();
    let dateParts = formatDate.split('/')
    let newDate = dateParts[2]+"-"+dateParts[1]+"-"+dateParts[0]
    let testDate = '2021-03-04'
    const dataFetch = await db.query("   SELECT users.userid, accountName, normaldate AS date,  stepcount ,volume, sleepquality, bedtime, waketime, averagebpm, high, low" +
        "    FROM dailyuserdata INNER JOIN hydration ON hyd = hydrationid" +
        "    INNER JOIN steps ON step=stepsid" +
        "    INNER JOIN sleep ON slee = sleepid" +
        "    INNER JOIN heartrate ON heart = heartrateid" +
        "    INNER JOIN dates ON dailyuserdata.unixid=dates.unixid" +
        "    INNER JOIN users ON users.userid=dailyuserdata.userid WHERE users.userid = $1 AND normaldate =$2", ['116648969612970452763', testDate])

    console.log(dataFetch["rows"])

    /*
    SELECT users.userid, accountName, normaldate AS date,  stepcount ,volume, sleepquality, bedtime, waketime, averagebpm, high, low
    FROM dailyuserdata INNER JOIN hydration ON hyd = hydrationid
    INNER JOIN steps ON step=stepsid
    INNER JOIN sleep ON slee = sleepid
    INNER JOIN heartrate ON heart = heartrateid
    INNER JOIN dates ON dailyuserdata.unixid=dates.unixid
    INNER JOIN users ON users.userid=dailyuserdata.userid WHERE users.userid = '116648969612970452763' AND normaldate = '2021-03-04';
    */



    res.json(dataFetch["rows"][0])

})
router.get('/updateWater', async (req, res) => {

});

router.get('/heartData');

router.get('/stepsData');

router.get('/updateMood');



module.exports = router;