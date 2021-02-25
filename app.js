/* Require modules */
const express = require('express');
const mongoose  = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const ExpressError= require('./utils/ExpressError')
const {google} = require('googleapis');
const queryParse = require("query-string");
const urlParse = require("url-parse");
const User = require('./models/user');
const axios = require('axios');
var qs = require('qs');

const oauth2Client = new google.auth.OAuth2(
    "739982117038-d6epg8e60f9vkq2dp4fn73tgfrfdn1uo.apps.googleusercontent.com",
    "EHNkq4hTuqouhx9ag8eREMmu",
    "http://localhost:3000/googleUser"
)

/********** MONGO DB CONNECTION ***********/
mongoose.connect('mongodb://localhost:27017/fitnessDB', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false /* deprecated therefore force set to false */
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database Connected");
})
/******************************************/

const app = express();
app.engine('ejs', ejsMate)


/* ~~~~~~  Configurations ~~~~~~~~~~~~~~~~~~~~~~~~ */
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'));
app.set('public', path.join(__dirname, '/public'));
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

/* ~~~~~~ Middleware ~~~~~~~~~~~~*/
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use((req, res, next) => {
    res.locals.userid = req.userid;
    next();
})
app.use((req , res , next) => {
    console.log("session", req.session);
    next();
})
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


/* ~~~~~~ Session ~~~~~~ */
const sessionConfig = {
    secret: 'EHNkq4hTuqouhx9ag8eREMmu',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    },
}
app.use(session(sessionConfig))

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

app.get('/', (req, res) => {
        if (req.session.userid){
            res.redirect('/profile/'+req.session.userid)
        }
        else{
            res.render('index');
        }
})
app.get('/oauth', (req, res) => {
    const scopes = ["https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.activity.write profile email openid"]
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes, 
    })
    res.redirect(url);
})

app.get('/googleUser', async (req, res) => {
    const tokens = await oauth2Client.getToken(queryParse.parse(new urlParse(req.url).query).code);
    let {id_token: token, refresh_token: refreshToken} = tokens.tokens;
    const ticket = await oauth2Client.verifyIdToken({
        idToken: token,
        audience: oauth2Client._clientId
    })
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    const user = await User.findById(userid)

    if(!user){
        req.session.userid = userid;
        const userOptions ={
            _id: userid,
            accountName: payload.name,
            accountEmail: payload.email,
            profilePicture: payload.picture,
            refreshToken
        }

        const user = await new User(userOptions);
        await user.save();
    }
    req.session.userid = userid;
    res.redirect('/profile/'+userid);

})


app.get('/fetchToken', async (req ,res) => {

    console.log(req.session.userid)
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
            res.send(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });



})

app.get('/logout', (req ,res) => {
   
    req.session.destroy();
    res.redirect('/');
})

app.get("/profile/:id", async (req, res) => {

    const {id} = req.params
    const user = await User.findById(id);
    console.log(user);
    res.render('profile', {user})

});


app.listen(3000, () => {

    console.log("fitnessAPP opened on port 3000");

})
