import React, { Component } from 'react';

import { Redirect } from 'react-router';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';
import axios from 'axios';

class OAuthProxy extends Component {
    state = {
        loader: true,
        dimmer: true
    }

    componentDidMount() {
        this.exchangeCodeForToken();
    }

    exchangeCodeForToken = async () => {
        debugger;
        const code = this.getUrlParameter('code');
        if (code === null) {
           alert('Code not received.'); 
        }

        const token = await axios.post(`http://localhost:3001/api/auth`, { code: code });
        if (token === null) {
            alert('Token not exchanged.');
        }

        sessionStorage.setItem("access_token", token);
        window.close();
        return (<Redirect to="/library"/>)
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