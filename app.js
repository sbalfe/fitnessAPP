/* Require modules */
const express = require('express');
const mongoose  = require('mongoose');
const path = require('path');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const methodOverride = require('method-override');
const ExpressError= require('./utils/ExpressError')
const schedule = require('node-schedule');
const catchAsync = require('./utils/catchAsync');
const {googleLogin, redirect} = require('./controllers/auth/oauth')
const {logout, renderProfile, renderSettings, renderAnalytics, renderContacts, renderRanking, renderGoals} = require('./controllers/users/usermw')
const {steps, sleep} = require('./controllers/API/googleFit')
const {fetchToken, checkLoggedIn , buildProfile, buildSettings} = require('./middleware/middleware')
const queryRoutes = require('./routes/query/query');
const graphRoutes = require('./routes/graphRoutes')
const app = express();
app.engine('ejs', ejsMate)

/* ~~~~~~  Configurations ~~~~~~~~~~~~~~~~~~~~~~~~ */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.set('public', path.join(__dirname, '/public'));
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

/* ~~~~~~ Middleware ~~~~~~~~~~~~*/
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static('public'));
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

/* ~~~~~~ Session ~~~~~~ */
const sessionConfig = {
    name: 'Efe Cookie',
    secret: 'EHNkq4hTuqouhx9ag8eREMmu',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    },
}
app.use(session(sessionConfig))
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

/* ~~~~~~~~~Main Route middleware ~~~~~~~~ */
app.use('/query', queryRoutes);
app.use('/graph', graphRoutes)
//app.use('/analytics', analyticRoutes);
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

app.get('/', catchAsync(async (req, res) => {
    if (req.session.userid){
        return res.redirect('/profile');
    }
    res.render('index');
}));

app.get('/oauth', googleLogin);

app.get('/googleUser', catchAsync(redirect));

app.get('/fetchSteps', fetchToken, catchAsync(steps));

app.get('/fetchSleep', fetchToken, catchAsync(sleep));

app.get('/logout', catchAsync(logout));

app.get('/contacts', checkLoggedIn, catchAsync(renderContacts));

app.get('/settings', checkLoggedIn , buildSettings, catchAsync(renderSettings));

app.get('/analytics', checkLoggedIn, catchAsync(renderAnalytics));

app.get('/analytics/:path', checkLoggedIn, catchAsync(renderAnalytics));

app.get('/ranking', checkLoggedIn, catchAsync(renderRanking));

app.get("/profile",  checkLoggedIn , buildProfile , catchAsync(renderProfile));

app.get("/goals", checkLoggedIn, catchAsync(renderGoals));

app.get("*", (req, res, next) => {
    next(new ExpressError('page not found', 404));
})

/*********** ERROR HANDLING ********/
app.use((err, req, res, next) => {
    const {statusCode = 500} = err;
    if (!err.message) err.message = 'Oh No, something Went Wrong';
    console.log(err.message);
    res.status(statusCode).render('error', {err})
})
/*************************** */

app.listen(3000, () => {
    console.log("fitnessAPP opened on port 3000");
})



