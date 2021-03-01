const User = require('../../models/user');

module.exports.logout = async (req, res) => {

    req.session.destroy();
    res.redirect('/');

}

module.exports.renderProfile = async (req,res) => {

    console.log("test");
    res.render('User/profile', {user: req.user})
}

module.exports.renderSettings = async (req, res) => {
    res.render('Settings/Settings', {user: req.user});
}

module.exports.renderAnalytics = async (req ,res) => {
    res.render('Analytics/analytics');
}
module.exports.renderContacts = async (req ,res) => {
    res.render('Contacts/contacts');
}
