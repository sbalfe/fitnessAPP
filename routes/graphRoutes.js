const express = require("express");
const router = express.Router()
const bodyParser = require('body-parser')
const {stepsData} = require('../middleware/middleware')

router.use(express.urlencoded({extended: true}));
router.use(bodyParser.json());

router.post('/steps', (req, res) => {

    res.se

})


module.exports = router;