import axios from 'axios';

class Request {

    getAlbum = (request) => {
        axios.post(`/api/${request.artist}/${request.album}`)
            .then(response => { return response; });
    }
}

export let request = new Request();