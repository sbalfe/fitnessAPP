const User = require('../../models/user');

module.exports.logout = async (req, res) => {

    req.session.destroy();
    res.redirect('/');

}

module.exports.renderProfile = async (req,res) => {

    res.render('User/profile', {user: req.user})
}

module.exports.renderSettings = async (req, res) => {
    res.render('User/Settings', {user: req.user});
}

module.exports.renderAnalytics = async (req ,res) => {
    let requested_graph = req.params.path;

    if (requested_graph == "sleep")
    {
        //return the sleep graph
    }
    else if (requested_graph = "hr")
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
