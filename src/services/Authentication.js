const napsterAPI = 'https://api.napster.com';
const API_KEY = 'YWZkOTIxNzEtMmQ3OS00ZDA0LTk0MDctYjNhNTBlMDZlY2E4';
const oauthURL = `${napsterAPI}/oauth/authorize?client_id=${API_KEY}&response_type=code`;
const REDIRECT_URI = "http://localhost:3000";

const width = 700;
const height = 400;
const left = (window.screen.width / 2) - (width / 2);
const top = (window.screen.height / 2) - (height / 2);

export default class Authentication {

    constructor() {
        this.authorized = false;
    }

    get authorized() {
        return this.authorized;
    }

    set authorized(value) {
        this.authorized = value;
    } 
    
    checkToken = (tokenValid) => {
        if (tokenValid) {
            this.authorized = tokenValid;
        }
    }

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
        debugger;
    }

    catchException = (error) => {
        console.log(error);
    }
}
