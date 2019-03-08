const express = require('express');
const router = express.Router();
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 9090;

app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res, next) => {
    res.send({ express: 'Hello from express' });
    next();
});

router.get('/api/:artist/:album', (req, res, next) => {
    const artist = req.body.artist;
    const album = req.body.album;
    res.send(getArtistAlbum(artist, album));
    next();
});

router.get('/api/auth', (req, res, next) => {
    console.log(req);
    // Exchange temp token for access 
    // and return
    next();
})

app.use('/', router);
app.listen(port, () => console.log(`Listening on port ${port}`));

const getArtistAlbum = function (artist, album) {
    axios.get(`https://api.napster.com/v2.2/albums/${artist}}/${album}?apikey=${API_KEY}&limit=25`)
        .then(function (album) { return album; })
        .catch(error => console.log(error.message));
}