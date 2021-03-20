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

router.get('/updateWater', async (req, res) => {

});

router.get('/heartData');

router.get('/stepsData');

router.get('/updateMood');



module.exports = router;