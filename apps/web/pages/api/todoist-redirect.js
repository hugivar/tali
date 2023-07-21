import axios from 'axios'
import { setCookie } from '../../src/utils/cookies'

const clientID = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET

export default function handler(req, res) {
    const requestToken = req.query.code;
    axios({
        method: 'post',
        url: `https://todoist.com/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}&redirect_uri=https://tali.so`
    }).then((response) => {
        const accessToken = response.data.access_token;
        console.log('todoist-redirect line:14', accessToken);
        setCookie(res, 'Next.js', 'api-middleware!', { path: '/', maxAge: 2592000 })
        // Return the `set-cookie` header so we can display it in the browser and show that it works!
        // res.end()
        res.redirect(`/?todoistAccessToken=${accessToken}`);
        // res.send(accessToken)
        // res.writeHead(302, { Location: `localhost:3002?$accessToken=${accessToken}` }).end();
    }).catch((err) => {
        console.log(err);
        res.status(500);
    });
}