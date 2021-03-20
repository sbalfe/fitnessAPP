const axios = require('axios');
var qs = require('qs');
const db = require('../db');

module.exports.fetchToken = async (req ,res ,next) => {
    if (!req.session.userid){
        return res.redirect('/')
        next();
    }
    const {refreshToken} = await User.findById(req.session.userid);


    var data = qs.stringify({
        'grant_type': 'refresh_token',
        'refresh_token': refreshToken,
        'valid_for': '60',
        'client_id': '739982117038-d6epg8e60f9vkq2dp4fn73tgfrfdn1uo.apps.googleusercontent.com',
        'client_secret': 'EHNkq4hTuqouhx9ag8eREMmu'
    });
    var config = {
        method: 'post',
        url: 'https://oauth2.googleapis.com/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
    };
    axios(config)
        .then(function (response) {
            req.accessToken = response.data.access_token;
            next();
        })
        .catch(function (error) {
            console.log(error);
        });
}

module.exports.checkLoggedIn = async (req ,res, next) => {
    if(req.session.userid){
        const user = await db.query("SELECT * FROM users WHERE userid = $1",[req.session.userid]);
        req.user = user["rows"][0];
        next();
    }
    else{
        return res.redirect('/');
    }
}

module.exports.buildProfile = async (req, res, next) => {

    const steps = await db.query("SELECT date, stepcount ,volume, sleepquality, bedtime, waketime, averagebpm, high, low " +
        "FROM dailyuserdata INNER JOIN hydration ON hyd = hydrationid " +
        "INNER JOIN steps ON step=stepsid " +
        "INNER JOIN sleep ON slee = sleepid " +
        "INNER JOIN heartrate ON heart = heartrateid " +
        "INNER JOIN dates ON dailyuserdata.unixid=dates.unixid; ");

    const fetch = steps["rows"][0];

    const {date} = fetch;

    const standardDate = new Date(1615655846163);

    req.data = {
        fetch,
        date: standardDate,
    }
    console.log(req.data);
    next();

}

module.exports.stepsData = async (req, res, next) => {

    next();
}
module.exports.buildSettings = async(req , res, next) => {

    next();

}





