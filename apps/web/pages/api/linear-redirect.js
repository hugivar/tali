import axios from 'axios'

const clientID = process.env.LINEAR_CLIENT_ID
const clientSecret = process.env.LINEAR_CLIENT_SECRET

export default function handler(req, res) {
    const requestToken = req.query.code;
    axios({
        method: 'post',
        url: `https://api.linear.app/oauth/token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}&redirect_uri=https://tali.so&grant_type=authorization_code`
    }).then((response) => {
        const accessToken = response.data.access_token;
        // Return the `set-cookie` header so we can display it in the browser and show that it works!
        // res.end()
        res.redirect(`/?linearAccessToken=${accessToken}`);
        // res.send(accessToken)
        // res.writeHead(302, { Location: `localhost:3002?$accessToken=${accessToken}` }).end();
    }).catch((err) => {
        res.send(err);
    });
}