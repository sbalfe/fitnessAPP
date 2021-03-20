const User = require('../../models/user');

module.exports.logout = async (req, res) => {

    req.session.destroy();
    res.redirect('/');

}

module.exports.renderProfile = async (req,res) => {
    let data =  {
        sleep: {
            hours: 12,
            bedTime: "9:30pm",
            wakeTime: "9:30am",
            quality: 76,
            change: -27
        },
        steps: {
            count: 10506,
            change: '+65%',
        },
        heartRate:{
            value: 54,
            change: '+5%'
        },
        glasses: 4,
        mood: 'sad',
    }
    res.render('User/profile', {user: req.user, data})
}

module.exports.renderSettings = async (req, res) => {
    res.render('User/Settings', {user: req.user});
}

module.exports.renderAnalytics = async (req ,res) => {
    let requested_graph = req.params.path;

    if (requested_graph === "sleep")
    {
        //return the sleep graph
    }
    else if (requested_graph === "hr")
    {
        //hr graph
    }
    else
    {
        res.render('Analytics/analytics', {graph:"steps"});
    }

    res.render('Analytics/analytics', {graph:"steps"});
}
module.exports.renderContacts = async (req ,res) => {
    res.render('Contacts/contacts');
}

module.exports.renderRanking = async (req ,res) => {
    let test_data = [["Person A", "10,000 steps"],["Person B", "6000 steps"],["Person C", "1000 steps"],
        ["Person D", "1 step"],["Person E", "0.5 steps"],["Person F", "0.1 steps"]];

    res.render('Leaderboards/leaderboards', {data:test_data});
}

module.exports.renderGoals = async (req ,res) => {

    let data = {}
    res.render("User/goals", {data});
}
