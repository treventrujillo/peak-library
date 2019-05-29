const express = require('express');
const cors = require('cors');
const axios  = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

const napsterAPI = 'https://api.napster.com';
const API_KEY = 'YWZkOTIxNzEtMmQ3OS00ZDA0LTk0MDctYjNhNTBlMDZlY2E4';
const API_SECRET = 'YjI1ODRhN2YtMzFhYy00ZDJlLWJkM2YtMzdiYTNkOGYyYjZi';
const REDIRECT_URL = 'http://localhost:3000/library'

app.get('/', (req, res) => {
    res.send({ express: 'Hello from express' });
});

app.post('/api/auth', (req, res) => {
    const token = exchangeCodeForToken(req.code);
    res.send(token);
});

app.post('/api/test', (req, res) => {
    res.send(req.code);
});

app.get('/api/ping', (req, res) => {
    console.log(req);
    res.send(`Pinged on port ${port}`)
});

app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => console.log(`Listening on port ${port}`));

const exchangeCodeForToken = (code) => {
    axios.post(`${napsterAPI}/oauth/access_token?client_id=${API_KEY}&client_secret=${API_SECRET}&response_type=code&grant_type=authorization_code&redirect_uri=${REDIRECT_URL}&code=${code}`)
        .then(token => { return token })
        .catch(err => { return err });
}

// const getArtistAlbum = function (artist, album) {
//     axios.get(`https://api.napster.com/v2.2/albums/${artist}}/${album}?apikey=${API_KEY}&limit=25`)
//         .then(function (album) { return album; })
//         .catch(error => console.log(error));
// }