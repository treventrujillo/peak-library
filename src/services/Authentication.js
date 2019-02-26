const napsterAPI = 'https://api.napster.com';
const API_KEY = 'YWZkOTIxNzEtMmQ3OS00ZDA0LTk0MDctYjNhNTBlMDZlY2E4';
const oauthURL = `${napsterAPI}/oauth/authorize?client_id=${API_KEY}&response_type=code`;
const REDIRECT_URI = window.URL;

const width = 700;
const height = 400;
const left = (window.screen.width / 2) - (width / 2);
const top = (window.screen.height / 2) - (height / 2);

class Authentication {
    authenticate = () => {
        let tempToken = this.requestTempToken();
        tempToken.then(token => this.requestAccessToken(token));
        tempToken.catch(error => this.catchException(error));
    }

    requestTempToken = () => {
        return new Promise((resolve, reject) => {
            window.open(`${oauthURL}&redirect_uri=${REDIRECT_URI}`, 'Napster', `menubar=no, location=no, resizable=no, scrollbars=no,
            status=no, width=${width}, height=${height}, top=${top}, left=${left}`)
            
            resolve(window.URL);

            reject(function() { console.log('Authentication failed.'); });
        });
    }

    requestAccessToken = (tempToken) => {
    
    }

    catchException = (error) => {
        console.log(error);
    }
}

export let auth = new Authentication();