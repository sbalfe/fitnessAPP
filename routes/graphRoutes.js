const express = require("express");
const router = express.Router()
const bodyParser = require('body-parser')
const {stepsData} = require('../middleware/middleware')

router.use(express.urlencoded({extended: true}));
router.use(bodyParser.json());

router.get('/steps', stepsData ,(req , res) => {

    res.render('steps');

})

router.post('/steps', (req , res) =>{



})



module.exports = router;