const napsterAPI = 'https://api.napster.com';
    const API_KEY = 'YWZkOTIxNzEtMmQ3OS00ZDA0LTk0MDctYjNhNTBlMDZlY2E4';
    const oauthURL = `${napsterAPI}/oauth/authorize?client_id=${API_KEY}&response_type=code`;
    const REDIRECT_URI = 'http://localhost:3000/'

    const width = 700;
    const height = 400;
    // const left = (screen.width / 2) - (width / 2);
    // const top = (screen.height / 2) - (height / 2);

class Authentication {
    authenticate = () => {
        let tempToken = this.requestTempToken();
        tempToken.then(token => this.requestAccessToken(token));
    }

    requestTempToken = () => {
        return new Promise((resolve, reject) => {
            window.open(`${oauthURL}&redirect_uri=${REDIRECT_URI}`, 'Napster', `menubar=no, location=no, resizable=no, scrollbars=no,
            status=no, width=${width}, height=${height}`)
            
            resolve(window.URL);

            reject(function() { console.log('Retrieving temporary token failed.'); });
        })
    }

    requestAccessToken = (tempToken) => {
        debugger;
    }

}

window.open(`${oauthURL}&redirect_uri=${REDIRECT_URI}`, 'Napster', `menubar=no, location=no, resizable=no, scrollbars=no,
            status=no, width=${width}, height=${height}`)

export let authentication = new Authentication();