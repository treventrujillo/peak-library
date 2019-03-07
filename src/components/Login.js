import React from 'react';

import { Button, Container } from 'semantic-ui-react';

const Login = (props) => {
    let { auth } = props.auth;
    return (
        <div id="Login">
            <Container id="login-container">
                <h2 id="login-header">Welcome to Peak Library</h2>
                <Button onClick={auth.authenticate}>Sign in</Button>
            </Container>
        </div>
    );
}

export default Login;