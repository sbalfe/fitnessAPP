const axios = require('axios');
var qs = require('qs');
const User = require('../models/user');

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
        const user = await User.findById(req.session.userid)
        req.user = user;
        next();
    }
    else{
        res.redirect('/');
        next();

    }
}



