const {google} = require('googleapis');
const queryParse = require("query-string");
const urlParse = require("url-parse");
const User = require('../../models/user');

const oauth2Client = new google.auth.OAuth2(
    "739982117038-d6epg8e60f9vkq2dp4fn73tgfrfdn1uo.apps.googleusercontent.com",
    "EHNkq4hTuqouhx9ag8eREMmu",
    "http://localhost:3000/googleUser"
)

module.exports.googleLogin =  (req, res) => {
    console.log("google login controller")
    const scopes = ["https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.sleep.read https://www.googleapis.com/auth/fitness.activity.write profile email openid"]
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes,
    })
    res.redirect(url);
}

module.exports.redirect = async (req ,res) => {
    console.log("google redirect controller")
    const tokens = await oauth2Client.getToken(queryParse.parse(new urlParse(req.url).query).code);
    const {id_token: token, refresh_token: refreshToken} = tokens.tokens;

    const ticket = await oauth2Client.verifyIdToken({
        idToken: token,
        audience: oauth2Client._clientId
    })

    const payload = ticket.getPayload();
    const userid = payload['sub'];
    const user = await User.findById(userid);

    if(!user){
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
    res.redirect('/profile');

}