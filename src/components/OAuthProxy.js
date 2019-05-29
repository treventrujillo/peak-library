import React, { Component } from 'react';

import { Redirect } from 'react-router';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';
import axios from 'axios';

const napsterAPI = 'https://api.napster.com';
const API_KEY = 'YWZkOTIxNzEtMmQ3OS00ZDA0LTk0MDctYjNhNTBlMDZlY2E4';
const API_SECRET = 'YjI1ODRhN2YtMzFhYy00ZDJlLWJkM2YtMzdiYTNkOGYyYjZi';
const REDIRECT_URI = "http://localhost:3000/proxy/token";

class OAuthProxy extends Component {
    state = {
        loader: true,
        dimmer: true
    }

    componentDidMount() {
        const { procedure } = this.props;

        if (procedure === 'code')
        {
            this.exchangeCodeForToken();
        }
        else if (procedure === 'token') {
            this.storeToken();
        }
    }

    storeToken = () => {
        const token = this.getUrlParameter('access_token');
        if (token === null) {
            alert('Token not received.');
        }

        window.close();
    }

    exchangeCodeForToken = async () => {
        const code = this.getUrlParameter('code');
        if (code === null) {
           alert('Code not received.'); 
        }

        const token = new Promise(await axios.post(`${napsterAPI}/oauth/access_token?client_id=${API_KEY}&client_secret=${API_SECRET}&response_type=code&grant_type=authorization_code&redirect_uri=${REDIRECT_URI}&code=${code}`))
        token.then(response => console.log(response));
        token.catch(err => console.log(err));
    }

    getUrlParameter = (name) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^*#]*)');
        const results = regex.exec(window.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g));
    }

    render () {
        const { loader, dimmer } = this.state;
        return (
            <Segment>
                <Dimmer active={dimmer}>
                    <Loader active={loader} />
                </Dimmer>
            </Segment>
        );
    }
}

export default OAuthProxy;