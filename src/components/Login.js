import React from 'react';

import { Button, Container } from 'semantic-ui-react';
import { Redirect } from 'react-router';

const napsterAPI = 'https://api.napster.com';
const API_KEY = 'YWZkOTIxNzEtMmQ3OS00ZDA0LTk0MDctYjNhNTBlMDZlY2E4';
const oauthURL = `${napsterAPI}/oauth/authorize?client_id=${API_KEY}&response_type=code`;
const REDIRECT_URI = "http://localhost:3000/proxy/code";

const width = 700;
const height = 400;
const left = (window.screen.width / 2) - (width / 2);
const top = (window.screen.height / 2) - (height / 2);

const Login = () => {
    return (
        <div id="Login">
            <Container id="login-container">
                <h2 id="login-header">Welcome to Peak Library</h2>
                <Button onClick={login}>Sign in</Button>
            </Container>
        </div>
    );
}

function login () {
    const napsterWindow = window.open(`${oauthURL}&redirect_uri=${REDIRECT_URI}`, 'Napster', `menubar=no, location=no, resizable=no, scrollbars=no,
            status=no, width=${width}, height=${height}, top=${top}, left=${left}`)

    napsterWindow.addEventListener('beforeunload', (event) => {
       event.preventDefault();
       
       const access_token = getUrlParameter('access_token');
       if (access_token != null) {
           sessionStorage.setItem("access_token", access_token);
           return (<Redirect to={{pathname: "/library"}} />)
        }

        alert('Auth failed.')
        event.returnValue = '';
    });

function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^*#]*)');
        const results = regex.exec(napsterWindow.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g));
    }
}

export default Login;