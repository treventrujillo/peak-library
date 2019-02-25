const napsterAPI = 'https://api.napster.com';
const API_KEY = 'YWZkOTIxNzEtMmQ3OS00ZDA0LTk0MDctYjNhNTBlMDZlY2E4';
const oauthURL = `${napsterAPI}/oauth/authorize?client_id=${API_KEY}&response_type=code`;
const REDIRECT_URI = 'http://localhost:3000/'

const width = 700;
const height = 400;

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

            reject(function() { console.log('Authentication failed.'); });
        });
    }

    requestAccessToken = (tempToken) => {
        debugger;
    }

}

export let authentication = new Authentication();