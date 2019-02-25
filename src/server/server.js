const express = require('express');
const router = express.Router();
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

const napsterAPI = 'https://api.napster.com';
const API_KEY = 'YWZkOTIxNzEtMmQ3OS00ZDA0LTk0MDctYjNhNTBlMDZlY2E4';
const oauthURL = `${napsterAPI}/oauth/authorize?client_id=${API_KEY}&response_type=code`;
const REDIRECT_URI = 'localhost:3000'

const width = 700;
const height = 400;
const left = (screen.width / 2) - (width / 2);
const top = (screen.height / 2) - (height / 2);

app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res, next) => {
    console.log(req.body)
    res.send({ express: 'Hello from express' });
    next();
});

router.post('/api/authenticate', (req, res, next) => {
    if (accessToken) return;
    res.send(getToken());
    next();
});

router.get('/api/:artist/:album', (req, res, next) => {
    const artist = req.body.artist;
    const album = req.body.album;
    res.send(getArtistAlbum(artist, album))
    next();
});

app.use('/', router);
app.listen(port, () => console.log(`Listening on port ${port}`));

const getArtistAlbum = function (artist, album) {
    axios.get(`https://api.napster.com/v2.2/albums/${artist}}/${album}?apikey=${API_KEY}&limit=25`)
        .then(function (album) { return album; })
        .catch(error => console.log(error.message));
}

const getToken = function () {
    // axios.post(`https://api.napster.com/oauth/authorize?client_id=${API_KEY}&redirect_uri=http://localhost:3000&response_type=code`) 
    //     .then(response => unpackToken(response))
    //     .then(function(token) { return token; })
    //     .catch(error => console.log(error.message));
    window.open(`${oauthURL}&redirect_uri=${REDIRECT_URI}`, 'Napster', `menubar=no, location=no, resizable=no, scrollbars=no,
                    status=no, width=${width}, height=${height}, top=${top}, left=${left}`)
}

const unpackToken = function (response) {
    
    return response;
}