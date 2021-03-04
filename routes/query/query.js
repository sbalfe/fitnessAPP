const express = require("express");
const router = express.Router()
const User = require("../../models/user")
const bodyParser = require('body-parser')

router.use(express.urlencoded({extended: true}));
router.use(bodyParser.json()); // <--- Here

router.post('/settingsUpdate', async (req ,res) => {
    await User.findByIdAndUpdate(req.session.userid, req.body);
    res.redirect('/settings');
})

router.get('/sleepData', async (req ,res) => {

    const time = Date.now();
    const data = await User.find( {'statistics.sleep.date': 10 }, {'statistics.sleep.$':1})
    console.log(data);

})

module.exports = router;